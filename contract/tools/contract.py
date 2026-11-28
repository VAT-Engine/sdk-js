#!/usr/bin/env python3
"""Offline tooling for the reviewed, language-neutral CORE contract bundle."""

import argparse
from datetime import date
import hashlib
import json
from pathlib import Path
import re
import sys

from jsonschema import Draft4Validator, FormatChecker
import yaml


CONTRACT = Path(__file__).resolve().parents[1]
METHODS = set("get put post delete options head patch trace".split())
SOURCE_URL = "https://vat-engine.app/openapi.yaml"
INPUTS = ("openapi.yaml", "allowlist.txt", "policy.json", "fixtures/cases.json")
AUTH = {"anonymous", "api_key", "claim_token"}
SCOPES = {"full", "read-only", "calculate-only", "classification-resolve"}
ENVIRONMENTS = {"operational", "sandbox"}
GO_SPACE = (
    "\t\n\v\f\r \x85\xa0\u1680"
    + "".join(map(chr, range(0x2000, 0x200B)))
    + "\u2028\u2029\u202f\u205f\u3000"
)
REPLAY = {
    "read_candidate", "mutation_no_retry", "registration_no_retry",
    "claim_polling", "calculation_conditional", "supply_conditional",
}
FORMAT = FormatChecker(formats=("date", "uuid"))


def require(condition, message):
    if not condition:
        raise ValueError(message)


class UniqueYamlLoader(yaml.SafeLoader):
    # OpenAPI's JSON-compatible YAML keeps unquoted dates as strings.
    yaml_constructors = dict(yaml.SafeLoader.yaml_constructors)
    yaml_constructors["tag:yaml.org,2002:timestamp"] = yaml.SafeLoader.construct_scalar

    def construct_mapping(self, node, deep=False):
        mapping = {}
        for key_node, value_node in node.value:
            key = self.construct_object(key_node, deep=deep)
            require(key not in mapping, f"duplicate YAML key: {key}")
            mapping[key] = self.construct_object(value_node, deep=deep)
        return mapping


def unique_json(pairs):
    result = {}
    for key, value in pairs:
        require(key not in result, f"duplicate JSON key: {key}")
        result[key] = value
    return result


def reject_nonfinite(value):
    raise ValueError(f"non-JSON number: {value}")


def parse_json(raw):
    return json.loads(raw, object_pairs_hook=unique_json, parse_constant=reject_nonfinite)


def digest(raw):
    return hashlib.sha256(raw).hexdigest()


def json_bytes(value):
    return (json.dumps(value, ensure_ascii=False, sort_keys=True, indent=2) + "\n").encode()


def pointer(document, location):
    require(location == "" or location.startswith("/"), f"invalid JSON pointer: {location}")
    if location:
        for part in location[1:].split("/"):
            part = part.replace("~1", "/").replace("~0", "~")
            document = document[int(part)] if isinstance(document, list) else document[part]
    return document


def references(value):
    if isinstance(value, dict):
        if "$ref" in value:
            yield value["$ref"]
        for child in value.values():
            yield from references(child)
    elif isinstance(value, list):
        for child in value:
            yield from references(child)


def resolve(spec, value):
    seen = set()
    while "$ref" in value:
        ref = value["$ref"]
        require(ref.startswith("#/"), f"non-local reference: {ref}")
        require(ref not in seen, f"reference-only cycle at {ref}")
        seen.add(ref)
        value = pointer(spec, ref[1:])
    return value


def response_formats(spec, response):
    return {
        media: "bytes" if resolve(spec, content.get("schema", {})).get("format") == "binary" or
        media.split(";", 1)[0] != "application/json" else "json"
        for media, content in resolve(spec, response).get("content", {}).items()
    }


def read_spec(raw):
    spec = yaml.load(raw, Loader=UniqueYamlLoader)
    require(spec["openapi"] == "3.0.3", "unsupported OpenAPI version")
    count = 0
    for ref in references(spec):
        require(ref.startswith("#/"), f"non-local reference: {ref}")
        require(isinstance(pointer(spec, ref[1:]), dict), f"reference is not an object: {ref}")
        count += 1
    return spec, count


def collect_operations(spec):
    return {
        f"{method.upper()} {path}": (item, operation)
        for path, item in spec["paths"].items()
        for method, operation in item.items() if method in METHODS
    }


def wire_entry(spec, item, operation):
    parameters = {}
    for parameter in item.get("parameters", []) + operation.get("parameters", []):
        parameter = resolve(spec, parameter)
        parameters[f"{parameter['in']}:{parameter['name']}"] = parameter
    responses = {}
    for status, response in operation["responses"].items():
        resolved = resolve(spec, response)
        responses[status] = {
            "media": response_formats(spec, response),
            "headers": sorted(resolved.get("headers", {}), key=str.lower),
        }
    body = resolve(spec, operation.get("requestBody", {}))
    next_cursor = parameters.get("query:cursor")
    cursor_end = None
    if next_cursor:
        schema = resolve(spec, resolve(spec, operation["responses"]["200"])["content"]
                         ["application/json"]["schema"])
        cursor = schema["properties"]["next_cursor"]
        cursor_end = []
        if "next_cursor" not in schema.get("required", []):
            cursor_end.append("omitted")
        if cursor.get("nullable"):
            cursor_end.append("null")
    return {
        "operationId": operation.get("operationId"),
        "request": {
            "bodyRequired": body.get("required", False),
            "media": sorted(body.get("content", {})),
            "parameters": {
                key: {"required": val.get("required", False), "schema": val.get("schema", {})}
                for key, val in parameters.items()
            },
        },
        "responses": responses,
        "contextAssertion": "header:X-VAT-Expected-Context" in parameters,
        "pagination": {"parameter": "cursor", "response": "next_cursor", "end": cursor_end}
        if next_cursor else None,
    }


def operation_digest(spec, item, operation):
    security = operation.get("security", spec.get("security", [])) or []
    schemes = spec.get("components", {}).get("securitySchemes", {})
    wire = {
        "itemParameters": item.get("parameters", []),
        "operation": operation,
        "securitySchemes": {name: schemes[name] for requirement in security for name in requirement},
    }
    dependencies = {}
    pending = list(references(wire))
    while pending:
        ref = pending.pop()
        if ref not in dependencies:
            dependencies[ref] = pointer(spec, ref[1:])
            pending.extend(references(dependencies[ref]))
    return digest(json_bytes({"wire": wire, "dependencies": dependencies}))


def schema_for_validation(value):
    if isinstance(value, list):
        return [schema_for_validation(item) for item in value]
    if not isinstance(value, dict):
        return value
    if "$ref" in value:
        return {"$ref": value["$ref"]}
    result = dict(value)
    for name in ("properties", "patternProperties", "schemas"):
        if name in result:
            result[name] = {key: schema_for_validation(item) for key, item in result[name].items()}
    for name in ("items", "additionalProperties", "not", "allOf", "anyOf", "oneOf"):
        if name in result:
            result[name] = schema_for_validation(result[name])
    if value.get("nullable") and isinstance(value.get("type"), str):
        result["type"] = [value["type"], "null"]
    if value.get("type") == "integer" and value.get("format") == "int64":
        result["minimum"] = max(value.get("minimum", -(2**63)), -(2**63))
        result["maximum"] = min(value.get("maximum", 2**63 - 1), 2**63 - 1)
    return result


def schema_validator(components, schema):
    root = {
        "$ref": "#/subject",
        "components": components,
        "subject": schema_for_validation(schema),
    }
    return Draft4Validator(root, format_checker=FORMAT)


def fixture_body(bundle, message, payloads):
    require(not ("body" in message and "bodyFile" in message), "fixture uses both body forms")
    if "bodyFile" not in message:
        return message.get("body", "").encode()
    ref = message["bodyFile"]
    require(re.fullmatch(r"fixtures/payloads/[a-z0-9-]+\.(json|csv)", ref), f"invalid payload path: {ref}")
    path = bundle / ref
    require(not path.is_symlink() and path.resolve().is_relative_to(bundle.resolve()),
            f"fixture payload must be local: {ref}")
    raw = path.read_bytes()
    require(digest(raw) == message["sha256"], f"fixture body digest mismatch: {ref}")
    payloads[ref] = raw
    return raw


def check_message(bundle, spec, where, message, offer, schemas, payloads):
    require(all(isinstance(value, str) or
                (isinstance(value, list) and value and all(isinstance(entry, str) for entry in value))
                for value in message.get("headers", {}).values()),
            f"{where}: expected wire headers")
    if "body" not in message and "bodyFile" not in message:
        require(not message.get("media"), f"{where}: media without body")
        return None
    raw = fixture_body(bundle, message, payloads)
    media = message["media"]
    require(media in offer, f"{where}: undocumented media {media}")
    schema = offer[media]["schema"]
    if response_formats(spec, {"content": offer})[media] == "bytes":
        require("bodyFile" in message, f"{where}: use a byte-preserving fixture file")
        return None
    parsed = parse_json(raw)
    validator = schema_validator(schemas, schema)
    expected_error = message.get("schemaError")
    if expected_error:
        errors = list(validator.iter_errors(parsed))
        require(bool(errors) and all(error.validator == expected_error["keyword"] and
                list(error.absolute_path) == expected_error["path"] for error in errors),
                f"{where}: unexpected schema deviation")
    else:
        require(validator.is_valid(parsed), f"{where}: documented schema rejected fixture")
    return parsed


def check_assertion(documents, assertion, where):
    step = assertion.get("step", 0)
    root = documents[step][assertion["message"]]
    location = assertion["pointer"]
    if assertion.get("absent"):
        try:
            pointer(root, location)
        except (KeyError, IndexError):
            return
        raise ValueError(f"{where}: expected omitted value at {location}")
    actual = pointer(root, location)
    if "sameAsStep" in assertion:
        original = documents[assertion["sameAsStep"]][assertion["message"]]
        require(actual == pointer(original, location), f"{where}: wire values changed at {location}")
    if "jsonType" in assertion:
        kind = {"int64": int, "string": str, "boolean": bool, "null": type(None), "number": float}
        require(type(actual) is kind[assertion["jsonType"]], f"{where}: incorrect type at {location}")
    if "equals" in assertion:
        require(type(actual) is type(assertion["equals"]) and actual == assertion["equals"],
                f"{where}: unexpected value at {location}")
    if "decimalDigits" in assertion:
        require(str(actual) == assertion["decimalDigits"], f"{where}: lost integer precision at {location}")


def check_supply_references(cases):
    ids = set()
    for case in cases:
        case_id = case["id"]
        require(case_id not in ids, f"duplicate supply reference case: {case_id}")
        ids.add(case_id)
        try:
            value = bytes.fromhex(case["inputHex"]).decode() if "inputHex" in case else case["input"]
            trimmed = value.strip(GO_SPACE)
            size = len(trimmed.encode())
        except UnicodeError:
            require(case["valid"] is False and "normalized" not in case, f"{case_id}: invalid UTF-8")
            continue
        valid = size <= 160 and "\0" not in trimmed and (bool(trimmed) or not case["required"])
        require((trimmed, size, valid) == (case["normalized"], case["utf8Bytes"], case["valid"]),
                f"{case_id}: unexpected normalization or UTF-8 boundary")
    return len(ids)


def check_corpus(bundle, spec, operations):
    schemas = schema_for_validation({"schemas": spec["components"]["schemas"]})
    cases = parse_json((bundle / "fixtures/cases.json").read_bytes())
    require(cases["formatVersion"] == 1, "unsupported fixture version")
    payloads = {}
    case_ids = set()
    by_operation = {key: [] for key in operations}
    exchanges = 0
    for case in cases["cases"]:
        case_id = case["id"]
        require(re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", case_id), f"invalid case ID: {case_id}")
        require(case_id not in case_ids, f"duplicate case ID: {case_id}")
        case_ids.add(case_id)
        key = case["operation"]
        require(key in operations, f"{case_id}: unknown operation")
        by_operation[key].append(case_id)
        item, operation = operations[key]
        require(case["exchanges"], f"{case_id}: empty exchanges")
        documents = []
        wire = wire_entry(spec, item, operation)
        for index, exchange in enumerate(case["exchanges"]):
            where = f"{case_id} exchange {index}"
            exchanges += 1
            request = exchange["request"]
            parameters = wire["request"]["parameters"]
            for name, parameter in parameters.items():
                location, label = name.split(":", 1)
                values = request.get(location, {}) if location != "header" else request.get("headers", {})
                if location in {"query", "path"} and parameter["required"]:
                    require(label in values, f"{where}: required {name} missing")
                if location in {"query", "path"} and label in values:
                    require(schema_validator(schemas, parameter["schema"]).is_valid(values[label]),
                            f"{where}: invalid {name}")
            if wire["request"]["bodyRequired"]:
                require("body" in request or "bodyFile" in request, f"{where}: missing request body")
            body_offer = resolve(spec, operation.get("requestBody", {})).get("content", {})
            response = exchange["response"]
            status = str(response["status"])
            require(status in operation["responses"], f"{where}: undocumented status {status}")
            response_offer = resolve(spec, operation["responses"][status]).get("content", {})
            require(not response_offer or "body" in response or "bodyFile" in response,
                    f"{where}: expected response body")
            documents.append({
                "exchange": exchange,
                "request": check_message(bundle, spec, where + " request", request, body_offer, schemas, payloads),
                "response": check_message(bundle, spec, where + " response", response, response_offer, schemas, payloads),
            })
        for assertion in case.get("assertions", []):
            check_assertion(documents, assertion, case_id)
    return by_operation, payloads, len(case_ids), exchanges, check_supply_references(cases["supplyReferenceCases"])


def build(bundle, expected_digest, verified_on):
    files = {path: (bundle / path).read_bytes() for path in INPUTS}
    sha = digest(files["openapi.yaml"])
    require(re.fullmatch(r"[a-f0-9]{64}", expected_digest) and sha == expected_digest,
            "OpenAPI does not match the approved SHA-256")
    require(date.fromisoformat(verified_on).isoformat() == verified_on, "invalid verification date")
    spec, refs = read_spec(files["openapi.yaml"])
    operations = collect_operations(spec)
    names = [operation["operationId"] for _, operation in operations.values() if "operationId" in operation]
    require(len(names) == len(set(names)), "duplicate operationId")
    allowlist = files["allowlist.txt"].decode().splitlines()
    require(allowlist == sorted(operations), "allowlist must exactly match sorted method/path identities")
    policy = parse_json(files["policy.json"])
    require(policy["formatVersion"] == 1, "unsupported policy version")
    require(set(policy["operations"]) == set(operations), "operation policies do not cover the allowlist")
    require(set(policy["retry"]["classes"]) == REPLAY, "retry classes do not match the policy format")
    case_map, payloads, cases, exchanges, references_checked = check_corpus(bundle, spec, operations)
    files.update(payloads)
    catalog = {}
    for key, (item, operation) in sorted(operations.items()):
        wire = wire_entry(spec, item, operation)
        row = policy["operations"][key]
        require(set(row) <= {"authentication", "scopes", "environments", "behavior", "effects",
                             "retryClass", "credentialEnvironment", "environmentRejection"},
                f"unexpected operation policy field: {key}")
        auth = row["authentication"]
        require(auth in AUTH and row["retryClass"] in REPLAY, f"invalid auth/retry policy: {key}")
        secured = bool(operation.get("security", spec.get("security")))
        require((auth == "api_key") == secured == wire["contextAssertion"], f"auth/header drift: {key}")
        require(bool(row["scopes"]) == secured and set(row["scopes"]) <= SCOPES,
                f"scope policy missing or unexpected: {key}")
        require(bool(row["environments"]) == secured and set(row["environments"] or []) <= ENVIRONMENTS,
                f"environment policy missing or unexpected: {key}")
        require(row["behavior"] in {"read_only", "mutation", "credential_read"} and row["effects"],
                f"missing operation effects: {key}")
        catalog[key] = {
            **wire, **row, "contractCheck": key, "fixtures": case_map[key],
            "wireSha256": operation_digest(spec, item, operation),
        }
    files["operations.json"] = json_bytes({"formatVersion": 1, "operations": catalog})
    manifest = {
        "formatVersion": 2,
        "openapiVersion": spec["openapi"],
        "apiVersion": spec["info"]["version"],
        "source": {"url": SOURCE_URL, "revision": f"sha256:{sha}", "verifiedOn": verified_on},
        "artifact": {"path": "openapi.yaml", "sha256": sha},
        "operationSet": {
            "identity": "HTTP method + path", "operations": len(operations),
            "paths": len(spec["paths"]),
            "withoutOperationId": sum("operationId" not in op for _, op in operations.values()),
        },
        "files": {path: digest(data) for path, data in files.items()},
    }
    files["manifest.json"] = json_bytes(manifest)
    return files, spec, (len(operations), refs, cases, exchanges, references_checked)


def verify(bundle, js_map=None):
    manifest = parse_json((bundle / "manifest.json").read_bytes())
    files, spec, counts = build(bundle, manifest["artifact"]["sha256"], manifest["source"]["verifiedOn"])
    for name, data in files.items():
        require((bundle / name).read_bytes() == data, f"packed artifact drift: {name}")
    payload_dir = bundle / "fixtures/payloads"
    actual = {str(path.relative_to(bundle)) for path in payload_dir.rglob("*") if path.is_file()}
    expected = {name for name in files if name.startswith("fixtures/payloads/")}
    require(actual == expected, "unexpected or missing fixture payload files")
    operations = parse_json(files["operations.json"])["operations"]
    if js_map:
        mappings = parse_json(js_map.read_bytes())
        require(mappings["formatVersion"] == 1 and mappings["status"] in {"proposed", "finalized"},
                "invalid JS mapping header")
        methods = mappings["methods"]
        require(set(methods) == set(operations), "JS method coverage drift")
        candidates = list(methods.values())
        require(len(set(candidates)) == len(candidates) and
                all(re.fullmatch(r"[a-z][A-Za-z0-9]*\.[a-z][A-Za-z0-9]*", name) for name in candidates),
                "invalid or duplicate JS method")
    return spec, operations, manifest, counts


def difference(old, new):
    return {
        "added": sorted(new.keys() - old.keys()), "removed": sorted(old.keys() - new.keys()),
        "changed": sorted(key for key in old.keys() & new.keys() if old[key] != new[key]),
    }


def flatten_components(spec):
    return {f"{group}/{name}": value for group, entries in spec.get("components", {}).items()
            for name, value in entries.items()}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest="command", required=True)
    check = commands.add_parser("verify", help="verify a pinned bundle with no network access")
    check.add_argument("bundle", type=Path, nargs="?", default=CONTRACT)
    check.add_argument("--js-map", type=Path)
    pack = commands.add_parser("assemble", help="stage reviewed local inputs as a new bundle")
    pack.add_argument("source", type=Path)
    pack.add_argument("destination", type=Path)
    pack.add_argument("--sha256", required=True)
    pack.add_argument("--verified-on", required=True)
    compare = commands.add_parser("compare", help="report drift between two verified local bundles")
    compare.add_argument("old", type=Path)
    compare.add_argument("new", type=Path)
    args = parser.parse_args()
    if args.command == "verify":
        js_map = args.js_map
        if js_map is None and (args.bundle / "js-methods.json").exists():
            js_map = args.bundle / "js-methods.json"
        _, _, _, counts = verify(args.bundle, js_map)
        print("Verified %d operations, %d local references, %d cases, %d exchanges and %d supply reference cases" % counts)
    elif args.command == "assemble":
        files, _, _ = build(args.source, args.sha256, args.verified_on)
        args.destination.mkdir()
        for name, data in sorted(files.items()):
            path = args.destination / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(data)
        print(f"Staged {len(files)} reviewed files in {args.destination}")
    else:
        old_spec, old, old_manifest, _ = verify(args.old)
        new_spec, new, new_manifest, _ = verify(args.new)
        report = {
            "from": old_manifest["source"]["revision"],
            "to": new_manifest["source"]["revision"],
            "operations": difference(old, new),
            "components": difference(flatten_components(old_spec), flatten_components(new_spec)),
            "bundleFiles": difference(old_manifest["files"], new_manifest["files"]),
        }
        sys.stdout.buffer.write(json_bytes(report))


if __name__ == "__main__":
    try:
        main()
    except (OSError, ValueError, KeyError, IndexError, TypeError, yaml.YAMLError) as error:
        sys.exit(f"Contract check failed: {error}")
