import { VatTransportError } from "./http-error.js";
import type { PreparedRequest } from "./http-request.js";

export interface RetryOptions {
  readonly maxAttempts?: number;
  readonly baseDelayMs?: number;
  readonly maxDelayMs?: number;
}

export interface CircuitOptions {
  readonly failureThreshold?: number;
  readonly cooldownMs?: number;
}

export function integerInRange(value: number, minimum: number, maximum: number): number {
  if (!Number.isSafeInteger(value) || value < minimum || value > maximum) {
    throw new VatTransportError("invalid_request");
  }
  return value;
}

export function retryPolicy(options: RetryOptions | false | undefined): Required<RetryOptions> {
  if (options === false) return { maxAttempts: 1, baseDelayMs: 100, maxDelayMs: 2_000 };
  const baseDelayMs = integerInRange(options?.baseDelayMs ?? 100, 1, 30_000);
  return {
    maxAttempts: integerInRange(options?.maxAttempts ?? 3, 1, 3),
    baseDelayMs,
    maxDelayMs: integerInRange(options?.maxDelayMs ?? Math.max(baseDelayMs, 2_000), baseDelayMs, 30_000),
  };
}

function explicitDate(value: unknown): boolean {
  if (typeof value !== "string" ||
      !/^\d{4}-\d{2}-\d{2}(?:T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))?$/u.test(value) ||
      !Number.isFinite(Date.parse(value))) return false;
  const day = value.slice(0, 10);
  return new Date(day).toISOString().slice(0, 10) === day;
}

function reference(value: unknown): boolean {
  // A conservative eligibility check only. The server remains responsible for reference normalization.
  return typeof value === "string" && value.trim().length > 0 && !value.includes("\0") &&
    new TextEncoder().encode(value).byteLength <= 160;
}

function eligibleSupply(body: Record<string, unknown>): boolean {
  const event = body.event;
  if (typeof body.source_profile_id !== "string" || !/^[1-9]\d*$/u.test(body.source_profile_id) ||
      !event || typeof event !== "object" || Array.isArray(event)) return false;
  const fields = event as Record<string, unknown>;
  const country = (value: unknown) => typeof value === "string" && value.length === 2 && /^[A-Z]{2}$/u.test(value);
  if (!reference(fields.external_order_id) || !reference(fields.external_line_id) ||
      typeof fields.event_version !== "bigint" || fields.event_version < 1n ||
      !country(fields.supplier_establishment_country) || !country(fields.dispatch_country)) return false;
  if (fields.event_type === "sale") {
    return fields.external_event_id === undefined && body.original_supply_event_id === undefined;
  }
  return ["refund", "cancellation", "credit_note", "adjustment"].some((kind) => kind === fields.event_type) &&
    reference(fields.external_event_id) && typeof body.original_supply_event_id === "string" &&
    /^[\da-f]{8}-(?:[\da-f]{4}-){3}[\da-f]{12}$/iu.test(body.original_supply_event_id);
}

export function canReplay(prepared: PreparedRequest, decoded: () => unknown): boolean {
  const { behavior, retryClass } = prepared.contract;
  if (retryClass === "read_candidate") return behavior === "read_only";
  if (!prepared.init.headers["x-api-key"]) return false;
  if (retryClass === "calculation_conditional" || retryClass === "supply_conditional") {
    const body = decoded();
    if (!body || typeof body !== "object" || Array.isArray(body)) return false;
    if (retryClass === "supply_conditional") return eligibleSupply(body as Record<string, unknown>);
    const key = prepared.init.headers["idempotency-key"];
    const source = prepared.init.headers["x-source-id"];
    return key !== undefined && /^[\x21-\x7e]{1,255}$/u.test(key) &&
      (source === undefined || /^[A-Za-z0-9_/-]{1,100}$/u.test(source)) &&
      explicitDate((body as Record<string, unknown>).transaction_date);
  }
  return false;
}

export function retryable(error: VatTransportError): boolean {
  const status = error.status;
  if (status !== undefined && status >= 300) return [408, 429, 502, 503, 504].includes(status);
  return error.kind === "network" || error.kind === "timeout";
}

export function possiblyProcessed(error: VatTransportError): boolean {
  if (error.status !== undefined && error.status >= 400 && error.status < 500) return error.status === 408;
  return ["network", "timeout", "deadline", "aborted", "redirect",
    "malformed_response", "response_too_large", "server", "context_mismatch"].includes(error.kind) ||
    (error.status !== undefined && error.status >= 500);
}

export function retryDelay(policy: Required<RetryOptions>, attempt: number, error: VatTransportError): number {
  const cap = Math.min(policy.maxDelayMs, policy.baseDelayMs * 2 ** (attempt - 1));
  return Math.max(Math.floor(Math.random() * (cap + 1)), (error.getResponseMetadata()?.retryAfterSeconds ?? 0) * 1000);
}

export function waitForRetry(ms: number, signal: AbortSignal): Promise<boolean> {
  if (signal.aborted) return Promise.resolve(false);
  return new Promise((resolve) => {
    const onAbort = () => finish(false);
    const timer = setTimeout(() => finish(true), ms);
    function finish(continueRetry: boolean) {
      clearTimeout(timer);
      signal.removeEventListener("abort", onAbort);
      resolve(continueRetry);
    }
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

type State = { kind: "closed"; failures: number } | { kind: "open"; until: number } | { kind: "half-open" };
type CircuitResult = "healthy" | "failure" | "neutral";

export function circuitResult(error: VatTransportError): CircuitResult {
  if (error.status !== undefined && error.status >= 400 && error.status < 500) {
    return error.status === 408 ? "failure" : error.status === 429 ? "neutral" : "healthy";
  }
  if (error.kind === "network" || error.kind === "timeout" || error.kind === "deadline" || error.kind === "server" ||
      (error.status !== undefined && error.status >= 500)) return "failure";
  return "neutral";
}

export class CircuitBreaker {
  #state: State = { kind: "closed", failures: 0 };

  constructor(private readonly threshold: number, private readonly cooldownMs: number) {}

  acquire(): State {
    if (this.#state.kind === "half-open") throw new VatTransportError("circuit_open");
    if (this.#state.kind === "open") {
      if (performance.now() < this.#state.until) throw new VatTransportError("circuit_open");
      this.#state = { kind: "half-open" };
    }
    return this.#state;
  }

  current(ticket: State): boolean {
    return ticket === this.#state;
  }

  finish(ticket: State, result: CircuitResult): void {
    if (!this.current(ticket)) return;
    if (ticket.kind === "half-open") {
      this.#state = result === "healthy" ? { kind: "closed", failures: 0 } : this.open();
    } else if (ticket.kind === "closed") {
      if (result === "healthy") ticket.failures = 0;
      if (result === "failure" && ++ticket.failures >= this.threshold) this.#state = this.open();
    }
  }

  private open(): State {
    return { kind: "open", until: performance.now() + this.cooldownMs };
  }
}
