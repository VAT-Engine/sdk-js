# Pinned public API contract

[The manifest](manifest.json) records the API version, public source revision and SHA-256 of the pinned [OpenAPI snapshot](openapi.yaml). The public digest identifies the immutable artifact. The SDK can consume it offline. [Shared requirements](REQUIREMENTS.md) summarize the API behaviors relevant to development. The [fixture directory](fixtures/README.md) will receive the synthetic corpus in JS-01.

For a proposed synchronization, obtain the approved public projection and method/path set. Compare exact bytes and SHA-256, validate references and operation parity, and review schema, behavior and compatibility changes. Review any requirements and fixture export for disclosure. Submit updates as a separate SDK PR. Pin generation tools and options, regenerate deterministically, and run conformance before acceptance once those tools exist.

Builds and CI must use pinned local inputs. A read-only drift check can report a candidate update. Synchronization and package publication require independent decisions. JS-01 establishes the complete workflow tooling and operation/fixture mapping.
