import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import { test } from "node:test";
import { URL } from "node:url";
import { parse } from "yaml";
import { createHttpTransport, createVatClient, UnknownOutcomeError, VatTransportError } from "../dist/index.js";
import { decodeRequestJson } from "../dist/exact-json.js";

const root = new URL("../contract/", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const { methods } = JSON.parse(read("js-methods.json"));
const { operations } = JSON.parse(read("operations.json"));
const { cases, supplyReferenceCases } = JSON.parse(read("fixtures/cases.json"));
const spec = parse(read("openapi.yaml"), { intAsBigInt: true });
const getFixture = (id) => cases.find((entry) => entry.id === id);
const contextId = "ctx_" + "a".repeat(64);
const uuid = "00000000-0000-4000-8000-000000000001";
const key = "fixture-core-api-key";
const json = "application/json";
const supply = "POST /v1/supplies";

function resolve(node) {
  if (!node?.$ref) return node;
  return resolve(node.$ref.slice(2).split("/").reduce((current, part) =>
    current[part.replaceAll("~1", "/").replaceAll("~0", "~")], spec));
}

function specimen(schema) {
  const resolved = resolve(schema);
  if (resolved.enum) {
    const first = resolved.enum[0];
    return typeof first === "bigint" && resolved.format !== "int64" ? Number(first) : first;
  }
  if (resolved.allOf) {
    const parts = resolved.allOf.map(specimen);
    return parts.length === 1 ? parts[0] : Object.assign({}, ...parts);
  }
  if (resolved.anyOf || resolved.oneOf) return specimen((resolved.anyOf ?? resolved.oneOf)[0]);
  if (resolved.type === "integer" || resolved.type === "number") {
    const first = resolved.minimum ?? (resolved.format === "int64" ? 9007199254740993n : 1n);
    const value = resolved.maximum !== undefined && first > resolved.maximum ? resolved.maximum : first;
    return resolved.format === "int64" ? BigInt(value) : Number(value);
  }
  if (resolved.type === "boolean") return false;
  if (resolved.type === "array") return Array.from({ length: Number(resolved.minItems ?? 1) }, () => specimen(resolved.items));
  if (resolved.type === "string") {
    if (resolved.pattern) {
      const pattern = new RegExp(resolved.pattern, "u");
      const candidate = [contextId, "a".repeat(64), "2026-Q1", "2026-01", "2026-01-02", "DE", "EUR", "123456", "1"]
        .find((value) => pattern.test(value) && value.length >= Number(resolved.minLength ?? 0) &&
          value.length <= Number(resolved.maxLength ?? Infinity));
      assert(candidate !== undefined, `No synthetic pattern example for ${resolved.pattern}`);
      return candidate;
    }
    if (resolved.format === "uuid") return uuid;
    if (resolved.format === "date") return "2026-01-02";
    if (resolved.format === "date-time") return "2026-01-02T00:00:00Z";
    if (resolved.format === "uri") return "https://example.invalid/fixture";
    return "fixture".repeat(Math.ceil(Number(resolved.minLength ?? 7) / 7)).slice(0, Number(resolved.maxLength ?? 100));
  }
  const entries = Object.entries(resolved.properties ?? {});
  const keys = resolved.required ?? entries.slice(0, 1).map(([name]) => name);
  const result = Object.fromEntries(keys.map((name) => [name, specimen(resolved.properties[name])]));
  if (typeof resolved.additionalProperties === "object") {
    for (let index = keys.length; index < Number(resolved.minProperties ?? 0); index++) {
      result[`fixture${index}`] = specimen(resolved.additionalProperties);
    }
  }
  return result;
}

function requestOptions(operation, catalog) {
  const [method, path] = operation.split(" ");
  const options = {};
  for (const [key, { schema }] of Object.entries(catalog.request.parameters)) {
    const [location, name] = key.split(":");
    const group = location === "header" ? "headers" : location;
    (options[group] ??= {})[name] = specimen(schema);
  }
  const request = resolve(spec.paths[path][method.toLowerCase()].requestBody);
  if (request) options.body = specimen(request.content[json].schema);
  return options;
}

function wireJson(value) {
  return JSON.stringify(value, (_key, child) => typeof child === "bigint" ? JSON.rawJSON(child.toString()) : child);
}

async function local(t, handler) {
  const calls = [];
  const server = createServer(async (req, res) => {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const call = { url: req.url, method: req.method, headers: req.headers, body: Buffer.concat(chunks).toString("utf8") };
    calls.push(call);
    handler(call, res);
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  t.after(() => new Promise((resolve) => {
    server.close(resolve);
    server.closeAllConnections();
  }));
  return { config: { baseUrl: `http://127.0.0.1:${server.address().port}`, allowInsecureLoopback: true }, calls };
}

function expectWire(operation, entry, options, call) {
  const [verb, template] = operation.split(" ");
  const path = template.replace(/\{([^}]+)\}/gu, (_match, name) => encodeURIComponent(String(options.path[name])));
  const url = new URL(call.url, "https://example.invalid");
  assert.equal(call.method, verb);
  assert.equal(url.pathname, path);
  assert.deepEqual(Object.fromEntries(url.searchParams),
    Object.fromEntries(Object.entries(options.query ?? {}).map(([name, value]) => [name, String(value)])));
  for (const [name, value] of Object.entries(options.headers ?? {})) {
    assert.equal(call.headers[name.toLowerCase()], String(value));
  }
  assert.equal(call.headers["x-api-key"], entry.authentication === "api_key" ? key : undefined);
  const accept = [...new Set(Object.entries(entry.responses).filter(([status]) => status.startsWith("2"))
    .flatMap(([, response]) => Object.keys(response.media)))].sort();
  assert.deepEqual(call.headers.accept.split(", ").sort(), accept);
  assert.equal(call.body, options.body === undefined ? "" : wireJson(options.body));
  assert.equal(call.headers["content-type"], options.body === undefined ? undefined : json);
  if (entry.behavior !== "read_only") assert.equal(call.headers["content-length"], String(Buffer.byteLength(call.body)));
}

function expectedError(status) {
  const kinds = { 400: "validation", 401: "authentication", 403: "authorization", 404: "not_found",
    409: "conflict", 413: "validation", 422: "validation", 429: "rate_limit" };
  return kinds[status] ?? (status >= 500 ? "server" : "http");
}

test("all pinned CORE methods dispatch exact request shapes, success media and documented errors", async (t) => {
  let next;
  const { config, calls } = await local(t, (_call, res) => {
    res.writeHead(next.status, next.headers);
    res.end(next.body);
  });
  const client = createVatClient({ ...config, apiKey: key, retry: false });
  assert.deepEqual(Object.keys(methods).sort(), Object.keys(operations).sort());
  const groups = new Map();
  for (const name of Object.values(methods)) {
    const [module, method] = name.split(".");
    const members = groups.get(module) ?? [];
    members.push(method);
    groups.set(module, members);
  }
  for (const [module, members] of groups) {
    assert.deepEqual(Object.keys(client[module]).sort(), members.sort());
  }

  for (const [operation, name] of Object.entries(methods)) {
    await t.test(name, async () => {
      const [module, method] = name.split(".");
      const [verb, path] = operation.split(" ");
      const entry = operations[operation];
      const description = spec.paths[path][verb.toLowerCase()];
      const call = client[module][method];
      for (const [status, response] of Object.entries(entry.responses)) {
        const options = requestOptions(operation, entry);
        if (status.startsWith("2")) {
          for (const [media, mode] of Object.entries(response.media)) {
            if (options.query?.format !== undefined) options.query.format = media.startsWith("text/csv") ? "csv" : "json";
            const body = mode === "json"
              ? specimen(resolve(description.responses[status]).content[media].schema)
              : new Uint8Array([0xef, 0xbb, 0xbf, 0x30, 0x0d, 0x0a]);
            next = { status: Number(status), body: mode === "json" ? wireJson(body) : body,
              headers: { "Content-Type": media, "X-Request-ID": "fixture-correlation" } };
            const result = await call(options);
            assert.equal(result.kind, mode);
            assert.deepEqual(result.data, body);
            assert.equal(result.metadata.status, Number(status));
            assert.equal(result.metadata.requestId, "fixture-correlation");
            expectWire(operation, entry, options, calls.at(-1));
          }
        } else {
          const documentedJson = Object.hasOwn(response.media, json);
          const before = calls.length;
          next = { status: Number(status), body: documentedJson
            ? '{"error":"fixture_error","detail":"Synthetic failure"}' : "Synthetic failure",
          headers: { "Content-Type": documentedJson ? json : "text/plain", "X-Request-ID": "fixture-correlation" } };
          await assert.rejects(call(options), (error) => {
            assert(error instanceof VatTransportError);
            const kind = expectedError(Number(status));
            if (entry.behavior === "mutation" && kind === "server") {
              assert(error instanceof UnknownOutcomeError);
              assert.equal(error.failureKind, kind);
            } else {
              assert.equal(error.kind, kind);
              assert.equal(error.getServerError()?.code, documentedJson ? "fixture_error" : undefined);
            }
            assert.equal(error.status, Number(status));
            assert.equal(error.getResponseMetadata()?.requestId, "fixture-correlation");
            return true;
          });
          expectWire(operation, entry, options, calls.at(-1));
          if (status === "421" && entry.behavior === "read_only") {
            // Native Fetch may recover a bodyless read on a new connection.
            assert(calls.length - before === 1 || calls.length - before === 2);
          } else {
            assert.equal(calls.length - before, 1);
          }
        }
      }
    });
  }
});

function supplyFixture(id) {
  const request = getFixture(id).exchanges[0].request;
  return decodeRequestJson(supply, json, request.body);
}

test("supply entry points reproduce the shared UTF-8 reference fixtures for each identity field", async (t) => {
  const response = getFixture("supply-replay").exchanges[0].response;
  const { config, calls } = await local(t, (_call, res) => {
    res.writeHead(201, { "Content-Type": json });
    res.end(response.body);
  });
  const client = createVatClient({ ...config, apiKey: key, retry: false });
  for (const field of ["external_order_id", "external_line_id", "external_event_id"]) {
    for (const entry of supplyReferenceCases) {
      const body = supplyFixture(field === "external_event_id" ? "signed-int64-boundaries" : "supply-replay");
      // JavaScript receives text as UTF-16. A lone surrogate is its malformed-text equivalent.
      body.event[field] = entry.inputHex ? "\ud800" : entry.input;
      const input = body.event[field];
      const count = calls.length;
      if (entry.valid && entry.normalized !== "") {
        await client.supplies.commit({ body });
        assert.equal(JSON.parse(calls.at(-1).body).event[field], entry.normalized);
        assert.equal(Buffer.byteLength(entry.normalized), entry.utf8Bytes);
        assert.equal(calls.length, count + 1);
      } else {
        await assert.rejects(client.supplies.commit({ body }), { kind: "invalid_request" });
        assert.equal(calls.length, count);
      }
      assert.equal(body.event[field], input, "Normalization must not change caller data");
    }
  }
  const optional = supplyFixture("supply-replay");
  optional.event.external_event_id = "\t\u00a0";
  await client.supplies.commit({ body: optional });
  assert.equal(Object.hasOwn(JSON.parse(calls.at(-1).body).event, "external_event_id"), false);
  optional.event.external_order_id = "\u001fid\uFEFF";
  await createHttpTransport(config).request(supply, { body: optional });
  assert.equal(JSON.parse(calls.at(-1).body).event.external_order_id, "\u001fid\uFEFF");
  const count = calls.length;
  optional.event.external_line_id = Buffer.from([0xc3, 0x28]);
  await assert.rejects(client.request(supply, { body: optional }), { kind: "invalid_request" });
  assert.equal(calls.length, count);
  const unsafe = supplyFixture("supply-replay");
  unsafe.event.event_version = Number.MAX_SAFE_INTEGER + 1;
  await assert.rejects(client.supplies.commit({ body: unsafe }), { kind: "invalid_request" });
  assert.equal(calls.length, count);
});

test("normalized supply bytes and exact signed amounts survive an eligible replay", async (t) => {
  const input = supplyFixture("signed-int64-boundaries");
  input.event.external_event_id = "\u2003synthetic-refund\u0085";
  input.event.supplier_establishment_country = "DE";
  input.event.dispatch_country = "DE";
  const response = getFixture("signed-int64-boundaries").exchanges[0].response;
  const { config, calls } = await local(t, (_call, res) => {
    if (calls.length === 1) {
      res.writeHead(503, { "Content-Type": json });
      res.end("{}");
    } else {
      res.writeHead(200, { "Content-Type": json });
      res.end(JSON.stringify({ ...JSON.parse(response.body), result: "duplicate" }));
    }
  });
  const client = createVatClient({ ...config, apiKey: key, retry: { baseDelayMs: 1 } });
  const result = await client.supplies.commit({ body: input });
  assert.equal(result.data.result, "duplicate");
  assert.equal(result.data.event_version, "9223372036854775807");
  assert.equal(calls.length, 2);
  assert.equal(calls[0].body, calls[1].body);
  assert.match(calls[0].body, /"taxable_amount_minor":-9223372036854775808/);
  assert.match(calls[0].body, /"external_event_id":"synthetic-refund"/);
});

test("named operations retain preflight controls and the pinned sandbox error variant", async (t) => {
  const { config, calls } = await local(t, (call, res) => {
    if (call.url === "/v1/auth/context") {
      res.writeHead(200, { "Content-Type": json, "Cache-Control": "no-store", "X-VAT-Environment": "sandbox" });
      res.end('{"context_id":"' + contextId + '","environment":"sandbox","scopes":["read-only"]}');
    } else {
      res.writeHead(403, { "Content-Type": json });
      res.end(getFixture("filing-sandbox-lock").exchanges[0].response.body);
    }
  });
  const binding = { baseUrl: config.baseUrl, contextId, environment: "sandbox" };
  const client = createVatClient({ ...config, apiKey: key, strictContext: binding });
  await assert.rejects(client.reports.lockUnionOssReturnPeriod({ query: { period: "2026-Q1" } }),
    { kind: "context_scope" });
  assert.deepEqual(calls.map((call) => call.url), ["/v1/auth/context"]);
  const ordinary = createVatClient({ ...config, apiKey: key });
  await assert.rejects(ordinary.reports.lockUnionOssReturnPeriod({ query: { period: "2026-Q1" } }), (error) => {
    assert.equal(error.status, 403);
    assert.deepEqual(error.getServerError(), { code: "sandbox_filing_unavailable" });
    return true;
  });
  assert.equal(calls.length, 2);
});

test("typed download returns the original pinned JSON archive bytes", async (t) => {
  const { request, response } = getFixture("json-archive-bytes").exchanges[0];
  const bytes = readFileSync(new URL(response.bodyFile, root));
  const { config } = await local(t, (_call, res) => {
    res.writeHead(200, { ...response.headers, "Content-Type": response.media });
    res.end(bytes);
  });
  const result = await createVatClient({ ...config, apiKey: key }).reports.downloadLockedUnionOssExport({ path: request.path });
  assert.equal(result.kind, "bytes");
  assert.equal(createHash("sha256").update(result.data).digest("hex"), response.sha256);
});

test("registration and credential claim run only on explicit named calls and never install the returned key", async (t) => {
  const registration = getFixture("agent-registration").exchanges[0];
  const [pending, approved] = getFixture("agent-claim").exchanges;
  const responses = [registration.response, pending.response, approved.response, getFixture("auth-context-discovery").exchanges[0].response];
  let index = 0;
  const { config, calls } = await local(t, (_call, res) => {
    const response = responses[index++];
    res.writeHead(response.status, { ...response.headers, "Content-Type": response.media });
    res.end(response.body);
  });
  const client = createVatClient({ ...config, apiKey: key });
  const started = await client.auth.startAgentRegistration({ body: JSON.parse(registration.request.body) });
  assert.equal(started.metadata.status, 202);
  assert.equal(calls.length, 1);
  await assert.rejects(client.auth.claimAgentApiKey({ body: JSON.parse(pending.request.body) }), (error) => {
    assert.equal(error.getServerError().code, "authorization_pending");
    assert.equal(error.metadata, undefined);
    assert.equal(error.getResponseMetadata().retryAfterSeconds, Number(pending.response.headers["Retry-After"]));
    return true;
  });
  assert.equal(calls.length, 2);
  const claimed = await client.auth.claimAgentApiKey({ body: JSON.parse(approved.request.body) });
  assert.equal(claimed.data.api_key, JSON.parse(approved.response.body).api_key);
  await client.auth.getContext();
  assert.deepEqual(calls.map((call) => call.headers["x-api-key"]), [undefined, undefined, undefined, key]);
});

test("named methods preserve null, false and optional absence in structured results", async (t) => {
  const { exchanges } = getFixture("sme-decimal-null-and-omission");
  let index = 0;
  const { config, calls } = await local(t, (_call, res) => {
    const response = exchanges[index++].response;
    res.writeHead(response.status, { "Content-Type": response.media });
    res.end(response.body);
  });
  const client = createVatClient(config);
  for (const [i, exchange] of exchanges.entries()) {
    const body = decodeRequestJson("POST /v1/vat/sme-eligibility", json, exchange.request.body);
    if (i === 0) body.annual_turnover_nac = Number(body.annual_turnover_nac);
    const result = await client.sme.checkEligibility({ body });
    assert.equal(result.data.ecb_rate_eur, [null, 4.275, undefined][i]);
    assert.equal(Object.hasOwn(result.data, "ecb_rate_eur"), i !== 2);
    assert.equal(result.data.policy.one_national_annual_threshold, false);
    assert.equal(calls[i].body, exchange.request.body);
  }
});

test("native Fetch does not replay a bodyless write on HTTP 421", async (t) => {
  const { config, calls } = await local(t, (_call, res) => {
    res.writeHead(421, { "Content-Type": "text/plain" });
    res.end("misdirected");
  });
  const client = createVatClient({ ...config, apiKey: key });
  await assert.rejects(client.reports.lockUnionOssReturnPeriod({ query: { period: "2026-Q1" } }),
    { kind: "http", status: 421 });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].body, "");
});
