import { VatTransportError } from "./http-error.js";
import type { HttpResponseMetadata } from "./http-error.js";
import { normalizeBase, prepareRequest } from "./http-request.js";
import type { HttpRequestOptions, PreparedRequest } from "./http-request.js";
import { discardBody, readResponse, responseMetadata } from "./http-response.js";
import type { HttpTransportResponse } from "./http-response.js";

const defaultBase = "https://api.vat-engine.app";
const defaultBudgetMs = 30_000;
const defaultResponseLimit = 16 * 1024 * 1024;

export interface HttpTransportOptions {
  readonly baseUrl?: string;
  readonly apiKey?: string;
  readonly timeoutMs?: number;
  readonly deadlineMs?: number;
  readonly maxResponseBytes?: number;
  readonly allowInsecureLoopback?: boolean;
  /** Trusted Fetch-compatible implementation. It must honor manual redirects and verify TLS. */
  readonly fetch?: typeof globalThis.fetch;
}

export interface HttpTransport {
  request(operation: string, options?: HttpRequestOptions): Promise<HttpTransportResponse>;
}

function boundedInteger(value: number, maximum: number): number {
  if (!Number.isSafeInteger(value) || value <= 0 || value > maximum) throw new TypeError();
  return value;
}

export function createHttpTransport(options: HttpTransportOptions = {}): HttpTransport {
  try {
    const base = normalizeBase(options.baseUrl ?? defaultBase, options.allowInsecureLoopback === true);
    const key = options.apiKey;
    if (key !== undefined && (typeof key !== "string" || !/^[\x21-\x7e]{1,4096}$/u.test(key))) throw new TypeError();
    const defaultTimeout = boundedInteger(options.timeoutMs ?? defaultBudgetMs, 2_147_483_647);
    const defaultDeadline = boundedInteger(options.deadlineMs ?? defaultBudgetMs, 2_147_483_647);
    const limit = boundedInteger(options.maxResponseBytes ?? defaultResponseLimit, 128 * 1024 * 1024);
    const fetchRequest = options.fetch ?? globalThis.fetch;
    if (typeof fetchRequest !== "function") throw new TypeError();

    return Object.freeze({
      async request(operation: string, request: HttpRequestOptions = {}): Promise<HttpTransportResponse> {
        const started = performance.now();
        let prepared: PreparedRequest;
        let callerSignal: AbortSignal | undefined;
        let deadlineAt: number;
        let timeout: number;
        try {
          const signal = request.signal;
          if (signal !== undefined && !(signal instanceof AbortSignal)) throw new TypeError();
          callerSignal = signal;
          if (callerSignal?.aborted) throw new TypeError();
          deadlineAt = started + boundedInteger(request.deadlineMs ?? defaultDeadline, 2_147_483_647);
          timeout = boundedInteger(request.timeoutMs ?? defaultTimeout, 2_147_483_647);
          prepared = prepareRequest(base, key, operation, request);
        } catch {
          if (callerSignal?.aborted) throw new VatTransportError("aborted");
          throw new VatTransportError("invalid_request");
        }
        return execute(fetchRequest, prepared, operation, callerSignal, deadlineAt, timeout, limit);
      },
    });
  } catch {
    throw new VatTransportError("invalid_request");
  }
}

async function execute(fetchRequest: typeof globalThis.fetch, prepared: PreparedRequest, operation: string,
  caller: AbortSignal | undefined, deadlineAt: number, timeoutMs: number, limit: number): Promise<HttpTransportResponse> {
  const controller = new AbortController();
  const cancellation = caller && AbortSignal.any([caller]);
  const timeoutAt = performance.now() + timeoutMs;
  const cutoff = Math.min(deadlineAt, timeoutAt);
  const expiry = deadlineAt <= timeoutAt ? "deadline" : "timeout";
  let metadata: HttpResponseMetadata | undefined;

  function checkBudget() {
    if (caller?.aborted) throw new VatTransportError("aborted", metadata);
    if (performance.now() >= cutoff) throw new VatTransportError(expiry, metadata);
  }
  checkBudget();
  let interrupt!: (error: VatTransportError) => void;
  const interrupted = new Promise<never>((_resolve, reject) => { interrupt = reject; });
  function stop(kind: "aborted" | "deadline" | "timeout") {
    const error = new VatTransportError(kind, metadata);
    interrupt(error);
    controller.abort();
  }
  const onAbort = () => stop("aborted");
  cancellation?.addEventListener("abort", onAbort, { once: true });
  const timer = setTimeout(() => stop(expiry), Math.max(1, Math.ceil(cutoff - performance.now())));
  try {
    const result = await Promise.race([interrupted, receive()]);
    checkBudget();
    return result;
  } catch (error) {
    checkBudget();
    throw error;
  } finally {
    clearTimeout(timer);
    cancellation?.removeEventListener("abort", onAbort);
  }

  async function receive() {
    let response: Response;
    try {
      response = await fetchRequest(prepared.url, { ...prepared.init, signal: controller.signal });
      if (!(response instanceof Response) || response.status < 100) throw new TypeError();
      if (controller.signal.aborted) {
        discardBody(response);
        throw new TypeError();
      }
      metadata = responseMetadata(response);
    } catch {
      // Fetch failures and abort reasons can contain addresses or request data.
      throw new VatTransportError("network", metadata);
    }
    return readResponse(response, prepared.contract, operation, metadata, controller.signal, limit);
  }
}
