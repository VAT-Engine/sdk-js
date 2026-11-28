"""Regression checks for JS-01 contract tooling, independent of the SDK runtime."""

import json
from pathlib import Path
import shutil
import tempfile
import unittest

from contract import (
    CONTRACT, build, collect_operations, digest, difference, operation_digest, parse_json, read_spec, verify,
)


class ContractChecks(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.bundle = Path(self.temp.name) / "candidate"
        shutil.copytree(CONTRACT, self.bundle, ignore=shutil.ignore_patterns("tools", "__pycache__"))

    def test_build_reproduces_every_pinned_file(self):
        _, _, manifest, _ = verify(self.bundle, self.bundle / "js-methods.json")
        files, _, _ = build(self.bundle, manifest["artifact"]["sha256"], manifest["source"]["verifiedOn"])
        for path, data in files.items():
            self.assertEqual(data, (self.bundle / path).read_bytes(), path)

    def test_changed_openapi_requires_an_approved_digest(self):
        path = self.bundle / "openapi.yaml"
        path.write_bytes(path.read_bytes() + b"\n")
        with self.assertRaisesRegex(ValueError, "approved SHA-256"):
            verify(self.bundle)

    def test_local_references_and_duplicate_yaml_keys(self):
        with self.assertRaisesRegex(ValueError, "non-local reference"):
            read_spec(b"openapi: 3.0.3\na: {$ref: 'https://example.invalid/schema'}\n")
        with self.assertRaises(KeyError):
            read_spec(b"openapi: 3.0.3\na: {$ref: '#/missing'}\n")
        with self.assertRaisesRegex(ValueError, "duplicate YAML key"):
            read_spec(b"openapi: 3.0.3\npaths: {}\npaths: {}\n")

    def test_allowlist_and_method_coverage_reject_missing_operations(self):
        allowlist = self.bundle / "allowlist.txt"
        original = allowlist.read_text()
        allowlist.write_text("\n".join(original.splitlines()[1:]) + "\n")
        with self.assertRaisesRegex(ValueError, "allowlist"):
            verify(self.bundle)
        allowlist.write_text(original)
        mapping = self.bundle / "js-methods.json"
        contents = parse_json(mapping.read_bytes())
        contents["methods"].pop("GET /health")
        mapping.write_text(json.dumps(contents))
        with self.assertRaisesRegex(ValueError, "JS method coverage"):
            verify(self.bundle, mapping)

    def test_binary_payload_must_match_its_exact_bytes(self):
        payload = self.bundle / "fixtures/payloads/locked-export.json"
        payload.write_bytes(payload.read_bytes().replace(b"\r\n", b"\n"))
        with self.assertRaisesRegex(ValueError, "fixture body digest mismatch"):
            verify(self.bundle)

    def test_semantic_drift_appears_in_comparison(self):
        spec_file = self.bundle / "openapi.yaml"
        old, _, manifest, _ = verify(self.bundle)
        raw = spec_file.read_bytes().replace(b"Health check (liveness probe)", b"Health probe")
        self.assertNotEqual(digest(raw), manifest["artifact"]["sha256"])
        spec_file.write_bytes(raw)
        files, new, _ = build(self.bundle, digest(raw), manifest["source"]["verifiedOn"])
        self.assertFalse(difference(old["paths"], new["paths"])["added"])
        published = parse_json((self.bundle / "operations.json").read_bytes())["operations"]
        staged = parse_json(files["operations.json"])["operations"]
        self.assertEqual(difference(published, staged)["changed"], ["GET /health"])

    def test_referenced_schema_drift_affects_the_operation_digest(self):
        spec, _ = read_spec((self.bundle / "openapi.yaml").read_bytes())
        item, operation = collect_operations(spec)["POST /v1/vat/calculate"]
        previous = operation_digest(spec, item, operation)
        spec["components"]["schemas"]["VatCalculateRequest"]["properties"]["country"]["minLength"] = 3
        self.assertNotEqual(operation_digest(spec, item, operation), previous)


if __name__ == "__main__":
    unittest.main()
