import { decodeResponseJson } from "./exact-json.js";
import { statusKind, VatTransportError } from "./http-error.js";
import type { HttpResponseMetadata, ServerErrorFields } from "./http-error.js";
import type { OperationShape } from "./wire-schema.js";

export type HttpTransportResponse =
  | { readonly kind: "json"; readonly data: unknown; readonly metadata: HttpResponseMetadata }
  | { readonly kind: "bytes"; readonly data: Uint8Array; readonly metadata: HttpResponseMetadata }
  | { readonly kind: "empty"; readonly metadata: HttpResponseMetadata };

const maxErrorBytes = 64 * 1024;
const utf8 = new TextDecoder("utf-8", { fatal: true });
const rateHeaders = ["ratelimit-limit", "ratelimit-remaining", "ratelimit-reset",
  "x-ratelimit-limit", "x-ratelimit-remaining", "x-ratelimit-reset"] as const;

function nonnegativeInteger(input: string | null): number | undefined {
  if (input === null || !/^\d+$/u.test(input)) return undefined;
  const parsed = Number(input);
  return Number.isSafeInteger(parsed) ? parsed : undefined;
}

function retryAfter(input: string | null): number | undefined {
  const seconds = nonnegativeInteger(input);
  if (seconds !== undefined) return seconds;
  // Standard IMF-fixdate and the two obsolete HTTP-date forms recipients may receive.
  if (input === null || !/^(?:[A-Za-z]{3}, \d{2} [A-Za-z]{3} \d{4} \d{2}:\d{2}:\d{2} GMT|[A-Za-z]+, \d{2}-[A-Za-z]{3}-\d{2} \d{2}:\d{2}:\d{2} GMT|[A-Za-z]{3} [A-Za-z]{3} [ \d]\d \d{2}:\d{2}:\d{2} \d{4})$/u.test(input)) {
    return undefined;
  }
  const date = Date.parse(input.endsWith(" GMT") ? input : input + " GMT");
  if (!Number.isFinite(date)) return undefined;
  if (/^[A-Za-z]{3},/u.test(input) && new Date(date).toUTCString() !== input) return undefined;
  return Math.max(0, Math.ceil((date - Date.now()) / 1000));
}

function isRedirect(response: Response): boolean {
  return response.redirected || (response.status >= 300 && response.status < 400);
}

export function responseMetadata(response: Response): HttpResponseMetadata {
  const { headers, status } = response;
  // A redirect destination may contain credentials. Never expose its headers.
  if (isRedirect(response)) return Object.freeze({ status });
  const fields = {
    requestId: headers.get("x-request-id"),
    environment: headers.get("x-vat-environment"),
    contentType: headers.get("content-type"),
    contentDisposition: headers.get("content-disposition"),
    cacheControl: headers.get("cache-control"),
    location: headers.get("location"),
  };
  const metadata: Record<string, unknown> = { status };
  for (const [key, value] of Object.entries(fields)) {
    if (value !== null) metadata[key] = value;
  }
  const retryAfterSeconds = retryAfter(headers.get("retry-after"));
  if (retryAfterSeconds !== undefined) metadata.retryAfterSeconds = retryAfterSeconds;
  const contentLength = nonnegativeInteger(headers.get("content-length"));
  if (contentLength !== undefined) metadata.contentLength = contentLength;
  const rates: Record<string, number> = {};
  for (const header of rateHeaders) {
    const value = nonnegativeInteger(headers.get(header));
    if (value !== undefined) rates[header] = value;
  }
  if (Object.keys(rates).length) metadata.rateLimit = Object.freeze(rates);
  return Object.freeze({ ...metadata, status });
}

export function discardBody(response: Response): void {
  void response.body?.cancel().catch(() => undefined);
}

async function readBody(response: Response, limit: number, signal: AbortSignal,
  metadata: HttpResponseMetadata): Promise<Uint8Array> {
  if (!response.body) return new Uint8Array(0);
  if (response.body.locked) throw new VatTransportError("network", metadata);
  const reader = response.body.getReader();
  const cancel = () => { void reader.cancel().catch(() => undefined); };
  signal.addEventListener("abort", cancel, { once: true });
  if (signal.aborted) cancel();
  let bytes = new Uint8Array(Math.min(8192, limit));
  let total = 0;
  try {
    for (;;) {
      const next = await reader.read();
      if (next.done) break;
      const length = total + next.value.byteLength;
      if (length > limit) throw new VatTransportError("response_too_large", metadata);
      if (length > bytes.length) {
        const grown = new Uint8Array(Math.min(limit, Math.max(length, bytes.length * 2)));
        grown.set(bytes);
        bytes = grown;
      }
      bytes.set(next.value, total);
      total = length;
    }
  } catch (error) {
    cancel();
    if (error instanceof VatTransportError && error.kind === "response_too_large") throw error;
    throw new VatTransportError("network", metadata);
  } finally {
    signal.removeEventListener("abort", cancel);
    reader.releaseLock();
  }
  return bytes.length === total ? bytes : bytes.slice(0, total);
}

const mediaType = (value: string) => value.split(";", 1)[0]!.trim().toLowerCase();

function expectedMedia(value: string | undefined, content: OperationShape["request"]): string | undefined {
  if (!value) return undefined;
  const received = mediaType(value);
  return Object.keys(content).find((media) => mediaType(media) === received);
}

async function serverError(response: Response, metadata: HttpResponseMetadata,
  signal: AbortSignal, limit: number): Promise<ServerErrorFields | undefined> {
  const media = mediaType(metadata.contentType ?? "");
  if (media !== "application/json" && !media.endsWith("+json")) {
    discardBody(response);
    return undefined;
  }
  try {
    const body = await readBody(response, Math.min(limit, maxErrorBytes), signal, metadata);
    const parsed: unknown = JSON.parse(utf8.decode(body));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return undefined;
    const { error, detail } = parsed as Record<string, unknown>;
    const code = typeof error === "string" && error.length !== 0 ? error : undefined;
    const description = typeof detail === "string" && detail.length !== 0 ? detail : undefined;
    return code !== undefined || description !== undefined
      ? Object.freeze({ ...(code === undefined ? {} : { code }), ...(description === undefined ? {} : { detail: description }) })
      : undefined;
  } catch {
    // The HTTP status is still authoritative when an error body cannot be read or decoded.
    return undefined;
  }
}

export async function readResponse(response: Response, contract: OperationShape, operation: string,
  metadata: HttpResponseMetadata, signal: AbortSignal, limit: number): Promise<HttpTransportResponse> {
  if (isRedirect(response)) {
    discardBody(response);
    throw new VatTransportError("redirect", metadata);
  }
  if (!response.ok) {
    throw new VatTransportError(statusKind(response.status), metadata, await serverError(response, metadata, signal, limit));
  }
  const documented = contract.responses[String(response.status)];
  if (!documented) {
    discardBody(response);
    throw new VatTransportError("malformed_response", metadata);
  }
  const media = expectedMedia(metadata.contentType, documented.content);
  if (Object.keys(documented.content).length === 0) {
    const bytes = await readBody(response, limit, signal, metadata);
    if (bytes.length) throw new VatTransportError("malformed_response", metadata);
    return { kind: "empty", metadata };
  }
  if (!media) {
    discardBody(response);
    throw new VatTransportError("malformed_response", metadata);
  }
  const bytes = await readBody(response, limit, signal, metadata);
  if (documented.content[media]?.kind === "bytes") return { kind: "bytes", data: bytes, metadata };
  try {
    const data = decodeResponseJson(operation, response.status, media, utf8.decode(bytes));
    if (data === null) throw new TypeError();
    return { kind: "json", data, metadata };
  } catch {
    throw new VatTransportError("malformed_response", metadata);
  }
}
