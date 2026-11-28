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
