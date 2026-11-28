import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { createServer } from "node:http";
import { createServer as createTlsServer } from "node:https";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { setTimeout as delay } from "node:timers/promises";
import { URL } from "node:url";
import { inspect } from "node:util";
import { Buffer } from "node:buffer";
import { gzipSync } from "node:zlib";
import { decodeRequestJson } from "../dist/exact-json.js";
import { createHttpTransport, VatTransportError } from "../dist/index.js";

const fixtureRoot = new URL("../contract/", import.meta.url);
const fixtures = JSON.parse(readFileSync(new URL("fixtures/cases.json", fixtureRoot), "utf8")).cases;
const fixture = (id) => fixtures.find((item) => item.id === id);
const exampleKey = "fixture-api-key";
const json = "application/json";
const { AbortController, ReadableStream, Response } = globalThis;

function supplyBody() {
  return decodeRequestJson("POST /v1/supplies", json, fixture("supply-replay").exchanges[0].request.body);
}

async function listen(t, server) {
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
    server.closeAllConnections();
  }));
  return server.address().port;
}

async function local(t, handler) {
  const port = await listen(t, createServer(handler));
  return { baseUrl: `http://127.0.0.1:${port}`, allowInsecureLoopback: true };
}

function capture(handler) {
  const calls = [];
  return {
    calls,
    handler: async (req, res) => {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const call = { url: req.url, method: req.method, headers: req.headers, body: Buffer.concat(chunks).toString("utf8") };
      calls.push(call);
      handler(call, res);
    },
  };
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, headers);
  res.end(body);
}

function replyFixture(response, res) {
  const body = response.bodyFile ? readFileSync(new URL(response.bodyFile, fixtureRoot)) : response.body;
  send(res, response.status, body, { ...response.headers, ...(response.media && { "Content-Type": response.media }) });
}

function typed(kind, status) {
  return (error) => {
    assert(error instanceof VatTransportError);
    assert.equal(error.kind, kind);
    if (status !== undefined) assert.equal(error.status, status);
    return true;
  };
}

test("native Fetch serializes supply requests exactly and keeps receipt revision strings", async (t) => {
  const { operation, exchanges } = fixture("supply-replay");
  const fake = capture((_call, res) => replyFixture(exchanges[fake.calls.length - 1].response, res));
  const client = createHttpTransport({ ...await local(t, fake.handler), apiKey: exampleKey });
  for (const { request, response } of exchanges.slice(0, 2)) {
    const body = decodeRequestJson(operation, request.media, request.body);
    const value = await client.request(operation, { body });
    assert.equal(value.kind, "json");
    assert.equal(value.data.event_version, JSON.parse(response.body).event_version);
    assert.equal(value.metadata.status, response.status);
  }
  assert.equal(fake.calls[0].method, "POST");
  for (const call of fake.calls) {
    assert.equal(call.headers["x-api-key"], exampleKey);
    assert.equal(call.headers["content-type"], json);
    assert.equal(call.body, exchanges[0].request.body);
  }
  const overflow = decodeRequestJson(operation, json, exchanges[0].request.body);
  overflow.event.event_version = 1n << 63n;
  await assert.rejects(client.request(operation, { body: overflow }), typed("invalid_request"));
  assert.equal(fake.calls.length, 2);
});

test("preserves explicit null, false, omission and header values from calculation fixtures", async (t) => {
  const { operation, exchanges } = fixture("calculate-missing-or-null-price-flag");
  const fake = capture((_call, res) => replyFixture(exchanges[fake.calls.length - 1].response, res));
  const client = createHttpTransport(await local(t, fake.handler));
  for (const { request } of exchanges) {
    await assert.rejects(client.request(operation, {
      body: decodeRequestJson(operation, json, request.body),
      headers: { "idempotency-key": "stable-fixture", "X-Source-ID": "source-fixture" },
    }), (error) => {
      typed("validation", 400)(error);
      assert.equal(error.getServerError().code, "missing_price_includes_vat");
      return true;
    });
  }
  assert.equal(Object.hasOwn(JSON.parse(fake.calls[0].body), "price_includes_vat"), false);
  assert.equal(JSON.parse(fake.calls[1].body).price_includes_vat, null);
  assert.equal(fake.calls[1].headers["idempotency-key"], "stable-fixture");
  assert.equal(fake.calls[1].headers["x-source-id"], "source-fixture");

  const success = fixture("calculate-pinned-retry").exchanges[0];
  const second = capture((_call, res) => replyFixture(success.response, res));
  const tax = createHttpTransport(await local(t, second.handler));
  const decoded = decodeRequestJson(operation, json, success.request.body);
  decoded.price_includes_vat = false;
  const value = await tax.request(operation, { body: decoded });
  assert.equal(typeof value.data.gross_amount_minor, "bigint");
  assert.equal(JSON.parse(second.calls[0].body).price_includes_vat, false);
  assert.equal(Object.hasOwn(value.metadata, "retryAfterSeconds"), false);
});

test("pins origin and API key to instances and withholds the key from anonymous and claim operations", async (t) => {
  const original = capture((call, res) => {
    if (call.url === "/agent/auth/claim") {
      replyFixture(fixture("agent-claim").exchanges[1].response, res);
    } else if (call.url === "/prefixed/v1/auth/context") {
      replyFixture(fixture("auth-context-discovery").exchanges[0].response, res);
    } else {
      replyFixture(fixture("public-health").exchanges[0].response, res);
    }
  });
  const other = capture((_call, res) => replyFixture(fixture("auth-context-discovery").exchanges[0].response, res));
  const first = await local(t, original.handler);
  const second = await local(t, other.handler);
  const config = { ...first, baseUrl: first.baseUrl + "/prefixed/", apiKey: exampleKey };
  const one = createHttpTransport(config);
  const controller = createHttpTransport({ ...second, apiKey: "other-fixture-key" });
  const inFlight = one.request("GET /v1/auth/context");
  config.apiKey = "mutated-fixture-key";
  config.baseUrl = second.baseUrl;
  await Promise.all([inFlight, controller.request("GET /v1/auth/context"), one.request("GET /health")]);
  const claim = fixture("agent-claim").exchanges[1].request;
  const receipt = await createHttpTransport({ ...first, apiKey: exampleKey })
    .request("POST /agent/auth/claim", { body: JSON.parse(claim.body) });
  assert.equal(typeof receipt.data.api_key, "string");
  const protectedCall = original.calls.find(({ url }) => url === "/prefixed/v1/auth/context");
  assert.equal(protectedCall.headers["x-api-key"], exampleKey);
  assert.equal(other.calls[0].headers["x-api-key"], "other-fixture-key");
  for (const call of original.calls.filter((entry) => entry !== protectedCall)) {
    assert.equal(call.headers["x-api-key"], undefined);
    assert.equal(call.headers.cookie, undefined);
  }
  assert.deepEqual(JSON.parse(original.calls.find(({ url }) => url === "/agent/auth/claim").body), JSON.parse(claim.body));
});

test("captures body and semantic headers before dispatch can suspend", async () => {
  const { operation, exchanges } = fixture("calculate-pinned-retry");
  const response = exchanges[0].response;
  const request = exchanges[0].request;
  const original = decodeRequestJson(operation, json, request.body);
  const options = { body: original, headers: { "X-Source-ID": "initial" } };
  let wire;
  const transport = createHttpTransport({
    apiKey: exampleKey,
    async fetch(url, init) {
      await Promise.resolve();
      wire = { url, ...init };
      return new Response(response.body, { status: response.status, headers: { "Content-Type": json } });
    },
  });
  const pending = transport.request(operation, options);
  original.gross_amount_minor = 0n;
  options.headers["X-Source-ID"] = "modified";
  await pending;
  assert.equal(wire.url, "https://api.vat-engine.app/v1/vat/calculate");
  assert.equal(wire.headers.get("x-source-id"), "initial");
  assert.equal(wire.headers.get("x-api-key"), exampleKey);
  assert.equal(wire.body, request.body);
  assert.equal(wire.redirect, "manual");
  assert.equal(wire.credentials, "omit");
  assert.equal(wire.referrerPolicy, "no-referrer");
});

test("encodes path segments, query values and numeric wire parameters", async (t) => {
  const fake = capture((call, res) => {
    if (call.url.startsWith("/v1/tax-classes/")) return send(res, 200, '{"id":"sample"}', { "Content-Type": json });
    if (call.url.startsWith("/v1/sources/")) return send(res, 403, undefined);
    return replyFixture(fixture("transaction-cursor-null").exchanges[0].response, res);
  });
  const client = createHttpTransport(await local(t, fake.handler));
  await client.request("GET /v1/tax-classes/{id}", { path: { id: "é /?#%" } });
  assert.equal(fake.calls[0].url, "/v1/tax-classes/%C3%A9%20%2F%3F%23%25");
  await assert.rejects(client.request("PATCH /v1/sources/{id}", {
    path: { id: 9007199254740993n }, body: {},
  }), typed("authorization", 403));
  assert.equal(fake.calls[1].url, "/v1/sources/9007199254740993");
  const cursor = "token+/=?& #é";
  await client.request("GET /v1/transactions", { query: { country: "DE", limit: 1, cursor } });
  const query = new URL(fake.calls[2].url, "https://example.invalid").searchParams;
  assert.equal(query.get("cursor"), cursor);
  assert.equal(query.get("limit"), "1");
});

test("rejects unsafe origins, paths and attempts to override credential and routing headers", async () => {
  let calls = 0;
  const fetch = () => { calls++; throw new Error(); };
  for (const baseUrl of [
    "http://api.vat-engine.app", "http://localhost", "http://127.1", "http://127.0.0.2",
    "https://user:secret@example.invalid", "https://@example.invalid", "https://example.invalid?",
    "https://example.invalid#", "https://example.invalid/a/../b", "https://example.invalid/%2e/",
    "https://example.invalid\\@example.invalid/", "//example.invalid", "file:///tmp",
  ]) {
    assert.throws(() => createHttpTransport({ baseUrl, allowInsecureLoopback: true, fetch }), typed("invalid_request"));
  }
  assert.throws(() => createHttpTransport({ baseUrl: "http://127.0.0.1", fetch }), typed("invalid_request"));
  assert.throws(() => createHttpTransport({ apiKey: "bad\r\nfixture", fetch }), typed("invalid_request"));
  const client = createHttpTransport({ fetch });
  await assert.rejects(client.request("GET https://example.invalid"), typed("invalid_request"));
  for (const id of ["", ".", "..", "../sibling", "dir\\path", "\u0000"]) {
    await assert.rejects(client.request("GET /v1/tax-classes/{id}", { path: { id } }), typed("invalid_request"));
  }
  for (const name of ["Host", "Cookie", "X-API-Key", "Authorization", "Content-Length"]) {
    await assert.rejects(client.request("GET /health", { headers: { [name]: "fixture" } }), typed("invalid_request"));
  }
  const op = "POST /v1/vat/calculate";
  await assert.rejects(client.request(op, { body: {}, headers: { "X-Source-ID": "one", "x-source-id": "two" } }),
    typed("invalid_request"));
  await assert.rejects(client.request(op, { body: {}, headers: { "X-Source-ID": "one\r\nx-fixture: two" } }),
    typed("invalid_request"));
  await assert.rejects(client.request("PATCH /v1/sources/{id}", { path: { id: Number.MAX_SAFE_INTEGER + 1 }, body: {} }),
    typed("invalid_request"));
  await assert.rejects(client.request("GET /v1/tax-classes/{id}"), typed("invalid_request"));
  await assert.rejects(client.request(op), typed("invalid_request"));
  assert.equal(calls, 0);
});

test("blocks same-origin redirects and cross-origin forwarding of API keys and request bodies", async (t) => {
  const target = capture((_call, res) => send(res, 200, "{}"));
  const other = await local(t, target.handler);
  const source = capture((_call, res) => {
    const redirects = [
      [307, other.baseUrl + "/sink?claim_token=fixture-secret"],
      [308, other.baseUrl + "/sink"],
      [302, "/sink"],
    ];
    const [status, location] = redirects[source.calls.length - 1];
    send(res, status, "ignored", { Location: location });
  });
  const client = createHttpTransport({ ...await local(t, source.handler), apiKey: exampleKey });
  for (const status of [307, 308, 302]) {
    await assert.rejects(client.request("POST /v1/supplies", { body: { ...supplyBody(), example: "fixture-sensitive" } }), (error) => {
      typed("redirect", status)(error);
      assert.deepEqual(error.getResponseMetadata(), { status });
      return true;
    });
  }
  assert.equal(source.calls.length, 3);
  assert.equal(source.calls[0].headers["x-api-key"], exampleKey);
  assert.equal(target.calls.length, 0);
});

test("native Fetch rejects an untrusted TLS certificate without sending an HTTP request", async (t) => {
  const dir = mkdtempSync(join(tmpdir(), "vat-transport-tls-"));
  t.after(() => rmSync(dir, { force: true, recursive: true }));
  execFileSync("openssl", ["req", "-x509", "-newkey", "rsa:2048", "-nodes", "-days", "1", "-subj", "/CN=127.0.0.1",
    "-addext", "subjectAltName=IP:127.0.0.1", "-keyout", join(dir, "key.pem"), "-out", join(dir, "cert.pem")],
  { stdio: "ignore" });
  let handled = false;
  const server = createTlsServer({
    key: readFileSync(join(dir, "key.pem")), cert: readFileSync(join(dir, "cert.pem")),
  }, (_req, res) => { handled = true; send(res, 200, "{}"); });
  const port = await listen(t, server);
  const client = createHttpTransport({ baseUrl: `https://127.0.0.1:${port}` });
  await assert.rejects(client.request("GET /health"), typed("network"));
  assert.equal(handled, false);
});

test("reads structured metadata and error fields without putting server data into diagnostics", async (t) => {
  const secret = "fixture-credential-and-financial-data";
  const example = fixture("calculate-rate-limit");
  const response = example.exchanges[0].response;
  const server = await local(t, (_req, res) => send(res, 429,
    JSON.stringify({ error: "rate_limit_exceeded", detail: secret, ignored: secret }), {
      "Content-Type": json,
      ...response.headers,
      "X-RateLimit-Remaining": "0",
      "X-Fixture-Sensitive": secret,
      "Set-Cookie": secret,
    }));
  const client = createHttpTransport({ ...server, apiKey: secret });
  await assert.rejects(client.request(example.operation, { body: {} }), (error) => {
    typed("rate_limit", 429)(error);
    const metadata = error.getResponseMetadata();
    assert.equal(metadata.requestId, "fixture-request");
    assert.equal(metadata.retryAfterSeconds, 15);
    assert.deepEqual(metadata.rateLimit, { "x-ratelimit-remaining": 0 });
    assert.deepEqual(error.getServerError(), { code: "rate_limit_exceeded", detail: secret });
    assert.equal(error.cause, undefined);
    for (const view of [String(error), error.stack, JSON.stringify(error), inspect(error, { showHidden: true, getters: true })]) {
      assert.equal(view.includes(secret), false);
    }
    assert.equal(JSON.stringify(metadata).includes(secret), false);
    return true;
  });
});

test("treats a 202 Location as response metadata and does not request it", async (t) => {
  const target = capture((_call, res) => send(res, 200, "{}"));
  const other = await local(t, target.handler);
  const { operation, exchanges: [{ request, response }] } = fixture("agent-registration");
  const location = other.baseUrl + "/approval";
  const config = await local(t, (_req, res) => replyFixture({
    ...response, headers: { ...response.headers, Location: location },
  }, res));
  const result = await createHttpTransport(config).request(operation, { body: JSON.parse(request.body) });
  assert.equal(result.metadata.status, 202);
  assert.equal(result.metadata.location, location);
  assert.equal(target.calls.length, 0);
});

for (const id of ["filing-sandbox-lock", "filing-sandbox-file"]) {
  test(`deployed incomplete envelope: ${id}`, async (t) => {
    const { operation, exchanges: [{ request, response }] } = fixture(id);
    const client = createHttpTransport(await local(t, (_req, res) => replyFixture(response, res)));
    await assert.rejects(client.request(operation, { query: request.query }), (error) => {
      typed("authorization", 403)(error);
      assert.deepEqual(error.getServerError(), { code: "sandbox_filing_unavailable" });
      return true;
    });
  });
}

test("handles undocumented, malformed and non-JSON errors without exposing raw bodies", async (t) => {
  const cases = [
    [502, "text/html", "<html>fixture-private</html>", "server", undefined],
    [418, json, '{"error":"future_error","detail":"explicit information"}', "http", { code: "future_error", detail: "explicit information" }],
    [401, json, '{"error":', "authentication", undefined],
    [404, json, '{"detail":"Missing"}', "not_found", { detail: "Missing" }],
    [409, json, '{"error":[]}', "conflict", undefined],
    [503, json, '{"detail":"' + "x".repeat(70 * 1024) + '"}', "server", undefined],
  ];
  let step = 0;
  const client = createHttpTransport(await local(t, (_req, res) => {
    const [status, media, body] = cases[step++];
    send(res, status, body, { "Content-Type": media });
  }));
  for (const [status, , , kind, fields] of cases) {
    await assert.rejects(client.request("GET /health"), (error) => {
      typed(kind, status)(error);
      assert.deepEqual(error.getServerError(), fields);
      assert.doesNotMatch(JSON.stringify(error) + error.stack, /fixture-private|explicit information/);
      return true;
    });
  }
});

test("reads real attachment bytes by operation status and media and checks their digests", async (t) => {
  const attachments = [fixture("json-archive-bytes"), fixture("csv-export-bytes")];
  let step = 0;
  const client = createHttpTransport(await local(t, (_req, res) => replyFixture(attachments[step++].exchanges[0].response, res)));
  for (const { operation, exchanges: [{ request, response }] } of attachments) {
    const result = await client.request(operation, { path: request.path, query: request.query });
    assert.equal(result.kind, "bytes");
    assert.equal(createHash("sha256").update(result.data).digest("hex"), response.sha256);
    assert.equal(result.metadata.contentDisposition, response.headers["Content-Disposition"]);
    assert.equal(result.metadata.contentType, response.media);
  }
});

test("keeps report JSON structured even when Content-Disposition suggests a download", async () => {
  const fake = createHttpTransport({
    fetch: async () => new Response('{"manifest":{"export_version":1}}', {
      status: 200, headers: { "Content-Type": "Application/JSON; charset=UTF-8", "Content-Disposition": "attachment; filename=report.json" },
    }),
  });
  const result = await fake.request("GET /v1/reports/oss-quarterly-summary/export", {
    query: { period: "2026-Q1", format: "json" },
  });
  assert.equal(result.kind, "json");
  assert.equal(result.data.manifest.export_version, 1);
});

test("validates success status, media, UTF-8 and JSON", async (t) => {
  const cases = [
    [201, json, "{}", "malformed_response"],
    [200, "text/html", "{}", "malformed_response"],
    [200, json, "{", "malformed_response"],
    [200, json, Buffer.from([0xff]), "malformed_response"],
    [200, json, "null", "malformed_response"],
    [200, json, "x".repeat(257), "response_too_large"],
  ];
  let step = 0;
  const client = createHttpTransport({
    ...await local(t, (_req, res) => {
      const [status, media, body] = cases[step++];
      send(res, status, body, { "Content-Type": media });
    }),
    maxResponseBytes: 256,
  });
  for (const [status, , , kind] of cases) {
    await assert.rejects(client.request("GET /health"), typed(kind, status));
  }
});

test("bounds bytes after HTTP content decompression and reports the original status", async (t) => {
  const body = gzipSync('{"status":"' + "a".repeat(4096) + '"}');
  assert(body.length < 128);
  const client = createHttpTransport({
    ...await local(t, (_req, res) => send(res, 200, body, {
      "Content-Type": json, "Content-Encoding": "gzip", "Content-Length": body.length,
    })),
    maxResponseBytes: 128,
  });
  await assert.rejects(client.request("GET /health"), (error) => {
    typed("response_too_large", 200)(error);
    assert.equal(error.getResponseMetadata().contentLength, body.length);
    return true;
  });
});

test("request timeout and total deadline cover headers and stalled bodies", async (t) => {
  const config = await local(t, (req, res) => {
    if (req.url === "/v1/auth/context") return;
    res.writeHead(200, { "Content-Type": json, "X-Request-ID": "stalled-body" });
    res.write("{");
  });
  const client = createHttpTransport({ ...config, timeoutMs: 140, deadlineMs: 2_000 });
  await assert.rejects(client.request("GET /v1/auth/context"), typed("timeout"));
  await assert.rejects(client.request("GET /health", { deadlineMs: 220, timeoutMs: 2_000 }), (error) => {
    typed("deadline", 200)(error);
    assert.equal(error.getResponseMetadata().requestId, "stalled-body");
    return true;
  });
});

test("cancellation before send and during body read releases the stream without logging the reason", async (t) => {
  const before = new AbortController();
  before.abort("fixture-secret");
  const requested = Promise.withResolvers();
  const closed = Promise.withResolvers();
  let calls = 0;
  const config = await local(t, (_req, res) => {
    calls++;
    res.on("close", closed.resolve);
    res.writeHead(200, { "Content-Type": json });
    res.write("{", requested.resolve);
  });
  const client = createHttpTransport(config);
  await assert.rejects(client.request("GET /health", { signal: before.signal }), typed("aborted"));
  assert.equal(calls, 0);
  const during = new AbortController();
  during.signal.addEventListener("abort", (event) => event.stopImmediatePropagation());
  const pending = client.request("GET /health", { signal: during.signal });
  await requested.promise;
  during.abort(new Error("fixture-secret"));
  await assert.rejects(pending, (error) => {
    typed("aborted")(error);
    assert.doesNotMatch(error.stack, /fixture-secret/);
    return true;
  });
  await closed.promise;
  assert.equal(calls, 1);
});

test("timeout rejects an injected Fetch that ignores cancellation and disposes a late response", async () => {
  const late = Promise.withResolvers();
  const discarded = Promise.withResolvers();
  const config = createHttpTransport({ deadlineMs: 120, fetch: () => late.promise });
  await assert.rejects(config.request("GET /health"), typed("deadline"));
  late.resolve(new Response(new ReadableStream({ cancel: discarded.resolve }), { headers: { "Content-Type": json } }));
  await discarded.promise;
});

test("clears the timer and cancellation forwarding after successful response consumption", async () => {
  let transportSignal;
  const caller = new AbortController();
  const client = createHttpTransport({
    timeoutMs: 100,
    fetch: async (_url, init) => {
      transportSignal = init.signal;
      return new Response('{"status":"ok"}', { headers: { "Content-Type": json } });
    },
  });
  await client.request("GET /health", { signal: caller.signal });
  caller.abort();
  await delay(120);
  assert.equal(transportSignal.aborted, false);
});

test("network loss and raw Fetch causes are sanitized without replay", async (t) => {
  let calls = 0;
  const client = createHttpTransport(await local(t, (req) => {
    calls++;
    req.socket.destroy();
  }));
  await assert.rejects(client.request("POST /v1/supplies", { body: supplyBody() }), typed("network"));
  assert.equal(calls, 1);
  const boom = createHttpTransport({ fetch: async () => { throw new Error("fixture-sensitive-url"); } });
  await assert.rejects(boom.request("GET /health"), (error) => {
    typed("network")(error);
    assert.equal(error.cause, undefined);
    assert.doesNotMatch(error.stack, /fixture-sensitive-url/);
    return true;
  });
});

test("fails a broken response body as a network error with received metadata", async (t) => {
  const client = createHttpTransport(await local(t, (req, res) => {
    res.writeHead(200, { "Content-Type": json, "X-Request-ID": "body-reset", "Content-Length": "30" });
    res.write("{", () => {
      // Let the client receive headers before dropping the remaining body bytes.
      void delay(50).then(() => req.socket.destroy());
    });
  }));
  await assert.rejects(client.request("GET /health"), (error) => {
    typed("network", 200)(error);
    assert.equal(error.getResponseMetadata().requestId, "body-reset");
    return true;
  });
});

test("deadline includes synchronous request preparation and prevents a late dispatch", async () => {
  let calls = 0;
  const client = createHttpTransport({ fetch: async () => { calls++; throw new Error(); } });
  const body = {
    ...supplyBody(),
    get example() {
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 20);
      return true;
    },
  };
  await assert.rejects(client.request("POST /v1/supplies", { body, deadlineMs: 1 }), typed("deadline"));
  assert.equal(calls, 0);
});

test("preserves numeric and HTTP-date Retry-After and omits malformed values", async () => {
  for (const [header, evaluate] of [
    ["0", (seconds) => seconds === 0],
    [new Date(Date.now() + 120_000).toUTCString(), (seconds) => seconds > 0 && seconds <= 120],
    ["-1", (seconds) => seconds === undefined],
    ["3, 5", (seconds) => seconds === undefined],
    ["Wed, 31 Feb 2027 12:00:00 GMT", (seconds) => seconds === undefined],
  ]) {
    const client = createHttpTransport({
      fetch: async () => new Response(null, { status: 429, headers: { "Retry-After": header } }),
    });
    await assert.rejects(client.request("GET /health"), (error) => {
      assert(evaluate(error.getResponseMetadata().retryAfterSeconds));
      return true;
    });
  }
});
