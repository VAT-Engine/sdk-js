export interface HttpResponseMetadata {
  readonly status: number;
  readonly requestId?: string;
  readonly environment?: string;
  readonly retryAfterSeconds?: number;
  readonly rateLimit?: Readonly<Record<string, number>>;
  readonly contentType?: string;
  readonly contentDisposition?: string;
  readonly contentLength?: number;
  readonly cacheControl?: string;
  readonly location?: string;
}

const messages = {
  invalid_request: "Invalid VAT Engine request or transport options",
  aborted: "VAT Engine request was cancelled",
  timeout: "VAT Engine request timed out",
  deadline: "VAT Engine request deadline expired",
  network: "VAT Engine connection or response stream failed",
  redirect: "VAT Engine redirect was blocked",
  malformed_response: "VAT Engine response did not match the expected media or format",
  response_too_large: "VAT Engine response exceeded the configured size limit",
  authentication: "VAT Engine rejected authentication",
  authorization: "VAT Engine denied access",
  not_found: "VAT Engine resource was not found",
  validation: "VAT Engine rejected the request",
  conflict: "VAT Engine reported a conflict",
  rate_limit: "VAT Engine rate limit exceeded",
  server: "VAT Engine reported a server error",
  http: "VAT Engine returned an HTTP error",
} as const;

export type HttpErrorKind = keyof typeof messages;

export interface ServerErrorFields {
  readonly code?: string;
  readonly detail?: string;
}

/** Response metadata and server text are available explicitly and excluded from diagnostics. */
export class VatTransportError extends Error {
  readonly kind: HttpErrorKind;
  readonly #metadata: HttpResponseMetadata | undefined;
  readonly #serverError: ServerErrorFields | undefined;

  constructor(kind: HttpErrorKind, metadata?: HttpResponseMetadata, serverError?: ServerErrorFields) {
    super(messages[kind]);
    this.name = "VatTransportError";
    this.kind = kind;
    this.#metadata = metadata;
    this.#serverError = serverError;
  }

  get status(): number | undefined {
    return this.#metadata?.status;
  }

  /** Server-controlled metadata. Treat trace IDs and optional headers as untrusted. */
  getResponseMetadata(): HttpResponseMetadata | undefined {
    return this.#metadata;
  }

  /** Server-controlled fields for application handling. They may contain sensitive data. */
  getServerError(): ServerErrorFields | undefined {
    return this.#serverError;
  }

  toJSON(): { name: string; kind: HttpErrorKind; status?: number } {
    const status = this.status;
    return { name: "VatTransportError", kind: this.kind, ...(status === undefined ? {} : { status }) };
  }
}

export function statusKind(status: number): HttpErrorKind {
  switch (status) {
    case 400:
    case 413:
    case 422: return "validation";
    case 401: return "authentication";
    case 403: return "authorization";
    case 404: return "not_found";
    case 409: return "conflict";
    case 429: return "rate_limit";
    default: return status >= 500 ? "server" : "http";
  }
}
