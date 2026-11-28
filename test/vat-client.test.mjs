import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import { test } from "node:test";
import { setTimeout as delay } from "node:timers/promises";
import { URL } from "node:url";
import { inspect } from "node:util";
import { decodeRequestJson } from "../dist/exact-json.js";
import { createVatClient, UnknownOutcomeError, VatTransportError } from "../dist/index.js";
import { CircuitBreaker, retryDelay } from "../dist/resilience.js";

const fixtures = JSON.parse(readFileSync(new URL("../contract/fixtures/cases.json", import.meta.url), "utf8"));
const fixture = (id) => fixtures.cases.find((item) => item.id === id);
const { AbortController, Response, performance } = globalThis;
const json = "application/json";
const calc = "POST /v1/vat/calculate";
const supply = "POST /v1/supplies";
const contextPath = "/v1/auth/context";
const ctxA = "ctx_" + "a".repeat(64);
const ctxB = "ctx_" + "b".repeat(64);
const ctxC = "ctx_" + "c".repeat(64);
const keys = {
  first: "fixture-sandbox-calculation-key",
  rotated: "fixture-rotated-sandbox-key",
  operational: "fixture-operational-full-key",
  foreign: "fixture-other-account-key",
};
const fast = { baseDelayMs: 1, maxDelayMs: 2 };

async function local(t, handler) {
  const calls = [];
  const server = createServer(async (req, res) => {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const call = { method: req.method, url: req.url, headers: req.headers, body: Buffer.concat(chunks).toString(), req };
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

function send(res, status, data, headers = {}) {
  const content = typeof data === "string" ? data : JSON.stringify(data);
  res.writeHead(status, { "Content-Type": json, ...headers });
  res.end(content);
}

function identity(res, contextId = ctxA, environment = "sandbox", scopes = ["calculate-only"], headers = {}) {
  send(res, 200, { context_id: contextId, environment, scopes },
    { "Cache-Control": "no-store", "X-VAT-Environment": environment, ...headers });
}

function sendFixture(res, response) {
  send(res, response.status, response.body, response.headers);
}

function error(kind, status, serverCode) {
  return (failure) => {
    assert(failure instanceof VatTransportError);
    assert.equal(failure.kind, kind);
    if (status !== undefined) assert.equal(failure.status, status);
    if (serverCode !== undefined) assert.equal(failure.getServerError()?.code, serverCode);
    return true;
  };
}

function strict(config, environment = "sandbox", contextId = ctxA) {
  return { baseUrl: config.baseUrl, contextId, environment };
}

function calcInput() {
  const exchange = fixture("calculate-pinned-retry").exchanges[0];
  const { "X-API-Key": _key, ...headers } = exchange.request.headers;
  assert(_key);
  return { body: decodeRequestJson(calc, json, exchange.request.body), headers };
}

function supplyInput(id = "supply-replay", explicit = true) {
  const request = fixture(id).exchanges[0].request;
  const body = decodeRequestJson(supply, json, request.body);
  if (explicit) Object.assign(body.event, { supplier_establishment_country: "DE", dispatch_country: "DE" });
  return { body };
}

test("context discovery is explicit and returns the approved fixture without learning a binding", async (t) => {
  const response = fixture("auth-context-discovery").exchanges[0].response;
  const { config, calls } = await local(t, (_call, res) => sendFixture(res, response));
  const client = createVatClient({ ...config, apiKey: keys.first });
  const observed = await client.getAuthContext();
  assert.deepEqual(observed, { contextId: ctxA, environment: "sandbox", scopes: ["calculate-only"] });
  await client.getAuthContext();
  assert.equal(calls.length, 2);
  assert(calls.every((call) => call.url === contextPath && call.headers["x-vat-expected-context"] === undefined));
});

test("strict verifies every protected invocation and accepts an explicitly rotated same-context key", async (t) => {
  const { config, calls } = await local(t, (call, res) => {
    if (call.url === contextPath) return identity(res);
    return sendFixture(res, fixture("calculate-pinned-retry").exchanges[0].response);
  });
  const binding = strict(config);
  const client = createVatClient({ ...config, apiKey: keys.first, strictContext: binding });
  binding.contextId = ctxB;
  await client.request(calc, calcInput());
  client.rotateApiKey(keys.rotated);
  await client.request(calc, calcInput());
  assert.deepEqual(calls.map((call) => [call.url, call.headers["x-api-key"], call.headers["x-vat-expected-context"]]), [
    [contextPath, keys.first, undefined], ["/v1/vat/calculate", keys.first, ctxA],
    [contextPath, keys.rotated, undefined], ["/v1/vat/calculate", keys.rotated, ctxA],
  ]);
  await assert.rejects(client.request(calc, { ...calcInput(), headers: { "X-VAT-Expected-Context": ctxB } }),
    error("invalid_request"));
  assert.equal(calls.length, 4);
});

test("strict preflight denies substituted accounts, environments, scopes and unverifiable rotations before any mutation", async (t) => {
  const scenarios = [
    [ctxA, "production", ["full"], {}, "context_mismatch"],
    [ctxB, "sandbox", ["calculate-only"], {}, "context_mismatch"],
    [ctxB, "production", ["full"], {}, "context_mismatch"],
    [ctxA, "sandbox", ["read-only"], {}, "context_scope"],
    [ctxA, "sandbox", ["calculate-only"], { "Cache-Control": "public" }, "context_unverified"],
    [ctxA, "sandbox", ["calculate-only"], { "X-VAT-Environment": "production" }, "context_mismatch"],
    [ctxA, "sandbox", [], {}, "context_unverified"],
  ];
  let index = 0;
  const { config, calls } = await local(t, (_call, res) => {
    const [id, env, scopes, headers] = scenarios[index++];
    identity(res, id, env, scopes, headers);
  });
  const client = createVatClient({ ...config, apiKey: keys.first, strictContext: strict(config) });
  for (const [,,,, expected] of scenarios) {
    client.rotateApiKey(`candidate-${index}`);
    await assert.rejects(client.request(calc, calcInput()), error(expected));
  }
  assert.throws(() => createVatClient({ ...config, strictContext: { ...strict(config), baseUrl: config.baseUrl + "/other" } }),
    error("context_mismatch"));
  const missing = createVatClient({ ...config, strictContext: strict(config) });
  await assert.rejects(missing.request(calc, calcInput()), error("context_unverified"));
  assert.equal(calls.length, scenarios.length);
  assert(calls.every((call) => call.url === contextPath));
});

test("strict preflight enforces the catalog environment and recognizes the four documented scopes", async (t) => {
  let scopes = ["full"];
  const { config, calls } = await local(t, (call, res) => {
    if (call.url === contextPath) return identity(res, ctxA, "sandbox", scopes);
    return send(res, 200, "{}");
  });
  const client = createVatClient({ ...config, apiKey: keys.first, strictContext: strict(config) });
  await assert.rejects(client.request(supply, supplyInput()), error("context_environment"));
  scopes = ["calculate-only"];
  await assert.rejects(client.request(supply, supplyInput()), error("context_scope"));
  for (const scope of ["full", "read-only", "classification-resolve"]) {
    scopes = [scope];
    await client.request("POST /v1/information/tax-class/resolve", { body: {} });
  }
  assert.equal(calls.filter((call) => call.url === "/v1/supplies").length, 0);
  const requests = calls.filter((call) => call.url === "/v1/information/tax-class/resolve");
  assert.equal(requests.length, 3);
  assert(requests.every((call) => call.headers["x-vat-expected-context"] === ctxA));
});

test("strict binding rejects a different production account even when the environment and scope match", async (t) => {
  const { config, calls } = await local(t, (_call, res) => identity(res, ctxC, "production", ["full"]));
  const client = createVatClient({ ...config, apiKey: keys.foreign, strictContext: strict(config, "production", ctxB) });
  await assert.rejects(client.request(supply, supplyInput()), error("context_mismatch"));
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, contextPath);
});

test("unavailable credentials never permit strict dispatch and preflight shares the original deadline", async (t) => {
  const { config, calls } = await local(t, (call, res) => {
    if (call.headers["x-api-key"] === keys.rotated) return send(res, 401, { error: "invalid_api_key" });
    // Hold the initial preflight until the SDK deadline.
  });
  const client = createVatClient({ ...config, apiKey: keys.first, strictContext: strict(config) });
  await assert.rejects(client.request(calc, { ...calcInput(), deadlineMs: 120, timeoutMs: 2_000 }), error("deadline"));
  client.rotateApiKey(keys.rotated);
  await assert.rejects(client.request(calc, calcInput()), error("context_unverified", 401));
  assert.equal(calls.length, 2);
  assert(calls.every((call) => call.url === contextPath));
});

test("server assertion rejects a change after local verification and is distinguishable from client preflight", async (t) => {
  const scenario = fixture("supply-denial-foreign").exchanges[0].response;
  let stored = 0;
  let jobs = 0;
  const { config, calls } = await local(t, (call, res) => {
    if (call.url === contextPath) return identity(res, ctxA, "production", ["full"]);
    const afterVerification = ctxB;
    if (call.headers["x-vat-expected-context"] !== afterVerification) return sendFixture(res, scenario);
    stored++;
    jobs++;
    return send(res, 201, {});
  });
  const client = createVatClient({ ...config, apiKey: keys.operational, strictContext: strict(config, "production") });
  await assert.rejects(client.request(supply, supplyInput()), error("authorization", 403, "auth_context_mismatch"));
  assert.equal(calls.length, 2);
  assert.equal(calls[1].headers["x-vat-expected-context"], ctxA);
  assert.equal(stored, 0);
  assert.equal(jobs, 0);
});

test("ordinary mode preserves contract authentication, assertion, scope and environment precedence", async (t) => {
  const codes = [
    ["supply-denial-malformed", "invalid_expected_context", "validation", 400],
    ["supply-denial-foreign", "auth_context_mismatch", "authorization", 403],
    ["supply-denial-scope", "insufficient_scope", "authorization", 403],
    ["supply-denial-sandbox", "operational_key_required", "authorization", 403],
  ];
  let stored = 0;
  let jobs = 0;
  const { config, calls } = await local(t, (call, res) => {
    const key = call.headers["x-api-key"];
    const assertion = call.headers["x-vat-expected-context"];
    if (!key || key === "revoked-fixture") return send(res, 401, { error: "invalid_api_key" });
    if (assertion === "bad") return sendFixture(res, fixture(codes[0][0]).exchanges[0].response);
    if (assertion !== ctxA) return sendFixture(res, fixture(codes[1][0]).exchanges[0].response);
    if (key === "read-only-fixture") return sendFixture(res, fixture(codes[2][0]).exchanges[0].response);
    if (key === "sandbox-full-fixture") return sendFixture(res, fixture(codes[3][0]).exchanges[0].response);
    stored++;
    jobs++;
    return send(res, 201, {});
  });
  const client = createVatClient({ ...config, apiKey: "read-only-fixture" });
  const ids = ["bad", ctxB, ctxA, ctxA];
  for (const [step, [, code, kind, status]] of codes.entries()) {
    if (step === 3) client.rotateApiKey("sandbox-full-fixture");
    await assert.rejects(client.request(supply, {
      ...supplyInput(), headers: { "X-VAT-Expected-Context": ids[step] },
    }), error(kind, status, code));
  }
  client.rotateApiKey("revoked-fixture");
  await assert.rejects(client.request(supply, {
    ...supplyInput(), headers: { "X-VAT-Expected-Context": ctxB },
  }), error("authentication", 401, "invalid_api_key"));
  assert.equal(calls.length, 5);
  assert.equal(stored, 0);
  assert.equal(jobs, 0);
});

test("an unexpected environment after dispatch leaves outcome unknown and blocks subsequent writes", async (t) => {
  let status = 200;
  const { config, calls } = await local(t, (call, res) => {
    if (call.url === contextPath) return identity(res);
    send(res, status, "{}", { "X-VAT-Environment": "production" });
  });
  const client = createVatClient({ ...config, apiKey: keys.first, strictContext: strict(config) });
  await assert.rejects(client.request(calc, calcInput()), (failure) => {
    assert(failure instanceof UnknownOutcomeError);
    assert.equal(failure.failureKind, "context_mismatch");
    return error("unknown_outcome", 200)(failure);
  });
  await assert.rejects(client.request(calc, calcInput()), error("context_mismatch"));
  assert.equal(calls.length, 2);
  status = 503;
  const another = createVatClient({ ...config, apiKey: keys.first, strictContext: strict(config), retry: fast });
  await assert.rejects(another.request(calc, calcInput()), (failure) => {
    assert(failure instanceof UnknownOutcomeError);
    assert.equal(failure.failureKind, "context_mismatch");
    return error("unknown_outcome", 503)(failure);
  });
  await assert.rejects(another.request(calc, calcInput()), error("context_mismatch"));
  assert.equal(calls.length, 4);
});

test("calculation replay recovers lost commit with frozen credentials, input bytes and source attribution", async (t) => {
  const old = fixture("calculate-pinned-retry").exchanges[0];
  const input = calcInput();
  let client;
  let config;
  let writes = 0;
  const other = await local(t, (_call, res) => send(res, 200, "{}"));
  const server = await local(t, (call, res) => {
    if (writes === 0) {
      writes++;
      client.rotateApiKey(keys.foreign);
      config.baseUrl = other.config.baseUrl;
      input.body.gross_amount_minor = 0n;
      input.headers["X-Source-ID"] = "different-source";
      input.headers["Idempotency-Key"] = "different-key";
      call.req.socket.destroy();
      return;
    }
    return sendFixture(res, old.response);
  });
  config = { ...server.config, apiKey: keys.first, retry: fast };
  client = createVatClient(config);
  const result = await client.request(calc, input);
  assert.equal(result.data.calculation_id, JSON.parse(old.response.body).calculation_id);
  assert.equal(writes, 1);
  assert.equal(server.calls.length, 2);
  assert.equal(other.calls.length, 0);
  for (const call of server.calls) {
    assert.equal(call.headers["x-api-key"], keys.first);
    assert.equal(call.headers["x-source-id"], "fixture-source");
    assert.equal(call.headers["idempotency-key"], "fixture-only-retry-id");
    assert.equal(call.body, old.request.body);
  }
  await client.request(calc, calcInput());
  assert.equal(server.calls[2].headers["x-api-key"], keys.foreign);
});

for (const id of ["supply-replay", "signed-int64-boundaries"]) {
  test(`conditional supply replay retains exact revision, signed amounts and original receipt: ${id}`, async (t) => {
    const specimen = fixture(id).exchanges[0];
    const receipt = JSON.parse(specimen.response.body);
    let recorded;
    const { config, calls } = await local(t, (call, res) => {
      if (recorded === undefined) {
        recorded = call.body;
        call.req.socket.destroy();
      } else {
        send(res, 200, { ...receipt, result: "duplicate" });
      }
    });
    const client = createVatClient({ ...config, apiKey: keys.operational, retry: fast });
    const result = await client.request(supply, supplyInput(id));
    assert.equal(result.data.result, "duplicate");
    assert.equal(result.data.id, receipt.id);
    assert.equal(result.data.event_version, receipt.event_version);
    assert.equal(calls.length, 2);
    assert.equal(calls[1].body, recorded);
    assert.match(recorded, new RegExp('"event_version":' + receipt.event_version));
    if (id === "signed-int64-boundaries") {
      assert.match(recorded, /"taxable_amount_minor":-9223372036854775808/);
      assert.match(recorded, /"original_supply_event_id":"/);
    }
  });
}

test("mutations without sufficient replay identity return an explicit unknown outcome after a lost response", async (t) => {
  const { config, calls } = await local(t, (call) => call.req.socket.destroy());
  const client = createVatClient({ ...config, apiKey: keys.operational, retry: fast, circuit: { failureThreshold: 30 } });
  const noDate = calcInput();
  delete noDate.body.transaction_date;
  const noKey = calcInput();
  delete noKey.headers["Idempotency-Key"];
  const invalidDate = calcInput();
  invalidDate.body.transaction_date = "2026-02-30";
  const correction = supplyInput("signed-int64-boundaries");
  delete correction.body.original_supply_event_id;
  const invocations = [
    [calc, noDate], [calc, noKey], [calc, invalidDate], [supply, correction],
    [supply, supplyInput("supply-replay", false)], ["POST /agent/auth", { body: {} }],
    ["PATCH /v1/sources/{id}", { path: { id: 1n }, body: {} }],
  ];
  for (const [operation, options] of invocations) {
    await assert.rejects(client.request(operation, options), (failure) => {
      assert(failure instanceof UnknownOutcomeError);
      assert.equal(failure.failureKind, "network");
      return error("unknown_outcome")(failure);
    });
  }
  assert.equal(calls.length, invocations.length);
});

test("an earlier ambiguous mutation remains unknown if the later replay is denied", async (t) => {
  const { config, calls } = await local(t, (call, res) => {
    if (call === calls[0]) return call.req.socket.destroy();
    return send(res, 403, { error: "insufficient_scope", detail: keys.first });
  });
  const client = createVatClient({ ...config, apiKey: keys.first, retry: fast });
  await assert.rejects(client.request(calc, calcInput()), (failure) => {
    assert(failure instanceof UnknownOutcomeError);
    assert.equal(failure.failureKind, "authorization");
    assert.doesNotMatch(inspect(failure, { showHidden: true, getters: true }) + JSON.stringify(failure), /fixture-sandbox/);
    return error("unknown_outcome", 403)(failure);
  });
  assert.equal(calls.length, 2);
});

test("Retry-After applies inside one deadline and is never shortened to fit", async (t) => {
  const dispatch = [];
  const { config, calls } = await local(t, (_call, res) => {
    dispatch.push(performance.now());
    if (dispatch.length <= 1) return send(res, 429, "{\"error\":\"rate_limit_exceeded\"}", { "Retry-After": "1" });
    if (dispatch.length === 3) return send(res, 429, "{}", { "Retry-After": "10" });
    return send(res, 200, '{"status":"ok"}');
  });
  const client = createVatClient({ ...config, retry: fast });
  await client.request("GET /health", { deadlineMs: 3_000 });
  assert(dispatch[1] - dispatch[0] >= 950);
  await assert.rejects(client.request("GET /health", { deadlineMs: 400 }), (failure) => {
    error("rate_limit", 429)(failure);
    assert.equal(failure.getResponseMetadata().retryAfterSeconds, 10);
    return true;
  });
  assert.equal(calls.length, 3);
});

test("read-only POST can retry, permanent failures and claim polling stay single-attempt", async (t) => {
  const { config, calls } = await local(t, (call, res) => {
    const number = calls.filter(({ url }) => url === call.url).length;
    if (call.url === "/v1/vat/sme-eligibility") return send(res, number === 1 ? 503 : 200, {});
    if (call.url === "/agent/auth/claim") return sendFixture(res, fixture("agent-claim").exchanges[0].response);
    return send(res, call.url === "/ready" ? 500 : 401, {});
  });
  const client = createVatClient({ ...config, apiKey: keys.first, retry: fast });
  await client.request("POST /v1/vat/sme-eligibility", { body: {} });
  assert.equal(calls.length, 2);
  await assert.rejects(client.request("POST /agent/auth/claim", {
    body: JSON.parse(fixture("agent-claim").exchanges[0].request.body),
  }), error("conflict", 409, "authorization_pending"));
  await assert.rejects(client.request("GET /ready"), error("server", 500));
  await assert.rejects(client.request("GET /v1/auth/context"), error("authentication", 401));
  assert.equal(calls.length, 5);
  assert.equal(calls[2].headers["x-api-key"], undefined);
});

test("a timeout reading a known authorization rejection does not permit replay", async (t) => {
  const { config, calls } = await local(t, (_call, res) => {
    res.writeHead(403, { "Content-Type": json });
    res.write("{");
  });
  const client = createVatClient({ ...config, apiKey: keys.first, retry: fast });
  await assert.rejects(client.request(calc, { ...calcInput(), timeoutMs: 160 }), error("timeout", 403));
  assert.equal(calls.length, 1);
});

test("cancellation and local key revocation stop ambiguous retries and redact abort reasons", async (t) => {
  const first = Promise.withResolvers();
  const { config, calls } = await local(t, (call) => {
    first.resolve();
    call.req.socket.destroy();
  });
  const client = createVatClient({ ...config, apiKey: keys.first, retry: { baseDelayMs: 20_000 } });
  const controller = new AbortController();
  const pending = client.request(calc, { ...calcInput(), signal: controller.signal });
  await first.promise;
  client.revokeApiKey();
  controller.abort("private abort reason");
  await assert.rejects(pending, (failure) => {
    assert(failure instanceof UnknownOutcomeError);
    assert.doesNotMatch(String(failure) + inspect(failure) + failure.stack, /private abort reason|fixture-sandbox/);
    return true;
  });
  assert.equal(calls.length, 1);
});

test("retry budget is shared with earlier attempt time and refuses a late retry", async () => {
  let seen = 0;
  const client = createVatClient({
    retry: fast,
    async fetch() {
      seen++;
      await delay(110);
      return new Response('{"error":"quota"}', { status: 429, headers: { "Retry-After": "1", "Content-Type": json } });
    },
  });
  await assert.rejects(client.request("GET /health", { timeoutMs: 2_000, deadlineMs: 1_060 }), error("rate_limit", 429));
  assert.equal(seen, 1);
});

test("a long caller deadline does not extend the mutation replay window", { timeout: 1_000 }, async () => {
  let seen = 0;
  const client = createVatClient({
    apiKey: keys.first,
    async fetch() {
      seen++;
      return new Response("{}", { status: 503, headers: { "Retry-After": "60", "Content-Type": json } });
    },
  });
  await assert.rejects(client.request(calc, { ...calcInput(), deadlineMs: 300_000 }), error("unknown_outcome", 503));
  assert.equal(seen, 1);
});

test("circuit opens after infra failures, admits one recovery probe and isolates rotated keys and anonymous reads", async (t) => {
  const probeArrived = Promise.withResolvers();
  let probe;
  let failures = 0;
  const { config, calls } = await local(t, (call, res) => {
    if (call.headers["x-api-key"] === keys.first) {
      if (failures++ < 2) return send(res, 503, {});
      probe = res;
      probeArrived.resolve();
      return;
    }
    return send(res, 200, {});
  });
  const client = createVatClient({
    ...config, apiKey: keys.first, circuit: { failureThreshold: 2, cooldownMs: 130 }, retry: false,
  });
  const read = "GET /v1/transactions";
  await assert.rejects(client.request(read), error("server", 503));
  await assert.rejects(client.request(read), error("server", 503));
  client.rotateApiKey(keys.first);
  await assert.rejects(client.request(read), error("circuit_open"));
  await client.request("GET /health");
  assert.equal(calls.length, 3);
  await delay(150);
  const recovery = client.request(read);
  await probeArrived.promise;
  await assert.rejects(client.request(read), error("circuit_open"));
  client.rotateApiKey(keys.rotated);
  await client.request(read);
  send(probe, 200, {});
  await recovery;
  assert.equal(calls.length, 5);
});

test("429 and business conflicts neither open a circuit nor leak across credentials", async (t) => {
  const { config, calls } = await local(t, (call, res) => {
    if (call.headers["x-api-key"] === keys.first) return send(res, calls.length % 2 ? 429 : 409, {});
    return send(res, 200, {});
  });
  const client = createVatClient({
    ...config, apiKey: keys.first, retry: false, circuit: { failureThreshold: 1 },
  });
  for (const status of [429, 409, 429, 409]) {
    await assert.rejects(client.request(calc, calcInput()), error(status === 429 ? "rate_limit" : "conflict", status));
  }
  client.rotateApiKey(keys.foreign);
  await client.request(calc, calcInput());
  assert.equal(calls.length, 5);
});

test("failed probes reopen the circuit and successful probes close it after a simulated extended outage", (t) => {
  let now = 0;
  t.mock.method(performance, "now", () => now);
  const circuit = new CircuitBreaker(1, 30_000);
  circuit.finish(circuit.acquire(), "failure");
  for (let elapsed = 0; elapsed < 600_000; elapsed += 30_000) {
    assert.throws(() => circuit.acquire(), error("circuit_open"));
    now += 30_000;
    const probe = circuit.acquire();
    assert.equal(probe.kind, "half-open");
    assert.throws(() => circuit.acquire(), error("circuit_open"));
    circuit.finish(probe, "failure");
  }
  now += 30_000;
  circuit.finish(circuit.acquire(), "healthy");
  assert.equal(circuit.acquire().kind, "closed");
});

test("jitter is bounded exponentially and Retry-After can exceed its cap without exceeding the invocation budget", (t) => {
  t.mock.method(Math, "random", () => 0.9999);
  const options = { maxAttempts: 3, baseDelayMs: 10, maxDelayMs: 15 };
  assert.equal(retryDelay(options, 1, new VatTransportError("server")), 10);
  assert.equal(retryDelay(options, 2, new VatTransportError("server")), 15);
  assert.equal(retryDelay(options, 2, new VatTransportError("rate_limit", { status: 429, retryAfterSeconds: 1 })), 1000);
});
