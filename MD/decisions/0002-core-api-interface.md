# JS-05 public CORE modules

**Status:** Finalized for implementation review · 2026-11-28

The public client returned by `createVatClient` groups named methods by domain. The [final JS method map](../../contract/js-methods.json) is the source of names and binds each method to one approved HTTP method and path. Use verbs that describe the observable action. List and get methods distinguish collections from single resources. `information.previewVat` is informational, `vat.calculateAndPersist` creates the API calculation record, and `supplies.commit` submits operational evidence. Filing readiness, locking and recording a filed period have separate methods. The filing method records status and grants no submission authority.

Each method accepts one options object with the applicable `path`, `query`, `headers` and `body` groups. Use contract field names inside each group to preserve documented aliases and avoid collisions between path, query and body names. Supply required groups where the contract requires them. The object may be omitted when only optional groups and invocation controls are available. TypeScript derives inputs from the generated contract and widens numeric int64 inputs to `bigint | number`. Shared encoding checks safe integers at runtime and preserves optional, nullable and explicitly false values.

Every method returns a discriminated response with the documented status, response metadata and data. Structured JSON retains the contract model, while byte media return `Uint8Array`, including the locked JSON archive. Typed helper aliases expose input and result types by public method name. HTTP, context and unknown-outcome errors come from the shared client. The transport retains additive server fields and enum values. Runtime validation remains focused on the shared transport's wire and safety checks.

The explicit auth methods start registration and claim approved credentials only on caller invocation. They share the existing no-polling and no-replay rules. The client keeps its existing low-level `request` and context discovery entry points. A single transport, context and retry path serves both the typed modules and the low-level client.

Supply intake validates external references once at the shared request preparation boundary. Trim backend-compatible whitespace before measuring the 160-byte UTF-8 limit. Require nonempty order and line references. Omit an optional reference that normalizes to empty and require a nonempty event reference for a correction. Preserve case and interior whitespace. Reject NUL and malformed Unicode before encoding and before retry identity is captured.

JS-05 exposes direct calls, documented response bytes and caller-managed cursors. Higher-level pagination, developer helpers and download utilities belong to JS-06.
