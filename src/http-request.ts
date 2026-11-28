import { encodeRequestJson, encodeScalar } from "./exact-json.js";
import { operations } from "./generated/wire.js";
import type { OperationShape } from "./wire-schema.js";

export type HttpParameter = string | number | bigint | boolean;

export interface HttpRequestOptions {
  readonly path?: Readonly<Record<string, HttpParameter | undefined>>;
  readonly query?: Readonly<Record<string, HttpParameter | undefined>>;
  readonly headers?: Readonly<Record<string, string | undefined>>;
  readonly body?: unknown;
  readonly timeoutMs?: number;
  readonly deadlineMs?: number;
  readonly signal?: AbortSignal;
}

export interface PreparedRequest {
  readonly url: string;
  readonly init: Readonly<Omit<RequestInit, "headers" | "body"> & {
    readonly headers: Readonly<Record<string, string>>;
    readonly body?: string;
  }>;
  readonly contract: OperationShape;
}

function hasControl(value: string): boolean {
  for (const character of value) {
    const code = character.charCodeAt(0);
    if (code < 32 || code === 127) return true;
  }
  return false;
}

export function normalizeBase(input: string, allowInsecureLoopback: boolean): string {
  // Match before WHATWG normalization so dot segments and user info cannot disappear silently.
  const match = /^(https?):\/\/([^/?#\\\s@]+)(\/[A-Za-z0-9._~/-]*)?$/iu.exec(input);
  if (!match || hasControl(input)) throw new TypeError();
  const url = new URL(input);
  const authority = match[2]!;
  const segments = (match[3] ?? "").split("/");
  if (segments.includes(".") || segments.includes("..") || url.username || url.password) throw new TypeError();
  const literalLoopback = /^(?:127\.0\.0\.1|\[::1\])(?::[0-9]+)?$/u.test(authority);
  if (url.protocol !== "https:" && !(allowInsecureLoopback && literalLoopback)) throw new TypeError();
  return url.origin + url.pathname.replace(/\/+$/u, "");
}

function parameterValues(contract: OperationShape, options: HttpRequestOptions): Map<string, string> {
  const values = new Map<string, string>();
  const headerNames = new Map(Object.keys(contract.parameters).filter((key) => key.startsWith("header:"))
    .map((key) => [key.toLowerCase(), key]));
  for (const [place, entries] of [["path", options.path], ["query", options.query], ["header", options.headers]] as const) {
    for (const [name, value] of Object.entries(entries ?? {})) {
      if (value === undefined) continue;
      const qualified = `${place}:${name}`;
      const key = place === "header" ? headerNames.get(qualified.toLowerCase()) : qualified;
      if (!key || !Object.hasOwn(contract.parameters, key) || values.has(key)) throw new TypeError();
      values.set(key, encodeScalar(value, contract.parameters[key]!));
    }
  }
  if (contract.requiredParameters.some((name) => !values.has(name))) throw new TypeError();
  return values;
}

export function prepareRequest(base: string, key: string | undefined, operation: string,
  options: HttpRequestOptions, expectedContext?: string): PreparedRequest {
  if (typeof operation !== "string" || !Object.hasOwn(operations, operation)) throw new TypeError();
  const contract = operations[operation]!;
  const split = operation.indexOf(" ");
  const method = operation.slice(0, split);
  const parameters = parameterValues(contract, options);
  const path = operation.slice(split + 1).replace(/\{([^}]+)\}/gu, (_match, name: string) => {
    const value = parameters.get(`path:${name}`);
    if (!value || value.split("/").some((segment) => segment === "." || segment === "..") ||
        hasControl(value) || value.includes("\\")) {
      throw new TypeError();
    }
    return encodeURIComponent(value);
  });
  const url = new URL(base + path);
  const accept = new Set(Object.entries(contract.responses).filter(([status]) => status.startsWith("2"))
    .flatMap(([, response]) => Object.keys(response.content)));
  const headers = new Headers({ Accept: [...accept].join(", ") || "application/json" });
  if (contract.authentication === "api_key" && key !== undefined) headers.set("X-API-Key", key);
  for (const [parameter, value] of parameters) {
    if (parameter.startsWith("query:")) url.searchParams.append(parameter.slice(6), value);
    if (parameter.startsWith("header:")) {
      // Headers trims surrounding whitespace and normalizes line endings. Reject both changes.
      if (value.trim() !== value || hasControl(value)) throw new TypeError();
      headers.set(parameter.slice(7), value);
    }
  }
  const input = options.body;
  if (input === undefined && contract.bodyRequired) throw new TypeError();
  if (expectedContext !== undefined && contract.authentication === "api_key") {
    if (!contract.contextAssertion || headers.has("X-VAT-Expected-Context")) throw new TypeError();
    headers.set("X-VAT-Expected-Context", expectedContext);
  }
  const body = input === undefined ? undefined : encodeRequestJson(operation, "application/json", input);
  if (body !== undefined) headers.set("Content-Type", "application/json");
  const init = Object.freeze({
    method, headers: Object.freeze(Object.fromEntries(headers)), redirect: "manual", credentials: "omit",
    referrerPolicy: "no-referrer", cache: "no-store", ...(body === undefined ? {} : { body }),
  } as const);
  return Object.freeze({ url: url.href, init, contract });
}
