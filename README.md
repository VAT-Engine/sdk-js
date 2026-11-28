# Official VAT Engine SDK for TypeScript and JavaScript. Integrate EU VAT calculations, reporting, and compliance workflows into server-side applications.

The SDK is in development. The [implementation plan](MD/IMPLEMENTATION_PLAN.md) records milestone status and release criteria. The [contract directory](contract/README.md) contains the pinned public OpenAPI and development requirements.

## Package foundation

The local package exposes `toInt64(value)`, which returns a `bigint` from a signed 64-bit `bigint` or safe integer `number`. Pass larger inputs as `bigint` literals to retain every digit. Node.js 22.13+, 24.x and 26.x support the same entry point with either `import` or `require()`.

## Build and verify

Use npm 11.20.0 with a supported Node.js version and the public checkout.

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm run check:generated
npm run lint
npm test
npm run check:pack
```

`npm run generate` rebuilds the internal TypeScript models and numeric conversion metadata from the pinned public OpenAPI. The pack check compares a clean compilation, verifies the archive allowlist and tests JavaScript and TypeScript consumers against a local tarball.
