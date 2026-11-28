# Pinned public API contract

This bundle is the offline input for SDK contract work. [The manifest](manifest.json) records the exact OpenAPI SHA-256, the reviewed public source and all bundle file digests. The immutable source revision is the digest because different public snapshots can share one API version.

| File | Role |
| --- | --- |
| [OpenAPI](openapi.yaml) and [allowlist](allowlist.txt) | Public wire contract and sorted HTTP method/path identities |
| [Policy](policy.json) | Reviewed access, data environments, business effects and replay conditions by operation |
| [Operation catalog](operations.json) | Generated request and response metadata, pagination, context assertions and fixture links |
| [JS method map](js-methods.json) | One proposed JS module/method per operation, keyed to its catalog contract check. Names remain provisional. |
| [Conformance corpus](fixtures/README.md) | Language-neutral synthetic exchanges and exact response bytes |

## Offline verification

Use Python 3.11+ for the standalone tooling. Install the [pinned tool dependencies](tools/requirements.txt) in a local environment or use the same versions from an existing environment. The commands consume only the public checkout after dependency installation.

```sh
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r contract/tools/requirements.txt
python -B contract/tools/contract.py verify
python -B -m unittest discover -s contract/tools -v
```

Verification recomputes the manifest and catalog, resolves local OpenAPI references, checks method/path parity and validates synthetic exchanges and binary digests. The fixture validator handles OpenAPI 3.0.3 nullable values and signed int64 bounds, and checks `date` and `uuid` formats. Compatibility reviews still examine business and behavior changes. [OpenAPI 3.0.3](https://spec.openapis.org/oas/v3.0.3) · [jsonschema 4.19.2](https://python-jsonschema.readthedocs.io/en/v4.19.2/validate/)

## Synchronizing a reviewed upstream change

1. Obtain the approved public projection, independently recorded OpenAPI SHA-256 and verified date. Prepare a local input directory with `openapi.yaml`, the sorted `allowlist.txt`, reviewed `policy.json`, and the `fixtures/` corpus and referenced payloads. Review those inputs for disclosure. Use only synthetic fixtures.
2. Assemble into a fresh child directory. Copy the approved digest and date into the command. This uses the pinned files locally and emits a new candidate.

   ```sh
   staging=$(mktemp -d)
   python -B contract/tools/contract.py assemble "$INPUT_DIR" "$staging/core" \
     --sha256 "$APPROVED_SHA256" --verified-on "$VERIFIED_ON"
   python -B contract/tools/contract.py verify "$staging/core"
   python -B contract/tools/contract.py compare contract "$staging/core"
   ```

3. Review operation and schema drift, including permissions, statuses, shape/nullability, media, errors and replay. The comparison reports changed identities and artifact digests. Review compatibility and business meaning before accepting the candidate.
4. Copy the reviewed neutral bundle into the SDK, removing obsolete bundle files as part of the reviewed diff. Update the separate SDK method map and run offline verification. Each SDK adopts and releases the bundle through its own PR. Keep private source and provenance in the upstream review record.

The neutral bundle and tooling can be used by PHP and Python without a JS package install. Generation of SDK language types and the Node.js package toolchain are JS-02 work.
