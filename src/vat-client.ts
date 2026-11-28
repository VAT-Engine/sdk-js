import { decodeRequestJson } from "./exact-json.js";
import { createApiModules } from "./generated/api-modules.js";
import type { ApiModules } from "./generated/api-modules.js";
import { VatTransportError } from "./http-error.js";
import type { HttpErrorKind } from "./http-error.js";
import { normalizeBase } from "./http-request.js";
import type { HttpRequestOptions } from "./http-request.js";
import type { HttpTransportResponse } from "./http-response.js";
import { createTransportRuntime, validateApiKey } from "./http-transport.js";
import type { HttpTransportOptions, Invocation } from "./http-transport.js";
import {
  canReplay, CircuitBreaker, circuitResult, integerInRange, possiblyProcessed, retryable,
  retryDelay, retryPolicy, waitForRetry,
} from "./resilience.js";
import type { CircuitOptions, RetryOptions } from "./resilience.js";

const contextOperation = "GET /v1/auth/context";
const mutationReplayMs = 30_000;
const contextIdPattern = /^ctx_[0-9a-f]{64}$/u;
type Environment = "sandbox" | "production";

export interface AuthContext {
  readonly contextId: string;
  readonly environment: Environment;
  readonly scopes: readonly string[];
}

/** Obtain this binding independently of the candidate API key, through trusted enrollment. */
export interface TrustedContextBinding {
  readonly baseUrl: string;
  readonly contextId: string;
  readonly environment: Environment;
}

export interface VatClientOptions extends HttpTransportOptions {
  readonly strictContext?: TrustedContextBinding;
  readonly retry?: RetryOptions | false;
  readonly circuit?: CircuitOptions;
}

export interface VatClient extends ApiModules {
  request(operation: string, options?: HttpRequestOptions): Promise<HttpTransportResponse>;
  getAuthContext(options?: Pick<HttpRequestOptions, "timeoutMs" | "deadlineMs" | "signal">): Promise<AuthContext>;
  /** Applies to subsequent calls. Strict calls verify the replacement key before protected dispatch. */
  rotateApiKey(key: string): void;
  /** Stop local use of the current key and cancel active calls using current or previous keys. */
  revokeApiKey(): void;
}

export class UnknownOutcomeError extends VatTransportError {
  readonly failureKind: HttpErrorKind;

  constructor(error: VatTransportError) {
    super("unknown_outcome", error.getResponseMetadata());
    this.name = "UnknownOutcomeError";
    this.failureKind = error.kind;
  }
}

function validEnvironment(value: unknown): value is Environment {
  return value === "production" || value === "sandbox";
}

function validContextId(value: unknown): value is string {
  return typeof value === "string" && value.length === 68 && contextIdPattern.test(value);
}

function parseContext(response: HttpTransportResponse, binding?: TrustedContextBinding): AuthContext {
  if (response.kind !== "json" || !response.data || typeof response.data !== "object") {
    throw new VatTransportError("context_unverified");
  }
  const { context_id: contextId, environment, scopes } = response.data as Record<string, unknown>;
  if (!validContextId(contextId) || !validEnvironment(environment) ||
      !Array.isArray(scopes) || scopes.length === 0 || !scopes.every((scope) => typeof scope === "string" && scope !== "")) {
    throw new VatTransportError("context_unverified");
  }
  const reported = response.metadata.environment;
  if (binding) {
    const noStore = response.metadata.cacheControl?.split(",").some((directive) => directive.trim().toLowerCase() === "no-store");
    if (!noStore || reported === undefined) throw new VatTransportError("context_unverified");
  }
  if ((reported !== undefined && reported !== environment) ||
      (binding && (binding.contextId !== contextId || binding.environment !== environment))) {
    throw new VatTransportError("context_mismatch");
  }
  return Object.freeze({ contextId, environment, scopes: Object.freeze([...scopes] as string[]) });
}

interface Credential {
  readonly key: string | undefined;
  readonly revocation: AbortController;
  readonly circuit: CircuitBreaker;
}

function transportError(error: unknown): VatTransportError {
  return error instanceof VatTransportError ? error : new VatTransportError("network");
}

export function createVatClient(options: VatClientOptions = {}): VatClient {
  const runtime = createTransportRuntime(options);
  const retries = retryPolicy(options.retry);
  const threshold = integerInRange(options.circuit?.failureThreshold ?? 5, 1, 100);
  const cooldownMs = integerInRange(options.circuit?.cooldownMs ?? 30_000, 1, 300_000);
  const binding = getBinding();
  let bindingInvalid = false;
  let current = credential(runtime.apiKey);
  const anonymous = new CircuitBreaker(threshold, cooldownMs);
  const active = new Map<Credential, number>();

  function getBinding(): TrustedContextBinding | undefined {
    const supplied = options.strictContext;
    if (supplied === undefined) return undefined;
    let normalized: string;
    let contextId: string;
    let environment: Environment;
    try {
      ({ contextId, environment } = supplied);
      normalized = normalizeBase(supplied.baseUrl, options.allowInsecureLoopback === true);
      if (!validContextId(contextId) ||
          !validEnvironment(environment)) throw new TypeError();
    } catch {
      throw new VatTransportError("invalid_request");
    }
    if (normalized !== runtime.base) throw new VatTransportError("context_mismatch");
    return Object.freeze({ baseUrl: normalized, contextId, environment });
  }

  function credential(key: string | undefined): Credential {
    return { key, revocation: new AbortController(), circuit: new CircuitBreaker(threshold, cooldownMs) };
  }

  async function request(operation: string, input: HttpRequestOptions = {}): Promise<HttpTransportResponse> {
    const candidate = current;
    active.set(candidate, (active.get(candidate) ?? 0) + 1);
    try {
      const invocation = runtime.capture(operation, input, candidate.key, binding?.contextId);
      const { authentication, behavior } = invocation.prepared.contract;
      const authenticated = authentication === "api_key";
      const strict = authenticated ? binding : undefined;
      if (strict && behavior === "mutation" && bindingInvalid) throw new VatTransportError("context_mismatch");
      if (strict && candidate.key === undefined) throw new VatTransportError("context_unverified");

      const signals = invocation.caller ? [invocation.caller] : [];
      if (authenticated) signals.push(candidate.revocation.signal);
      const signal = AbortSignal.any(signals);
      const circuit = authenticated ? candidate.circuit : authentication === "anonymous" ? anonymous : undefined;
      return await run(invocation, signal, circuit, strict, candidate.key);
    } finally {
      const outstanding = active.get(candidate) ?? 1;
      if (outstanding === 1) active.delete(candidate);
      else active.set(candidate, outstanding - 1);
    }
  }

  async function run(invocation: Invocation, signal: AbortSignal, circuit: CircuitBreaker | undefined,
    strict: TrustedContextBinding | undefined, key: string | undefined): Promise<HttpTransportResponse> {
    if (signal.aborted) throw new VatTransportError("aborted");
    if (performance.now() >= invocation.deadlineAt) throw new VatTransportError("deadline");
    const ticket = circuit?.acquire();
    let health: ReturnType<typeof circuitResult> = "neutral";
    const contract = invocation.prepared.contract;
    const mutation = contract.behavior === "mutation";
    const retryUntil = mutation ? Math.min(invocation.deadlineAt, invocation.startedAt + mutationReplayMs) : invocation.deadlineAt;
    let uncertain = false;

    try {
      if (strict && invocation.operation !== contextOperation) {
        // Preflight deliberately observes the actual context. The prepared operation already has the trusted assertion.
        const preflight = runtime.capture(contextOperation, {}, key);
        let observed: HttpTransportResponse;
        let dispatched = false;
        try {
          observed = await runtime.send(
            { ...preflight, timeout: invocation.timeout, deadlineAt: invocation.deadlineAt },
            signal, () => { dispatched = true; },
          );
          health = "healthy";
        } catch (error) {
          const failure = transportError(error);
          if (dispatched) health = circuitResult(failure);
          if (failure.kind === "aborted" || failure.kind === "deadline") throw failure;
          throw new VatTransportError("context_unverified", failure.getResponseMetadata());
        }
        const context = parseContext(observed, strict);
        if (!contract.scopes.some((scope) => context.scopes.includes(scope))) throw new VatTransportError("context_scope");
        const environment = context.environment === "production" ? "operational" : "sandbox";
        if (!contract.environments?.includes(environment)) throw new VatTransportError("context_environment");
      }

      const maxAttempts = ticket?.kind === "half-open" ? 1 : retries.maxAttempts;
      const eligible = maxAttempts > 1 && canReplay(invocation.prepared, () => {
        try {
          const body = invocation.prepared.init.body;
          return body === undefined ? undefined : decodeRequestJson(invocation.operation, "application/json", body);
        } catch {
          return undefined;
        }
      });
      for (let attempt = 1; ; attempt++) {
        let dispatched = false;
        try {
          if (strict && mutation && bindingInvalid) throw new VatTransportError("context_mismatch");
          const response = await runtime.send(invocation, signal, () => { dispatched = true; });
          health = "healthy";
          if (strict && invocation.operation === contextOperation) parseContext(response, strict);
          if (strict && response.metadata.environment !== undefined && response.metadata.environment !== strict.environment) {
            if (mutation) bindingInvalid = true;
            throw new VatTransportError("context_mismatch", response.metadata);
          }
          return response;
        } catch (error) {
          let failure = transportError(error);
          const metadata = failure.getResponseMetadata();
          const reported = metadata?.environment;
          const knownRejection = failure.status !== undefined && failure.status >= 400 &&
            failure.status < 500 && failure.status !== 408;
          if (strict && reported !== undefined && reported !== strict.environment && !knownRejection) {
            if (mutation) bindingInvalid = true;
            failure = new VatTransportError("context_mismatch", metadata);
          }
          if (dispatched) health = circuitResult(failure);
          uncertain ||= mutation && dispatched && possiblyProcessed(failure);
          const finish = (last: VatTransportError) => uncertain ? new UnknownOutcomeError(last) : last;
          if (!eligible || attempt >= maxAttempts || failure.kind === "context_mismatch" || !retryable(failure) ||
              (ticket && !circuit?.current(ticket))) throw finish(failure);
          const delay = retryDelay(retries, attempt, failure);
          if (delay >= retryUntil - performance.now()) throw finish(failure);
          if (!(await waitForRetry(delay, signal))) throw finish(new VatTransportError("aborted", failure.getResponseMetadata()));
          if (performance.now() >= retryUntil || (ticket && !circuit?.current(ticket))) throw finish(failure);
        }
      }
    } finally {
      if (ticket) circuit?.finish(ticket, health);
    }
  }

  return Object.freeze({
    ...createApiModules(request),
    request,
    async getAuthContext(input?: Pick<HttpRequestOptions, "timeoutMs" | "deadlineMs" | "signal">) {
      return parseContext(await request(contextOperation, input), binding);
    },
    rotateApiKey(key: string) {
      if (typeof key !== "string") throw new VatTransportError("invalid_request");
      validateApiKey(key);
      if (key !== current.key) current = credential(key);
    },
    revokeApiKey() {
      current.revocation.abort();
      for (const generation of active.keys()) generation.revocation.abort();
      current = credential(undefined);
    },
  });
}
