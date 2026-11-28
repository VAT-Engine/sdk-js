# Official VAT Engine SDK for TypeScript and JavaScript. Integrate EU VAT calculations, reporting, and compliance workflows into server-side applications.

The SDK is in development. The [implementation plan](MD/IMPLEMENTATION_PLAN.md) records milestone status and release criteria. The [contract directory](contract/README.md) contains the pinned public OpenAPI and development requirements.

## Package foundation

The local package exposes `toInt64(value)`, which returns a `bigint` from a signed 64-bit `bigint` or safe integer `number`. Pass larger inputs as `bigint` literals to retain every digit. Node.js 22.13+, 24.x and 26.x support the same entry point with either `import` or `require()`.

## HTTP transport

```js
import { createHttpTransport } from "@vat-engine/sdk";

const transport = createHttpTransport();
const health = await transport.request("GET /health");
```

The transport accepts exact method and path templates from the pinned CORE contract. It defaults to `https://api.vat-engine.app` and accepts an explicitly configured HTTPS deployment, including a base path. For local HTTP tests, pass `allowInsecureLoopback: true` and use `127.0.0.1` or `[::1]`. Use server-side configuration for `apiKey`. It is attached only to operations that declare API-key authentication. The transport makes one Fetch invocation per request and blocks HTTP redirects.

`timeoutMs` covers the Fetch invocation through the response body. `deadlineMs` covers the whole call, including request preparation. Both default to 30 seconds, and a request may pass an `AbortSignal`. The response is buffered up to `maxResponseBytes`, which defaults to 16 MiB after HTTP decompression. Binary and CSV artifacts return a `Uint8Array` in the `bytes` result. Treat server-provided filenames as data and choose the local destination yourself.

`VatTransportError` exposes a stable `kind` and the received HTTP status when available. Call `getServerError()` or `getResponseMetadata()` when the application needs the server-provided fields. These fields may contain sensitive information. The error message, stack, inspection and JSON serialization omit them. An injected Fetch implementation must honor manual redirects and maintain TLS verification.

## Context protection and retries

Use `createVatClient()` for the context-aware client. `getAuthContext()` explicitly reads the authenticated context. Ordinary mode leaves scope, environment and assertion decisions to the API. A valid key for an unintended account can still authorize writes in ordinary mode.

To opt in to strict context protection, supply `strictContext: { baseUrl, contextId, environment }` from independent, trusted enrollment. The binding includes the exact deployment base path. Supply the candidate API key separately. The SDK checks the candidate with the context endpoint before each protected dispatch, compares its context, environment and scope, then sends the trusted assertion with the operation. A failed preflight sends zero business requests. The separate assertion is evaluated by the API when it receives a request. Strict behavior and assertion precedence have local evidence only. Authenticated hosted acceptance is required before claiming hosted readiness.

`rotateApiKey()` selects a candidate for subsequent calls. Strict mode verifies that candidate before protected use. In-flight calls keep their original key, destination, semantic headers and exact body bytes. `revokeApiKey()` cancels active local use of current and previous keys and clears the current key. Server-side revocation is a separate action.

The client makes up to three attempts within one overall deadline. It retries only reviewed read operations and conditionally replayable writes on network failures, attempt timeouts, or HTTP 408, 429, 502, 503 and 504. Backoff uses exponential jitter with a 100 ms initial ceiling and 2 s cap by default. A valid `Retry-After` is honored when it fits the remaining deadline and any applicable replay window. A mutation cannot start a retry more than 30 seconds into the invocation. This client limit is independent of the API's retention policy. Pass `retry: false` for a single business attempt.

- VAT calculation replay requires an explicit transaction date and valid idempotency key. The original source attribution, including omission, and exact request body stay fixed.
- Supply replay requires fixed identity, revision and original-sale binding for corrections. Both supplier establishment and dispatch must be explicit so Source Profile defaults cannot change an uncommitted submission on replay.
- Registration, claim and other mutations have a single automatic attempt. Review the original request if `UnknownOutcomeError` is returned. The previous attempt may have been processed.

The circuit breaker opens after five failed logical calls by default. After a 30-second cooldown it admits one recovery call at a time. Breaker state is isolated to the client destination and credential generation. Rate limits and business errors do not count as infrastructure failures.

## CORE methods

```js
import { createVatClient } from "@vat-engine/sdk";

const client = createVatClient();
const { data, metadata } = await client.system.health();
```

The [method map](contract/js-methods.json) lists all public calls by module and method. Call options use the declared `path`, `query`, `headers` and `body` groups. TypeScript consumers can import `ApiInput<"module.method">` and `ApiResult<"module.method">`. Each result retains HTTP metadata. Use its `kind` to distinguish structured JSON from raw bytes on operations that offer both.

`information.previewVat` requests an informational preview. `vat.calculateAndPersist` persists a calculation through the API. `supplies.commit` submits committed supply evidence, and the filing methods distinguish preparation, locking and recording a filed period. Supply references are trimmed using backend-compatible whitespace rules and checked against the 160-byte UTF-8 limit. A correction requires an event reference and an original sale UUID.

Call `auth.startAgentRegistration` and `auth.claimAgentApiKey` explicitly. Treat registration tokens and claimed keys as sensitive data. Claiming a key leaves credential rotation under caller control.

Native requests for mutations and credential claims use a one-shot body for each permitted attempt, including writes with an empty body. This prevents Fetch's HTTP 421 connection recovery from repeating them outside the SDK retry policy. Injected Fetch adapters are trusted to preserve the same dispatch semantics.

## Build and verify

Use npm 11.20.0 with a supported Node.js version and the public checkout. The local tests use OpenSSL to generate an ephemeral certificate for TLS rejection testing.

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm run check:generated
npm run lint
npm test
npm run check:pack
```

`npm run generate` rebuilds the internal TypeScript models and numeric conversion metadata from the pinned public OpenAPI. The pack check compares a clean compilation, verifies the archive allowlist and tests JavaScript and TypeScript consumers against a local tarball.
