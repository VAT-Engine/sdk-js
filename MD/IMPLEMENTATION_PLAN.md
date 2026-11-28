# VAT Engine SDK-JS — implementation plan

**Status:** JS-00 through JS-03 verified · JS-04 ready for review · 2026-11-28
**Repository:** `VAT-Engine/sdk-js` · **Intended package:** `@vat-engine/sdk` (namespace pending)  
**Requirements:** Approved Shared SDK Standard v1.0, reflected in the [public requirements extract](../contract/REQUIREMENTS.md) and the [pinned public contract](../contract/README.md).
**Release model:** Independent Gate A for the direct HTTP client and Gate B for optional durable delivery, approved on 2026-11-28. Publication and hosted acceptance have separate evidence and authorization.

## 1. Baseline and release boundaries

- Follow the shared requirements extract and the pinned public contract. Record material differences from the contract before implementing affected behavior.
- The verified published snapshot contains 55 operations across 51 paths, with 13 operations without an operation ID. It includes Auth Context and the two explicit agent sandbox registration operations. See the [manifest](../contract/manifest.json). The public contract and anonymous availability checks are separate from authenticated acceptance.
- Pin the actual approved public operation set at foundation and reconfirm before release. Counts are evidence, not a fixed ceiling. Keep a full operation matrix keyed by HTTP method + path; never infer coverage from operationId.
- Implement only approved public capabilities. No independent VAT engine, inferred legal decisions, rate fallbacks, governed treatment, Exact Replay or commerce integration internals. New supported endpoints are introduced by reviewed contract changes.
- For agent registration endpoints, if included in the pinned contract, expose explicit user-invoked methods, retain approval and expiry semantics, treat claim tokens and returned keys as secrets, and do not silently register, claim or change credentials. Do not retry an ambiguous registration automatically unless its replay contract explicitly permits it. Treat approval-pending responses according to their documented interval and Retry-After; do not turn every 409 into an automatic retry.

## 2. Repository and context workflow

Start SDK work in this repository. Read this plan, relevant [decisions](decisions/README.md), the [contract manifest and synchronization guide](../contract/README.md), and the [public-safe requirements](../contract/REQUIREMENTS.md). Consult reviewed operation and fixture exports checked into the repository and confirm local Git state.

Keep local agent instructions, editor and agent settings, and private memory out of public Git and package archives. Builds, tests, and CI use the public checkout and its pinned artifacts. Contributors can work from the public repository alone.

### Milestone and release reviews

Select the authorized milestone, inspect its inputs, plan the smallest change that meets acceptance, implement and run focused checks. Prepare a scoped PR for code and security review, resolve findings, record the tested revisions, and merge with explicit authorization. End at the milestone boundary. Keep package publishing and its permissions separate from development.

The SDK repository has active main-branch and release-tag rulesets. Main requires a PR and has branch protections. Maintainers still record code and security review before an authorized merge, including in the solo-maintainer workflow. Release tag rules restrict updates and deletion. Recheck applicable rules before release. Use least-privilege workflows and reviewed SHA-pinned GitHub Actions when CI is introduced. Keep release-only credentials out of PR checks. The intended npm namespace is pending registry resolution and does not block JS-00 or local implementation.

## 3. Progress conventions

Use task IDs below in prompts, branches, PR descriptions and reviews. A checked box means the item met its acceptance criteria with recorded evidence, not simply that code exists. Track per-phase state: `Planned`, `In progress`, `Ready for review`, `Blocked`, `Verified`. `Verified` requires applicable checks and review on the actual accepted revision. Publication and hosted acceptance have separate states. Avoid maintaining a second independently edited progress tracker; optionally link Todoist/GitHub issues to these task IDs. Keep a small current-status table with active task, blocker, relevant revision, tests/evidence and next approved task. Never include real credentials or sensitive response data in public logs or plan entries.

At the beginning of every task, check the branch, commit, and working tree. Read the relevant milestone, decisions, and contract inputs. At completion, record files, test results, fixture and contract revisions, the PR or commit if available, and remaining limitations.

## 4. Gate A — direct client

### JS-00 — Planning and context foundation

**Objective:** Prepare independent repositories, shared requirements and reviewable evidence.  
**Dependencies:** Reviewed inputs and access to both checkouts.

- [x] Approve shared standard v1.0 and independent Gate A and Gate B releases. Strict-mode inclusion remains a later decision.
- [x] Prepare the canonical shared candidate and public-safe requirements handoff with a verified public snapshot.
- [x] Prepare the execution plan and decision location. Establish private local-agent setup and verify public exclusions.
- [x] Finalize JS-00 acceptance and authorize JS-01.
- [x] Record the published snapshot, unauthenticated Auth Context availability and outstanding hosted acceptance and registry work.
**Acceptance:** owner-approved scope, independent workspace/repo boundaries, known contract revision and explicit unresolved decisions. No runtime implementation in this phase.

### JS-01 — Contract and shared conformance corpus

**Objective:** Establish reproducible contract handoff and common behavioral evidence.  
**Dependencies:** JS-00 approval and the reviewed public baseline.

- [x] Verify the original OpenAPI pin and export the exact method/path allowlist, operation policy and synthetic corpus. Cover anonymous, API-key and claim-token routes, including operations without IDs.
- [x] Establish offline assembly, verification and drift reporting. Map all proposed JS methods to the catalog contract checks. Method names remain provisional.
- [x] Validate wire fixtures for int64 boundaries and unsafe JS magnitudes, supply revision types, nullable ECB rate, omission and false, empty dispatch scopes, raw attachments, pagination, known error shapes, auth precedence and replay.
**Acceptance:** exact operation-set equality, all references resolve, fixture validation, no private material or real credentials; each planned method mapped to its operation and test.

### JS-02 — Node.js package foundation and technical decisions

**Objective:** Choose package and toolchain settings and verify precise representations.  
**Dependencies:** JS-01 contract and conformance corpus.

Follow the [approved Node.js package foundation](decisions/0001-node-package-foundation.md). The implementation builds on SDK [#7](https://github.com/VAT-Engine/sdk-js/pull/7) and [#8](https://github.com/VAT-Engine/sdk-js/pull/8), both merged into `main`.

- [x] Approve supported Node versions and package formats, toolchain, compiler settings, package manager, export strategy and minimal dependencies.
- [x] Implement native exact JSON and verify the generated mapping. Use `bigint` for declared int64 outputs and reject unsafe number inputs. Preserve quoted amounts, ordinary doubles, omission, null, false and the bytes of attachments.
- [x] Verify the SHA-pinned, read-only GitHub Actions workflow under the active repository and organization policies. All seven jobs passed on [implementation revision `109234b`](https://github.com/VAT-Engine/sdk-js/actions/runs/46148605465). Changes to required checks need separate owner authorization.
- [x] Define and verify the npm `files` allowlist. Clean public-only builds and tests passed. Dry-run pack and local tarball inspection with synthetic ignored files verified the same seven package files.
**Acceptance:** installable local package skeleton; clean consumer import tests for agreed formats; deterministic build/type generation; precision proof across shared fixtures. No registry publish.

### JS-03 — Shared HTTP transport

**Objective:** Create the shared transport and preserve wire semantics.  
**Dependencies:** JS-02 package foundation and JS-01 fixtures.

- [x] Native Fetch with normalized HTTPS destinations, explicit HTTP loopback opt-in, operation-specific API key attachment, timeout, total deadline, cancellation and cleanup.
- [x] Encode approved path, query and header parameters and exact JSON. Decode documented successes by status and media. Preserve attachment bytes and expose response metadata. Classify incomplete and undocumented HTTP errors without changing their schemas.
- [x] Reject redirects and capture destination, credentials, semantic headers and body before dispatch. Keep raw upstream errors, caller abort reasons, credentials and payloads outside error diagnostics.
**Acceptance:** local fault-injection/mock HTTP tests cover deadlines, abort, transport errors, response metadata, redirects, and correct raw request bytes.

### JS-04 — Authentication, context and resilience

**Objective:** Implement scoped authentication, verified context where offered, and safe retries.  
**Dependencies:** JS-03 transport and JS-01 replay/access mapping.

- [x] Expose context discovery and assertions. Strict mode requires an independent trusted binding and fresh credential verification against the operation catalog. Local checks cover rotated and revoked keys, source and destination binding, scope, environment, and assertion error precedence.
- [x] Implement operation-specific replay, bounded exponential jitter, Retry-After and a circuit breaker isolated by deployment and credential generation. Freeze the credential, destination, semantic headers and exact bytes once per invocation. Preserve one deadline and return a typed unknown outcome when a possibly processed mutation cannot be reconciled by replay.
- [x] Verify calculation replay requires an explicit transaction date and idempotency key and preserves original source attribution. Supply replay requires stable identity, revision, correction reference where needed, and explicit facts that otherwise depend on Source Profile defaults. Registration and claim remain caller-driven.
**Acceptance:** test substitutions, lost responses, changed runtime config, rate limit/recovery and ambiguous outcomes. Strict client: zero outgoing mutations after failed preflight; separately verify server mismatch yields zero persisted mutations in authorized QA. Ordinary mode always passes credential pinning tests. No strict-mode claim without hosted verification.

### JS-05 — API coverage by module

**Objective:** Cover every pinned operation with explicit discoverable methods.  
**Dependencies:** JS-03 transport and JS-04 auth/resilience; JS-01 operation mapping.

- [ ] Authentication/context and explicit agent registration/claim (where approved); system health/readiness, classification and tax classes.
- [ ] VAT numeric calculation and rates; information lookup/resolution/conditional preview; SME and compliance.
- [ ] Sources, tax registrations and committed supplies (sales, refunds, revisions); operational-key restrictions.
- [ ] Customer VAT events/rules/attention/declarations/selection/classification/reprocessing/retirement/provisional rates.
- [ ] Transaction history/detail/aggregation, reports, OSS/IOSS and locked-return operations; never imply filing authority or submission.
- [ ] Prove every pinned operation has an explicit method, typed inputs/outputs, status/media behavior, contract test and example/reference.
**Acceptance:** 100% of pinned supported operations, measured via method+path matrix; no deferred APIs; preview/persisted/committed and report-state semantics distinct.

### JS-06 — Pagination, exports and developer experience

**Objective:** Provide pagination, byte-preserving downloads and developer guidance.  
**Dependencies:** JS-05 module coverage and shared output fixtures.

- [ ] Manual cursors and lazy async iteration preserving filters and context, detecting non-progressing cursors; no silent restart.
- [ ] JSON/CSV and binary/archive downloads; preserve original attachment bytes regardless of JSON Content-Type; expose headers and safe filenames, verify fixture digest.
- [ ] JSDoc, discoverable modular API, typed errors, response metadata and optional sanitized observability hooks. Safe explicit agent-auth pending handling if included; no secret logging.
**Acceptance:** consumer examples, pagination and raw artifact integrity tests, no browser-side secret usage.

### JS-07 — Gate A acceptance and release candidate

**Objective:** Qualify and review a Gate A release candidate.  
**Dependencies:** JS-01 through JS-06 and applicable authorized hosted evidence.

- [ ] Full unit, contract, integration, build, type, lint, security/dependency and package checks; controlled outages (1–3 minutes and longer) with bounded direct deadline/no retry storm; supported runtime/format tests.
- [ ] Authorized hosted acceptance using isolated QA tenants and pinned public contract; committed supplies require operational QA, not sandbox. Do not disrupt Production or fabricate test evidence. Record exact API/SDK revisions, scope and limitations.
- [ ] Documentation and OSS readiness: README, API reference, quickstarts, safe examples, precision/error/retry/idempotency guidance, security/contribution policies and changelog. Document queue and strict mode availability accurately. Review public repository/history and npm pack contents for leakage.
- [ ] Test packed tarball in independent TypeScript and JS projects; prepare release candidate, independent SemVer and consumer feedback acceptance. Approve package identity and registry publishing separately; configure trusted publishing with release-only OIDC and provenance when registry is ready.
**Acceptance:** all Gate A standard criteria; no material known contract/security/precision defect; full evidence and approval. If Gate B is not ready, label durable delivery unavailable. npm namespace/publishing pending may block publication but not local implementation or package acceptance.

## 5. Gate B — optional durable delivery

### JS-08 — Durable-delivery design and common fixtures

**Objective:** Decide the delivery architecture and prepare shared fixtures.  
**Dependencies:** Proven direct behavior through JS-07 candidate acceptance and owner authorization of Gate B work.

- [ ] Review approved Gate B scope, storage adapter choice and packaging, schema/record format, identity and deduplication/receipt retention, leases and concurrency, retry schedule/horizon, dependency ordering, upgrades and rollback. Choose one durable reference adapter; keep core client independent of storage.
- [ ] Prepare common conformance/fault fixtures before implementation, including offline enqueue, backend-compatible Unicode whitespace, NUL and malformed UTF-8 rejection, empty/optional reference rules, 160/161 ASCII, 80/81 é, 40/41 four-byte values, and 160 ASCII with surrounding spaces. Normalize before generated schema validation if used; verify at public method entry. Track public byte-limit documentation as a separate contract follow-up and preserve current API acceptance.
**Acceptance:** reviewed ADRs, storage and job-envelope invariants; verified hosted context mechanism and approved adapter semantics before stable Gate B.

### JS-09 — Persistent storage and idempotent enqueue

**Objective:** Provide durable storage and atomic normalized idempotent enqueue.  
**Dependencies:** JS-08 approved adapter and job envelope decisions.

- [ ] Persist before send; verified intended origin/context/environment plus non-secret credential reference; no raw keys in storage. Immutable versioned enqueue intent and final wire bytes/digest before first dispatch.
- [ ] Atomic unique dedupe for normalized economic identity/revision within binding; equal intent returns same job ID/status, changed facts/dependency conflicts locally, higher revision ordered; keep receipts/tombstones through supported window. Capture known sale-time facts explicitly and document deferred Source Profile defaults.
- [ ] Adapter transactions, capacity/storage failure, concurrent enqueue, lost local acknowledgement, restart recovery; transactional outbox integration example without claiming atomicity where unsupported.
**Acceptance:** persistence proven across process restart, no duplicate jobs/sends in all specified local cases, no acceptance on storage failure.

### JS-10 — Worker, retries and dependencies

**Objective:** Deliver queued requests with verified authority, retries and dependencies.  
**Dependencies:** JS-09 storage and applicable context contract from JS-04.

- [ ] Explicit lifecycle/start/stop or drain; bounded concurrency, atomic claims and leases, crash recovery, per-attempt key resolution/verification; never auto-rebind after context change. Same-request assertion required; fail closed.
- [ ] Only queue retries own scheduled attempts; prevent nested HTTP retry multiplication. Backoff/jitter, Retry-After, configured delivery horizon, circuit breaking/rate control and recovery; no busy loop.
- [ ] Stable sale receipt/UUID resolution for linked refunds, ordered revisions and independent concurrency; preserve frozen request bytes after first dispatch. Do not auto-advance revision to bypass 409.
**Acceptance:** lost remote acknowledgement yields original duplicate receipt; dependency chains drain after outage; invalid scope/context cannot send; no duplicate economic effects under tested replay semantics.

### JS-11 — Failure handling, upgrades and operations

**Objective:** Qualify failure handling, record upgrades and operations.  
**Dependencies:** JS-10 worker and JS-09 persisted record design.

- [ ] Queue status/metrics and sanitized observability, permanent failure/dead-letter/manual retry with original identity; pause for unknown outcomes, expired safety window or unavailable verification.
- [ ] Versioned record readers, compatibility migration, rolling upgrade/rollback policy and unknown/corrupt record quarantine. Test SDK A → B with previously accepted but unacknowledged sale, same bytes and duplicate UUID, then linked refund. Keep dedupe/receipt identity across upgrades.
**Acceptance:** no silent loss, rewrite or rerouting; documented retention, failure recovery and safe manual workflows; supported storage security and worker lifecycle proven.

### JS-12 — Gate B acceptance and release

**Objective:** Qualify and review a Gate B release candidate.  
**Dependencies:** JS-08 through JS-11, a representative pilot and hosted verified strict-context acceptance.

- [ ] Full Gate B conformance, fault injection, local/remote lost acknowledgement, restart and upgrade, storage failure, concurrency, Source Profile change and controlled outage recovery.
- [ ] Pilot in an isolated representative merchant integration; verify hosted account/environment isolation and key rotation, exact financial and report effects with authorized operational QA. Revoke temporary keys.
- [ ] Publish accurate capability/support matrix and durable-delivery docs, storage/worker setup, outbox guidance, privacy/retention, recovery and upgrade policies; owner approves compatible version and publication.
**Acceptance:** all Gate B standard criteria pass; no stable durable-delivery claims before acceptance. Record reference implementation findings for future PHP and Python plans.


## 6. Milestone status and evidence

Each checklist records scope and acceptance. Update this table after each milestone with the exact SDK and contract revisions, tests, PR link and remaining limits. A dash means no implementation revision or PR exists for the milestone.

| ID | Status | SDK revision / PR | Evidence and remaining conditions |
| --- | --- | --- | --- |
| JS-00 | Verified | `bbab7c4` / [#6](https://github.com/VAT-Engine/sdk-js/pull/6) | Accepted on 2026-11-28. Verified 19 representative local excludes, the private/local instruction match, Git index/history exclusions and Git/npm archive boundaries. |
| JS-01 | Verified | `bbab7c4` / [#6](https://github.com/VAT-Engine/sdk-js/pull/6) | Accepted on 2026-11-28 on the merged SDK revision and its reviewed upstream handoff. A Git archive of the accepted revision verified 55 operations, 959 local references, 22 cases with 33 exchanges and 14 supply-reference cases. Seven tooling tests passed and two offline assemblies matched byte-for-byte. The approved operation matrix matched all 55 method/path identities. |
| JS-02 | Verified | `827338b` / [#9](https://github.com/VAT-Engine/sdk-js/pull/9) | Reviewed PR merged into main with the same tree as final head `ee64593`. All seven [hosted jobs](https://github.com/VAT-Engine/sdk-js/actions/runs/46148833243) passed. A clean archive of the merged revision reproduced generation, passed 28 tests and verified the seven-file package on Node 26.13.1. |
| JS-03 | Verified | `0fc9a91` / [#10](https://github.com/VAT-Engine/sdk-js/pull/10) | Reviewed PR merged with the same tree as final head `0ecabab`. The seven-job [hosted workflow](https://github.com/VAT-Engine/sdk-js/actions/runs/46153924013) passed. A clean archive of the merged revision passed deterministic generation, 53 tests and the 18-file package check on Node 26.13.1. |
| JS-04 | Ready for review | `add89f9` / [#11](https://github.com/VAT-Engine/sdk-js/pull/11) | Clean public archives passed generation, lint, 77 Node tests and the 22-file ESM/CommonJS/TypeScript package check on Node 22.13.0, 22.23.5, 24.0.0, 24.22.3, 26.0.0 and 26.13.1. The contract verifier, seven tooling tests and all seven [hosted CI jobs](https://github.com/VAT-Engine/sdk-js/actions/runs/46155995952) passed. Failed strict preflight sent zero business requests. A separate mocked server received the assertion, preserved the contract error and wrote zero records or jobs. Local fault injection covered replay, revocation, circuit recovery and unknown outcomes. Authenticated hosted strict-mode acceptance remains pending. |
| JS-05 | Planned | — / — | Operation methods, coverage and examples pending. |
| JS-06 | Planned | — / — | Cursor, download and developer-experience fixtures pending. |
| JS-07 | Planned | — / — | Gate A package and consumer tests, hosted acceptance, reviews and publication authorization pending. |
| JS-08 | Planned | — / — | Adapter, packaging and documented durability semantics pending. |
| JS-09 | Planned | — / — | Persistent adapter and restart/concurrency evidence pending. |
| JS-10 | Planned | — / — | Worker, dependency and lost-acknowledgement evidence pending. |
| JS-11 | Planned | — / — | Failure handling, compatibility and recovery evidence pending. |
| JS-12 | Planned | — / — | Gate B acceptance, pilot and release authorization pending. |

The [PR #6 fixture follow-up](https://github.com/VAT-Engine/sdk-js/pull/6#discussion_r4726920232) verifies `400 missing_price_includes_vat` for both omitted and null amount-basis flags. The contract verifier and all seven tooling tests passed with the refreshed fixture digest.

The [public contract pin](../contract/manifest.json) remains the JS-01 acceptance baseline. On 2026-11-28 the published OpenAPI matched its SHA-256 (`5158c7c19479d3e6db0e5617b249c7520177778dbabed8a8975c17319275f065`). The sandbox filing error correction has been merged upstream for both lock and file. Synchronize the SDK pin and the two affected fixtures in a separate review after the corrected public contract is deployed and verified. This follow-up remains part of the Gate A contract reconfirmation.

npm package publication requires namespace resolution and a separate decision.
