import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { URL } from "node:url";
import { decodeJson, decodeRequestJson, decodeResponseJson, encodeJson, encodeRequestJson } from "../dist/exact-json.js";
import { operations, schemas } from "../dist/generated/wire.js";
import { toInt64 } from "../dist/index.js";

const fixtures = JSON.parse(readFileSync(new URL("../contract/fixtures/cases.json", import.meta.url), "utf8"));
const json = "application/json";
const min = -(1n << 63n);
const max = (1n << 63n) - 1n;
const i64 = { kind: "int64" };

function pointer(value, path) {
  return path.split("/").slice(1).reduce((parent, segment) => {
    const key = segment.replaceAll("~1", "/").replaceAll("~0", "~");
    if (parent === null || parent === undefined || !Object.hasOwn(parent, key)) throw new ReferenceError();
    return parent[key];
  }, value);
}

test("signed int64 public input, decoded boundaries and exact JSON tokens", () => {
  for (const exact of [min, max, -9007199254740993n, 9007199254740993n, 0n]) {
    assert.equal(toInt64(exact), exact);
    assert.equal(decodeJson(exact.toString(), i64), exact);
    assert.equal(encodeJson(exact, i64), exact.toString());
  }
  assert.equal(toInt64(Number.MAX_SAFE_INTEGER), 9007199254740991n);
  for (const invalid of [Number.MAX_SAFE_INTEGER + 1, Number.MIN_SAFE_INTEGER - 1, 0.1, NaN, Infinity, min - 1n, max + 1n]) {
    assert.throws(() => toInt64(invalid), RangeError);
    assert.throws(() => encodeJson(invalid, i64), RangeError);
  }
  for (const invalid of [String(min - 1n), String(max + 1n), "1".repeat(80)]) {
    assert.throws(() => decodeJson(invalid, i64), RangeError);
  }
  for (const invalid of ["null", "1e0", "1.0", "1.0000000000000000001", '"1"']) {
    assert.throws(() => decodeJson(invalid, i64), TypeError);
  }
  assert.equal(decodeJson("null", { ...i64, nullable: true }), null);
  assert.equal(encodeJson(null, { ...i64, nullable: true }), "null");
  assert.throws(() => encodeJson("9007199254740993", i64), TypeError);
});

test("unknown additive data retains unsafe and fractional numeric tokens", () => {
  const shape = {
    kind: "object", properties: { result: { kind: "string" }, known: i64 },
  };
  const value = decodeJson(
    '{"result":"future-status","known":1,"extra":{"large":9223372036854775808,"decimal":0.123456789012345678901,"normal":42},"__proto__":{"example":true},"constructor":false}',
    shape,
  );
  assert.equal(value.result, "future-status");
  assert.equal(value.known, 1n);
  assert.equal(value.extra.normal, 42);
  assert.equal(JSON.isRawJSON(value.extra.large), true);
  assert.equal(JSON.isRawJSON(value.extra.decimal), true);
  assert.equal(JSON.stringify(value.extra), '{"large":9223372036854775808,"decimal":0.123456789012345678901,"normal":42}');
  assert.equal(Object.getPrototypeOf(value), Object.prototype);
  assert.equal(Object.hasOwn(value, "__proto__"), true);
  assert.deepEqual(value.__proto__, { example: true });
  assert.equal(value.constructor, false);
  assert.equal(Object.prototype.example, undefined);
});

test("serialization keeps omission, null and false and rejects unsupported inputs", () => {
  const shape = { kind: "object", properties: { count: i64, enabled: { kind: "boolean" } } };
  const raw = JSON.rawJSON;
  const parse = JSON.parse;
  const stringify = JSON.stringify;
  const bigintToJSON = BigInt.prototype.toJSON;
  assert.equal(
    encodeJson({ count: 3, enabled: false, option: null, absent: undefined }, shape),
    '{"count":3,"enabled":false,"option":null}',
  );
  for (const invalid of [
    () => encodeJson({ extra: Number.MAX_SAFE_INTEGER + 1 }, shape),
    () => encodeJson({ extra: 1n }, shape),
    () => encodeJson({ count: JSON.rawJSON("1") }, shape),
    () => encodeJson({ count: 1n, toJSON() { assert.fail("toJSON must not run"); } }, shape),
    () => encodeJson({ extra: new Date() }, shape),
  ]) assert.throws(invalid);
  const cyclic = {};
  cyclic.member = cyclic;
  assert.throws(() => encodeJson(cyclic, shape), /Circular/);
  const prototypeKey = JSON.parse('{"__proto__":{"safe":true}}');
  assert.equal(encodeJson(prototypeKey, shape), '{"__proto__":{"safe":true}}');
  assert.equal(JSON.rawJSON, raw);
  assert.equal(JSON.parse, parse);
  assert.equal(JSON.stringify, stringify);
  assert.equal(BigInt.prototype.toJSON, bigintToJSON);
});

test("undeclared status or media cannot fall back to a numeric schema", () => {
  const op = "POST /v1/supplies";
  assert.throws(() => decodeResponseJson(op, 299, json, "{}"), /does not define structured JSON/);
  assert.throws(() => decodeRequestJson(op, "text/plain", "{}"), /does not define structured JSON/);
  assert.throws(() => decodeRequestJson("__proto__", json, "{}"), /does not define structured JSON/);
});

test("typed dictionaries, arrays and composed schemas retain the intended representations", () => {
  const operation = "POST /v1/information/vat/calculate";
  const result = decodeResponseJson(operation, 200, json,
    '{"options":[{"source_ordinal":1}],"calculation":{"declared_attributes":{"count":"010"},"rate_bps":1900}}');
  assert.equal(result.options[0].source_ordinal, 1);
  assert.equal(result.calculation.rate_bps, 1900);
  assert.equal(result.calculation.declared_attributes.count, "010");
  assert.throws(() => decodeResponseJson(operation, 200, json,
    '{"calculation":{"declared_attributes":{"count":1}}}'), TypeError);
  assert.throws(() => decodeResponseJson(operation, 200, json,
    '{"options":[{"source_ordinal":9007199254740992}]}'), RangeError);
});

test("the generated graph exercises every reachable numeric shape and parameter or header", () => {
  const counts = { integer: 0, int32: 0, int64: 0, double: 0 };
  const visited = new Set();
  function visit(shape) {
    if (visited.has(shape)) return;
    visited.add(shape);
    switch (shape.kind) {
      case "ref":
        visit(schemas[shape.name]);
        break;
      case "object":
        for (const child of Object.values(shape.properties)) visit(child);
        if (shape.additional) visit(shape.additional);
        break;
      case "array":
        visit(shape.items);
        break;
      case "int64":
      case "int32":
      case "integer":
      case "double": {
        counts[shape.kind]++;
        const token = shape.minimum !== undefined && Number(shape.minimum) > 0 ? shape.minimum
          : shape.maximum !== undefined && Number(shape.maximum) < 0 ? shape.maximum : "0";
        const expected = shape.kind === "int64" ? BigInt(token) : Number(token);
        assert.equal(decodeJson(token, shape), expected);
        assert.equal(encodeJson(expected, shape), token);
        if (shape.nullable) assert.equal(decodeJson("null", shape), null);
        assert.throws(() => decodeJson('"0"', shape), TypeError);
        if (shape.kind === "int32") assert.throws(() => decodeJson("2147483648", shape), RangeError);
        if (shape.kind === "integer") assert.throws(() => decodeJson("9007199254740993", shape), RangeError);
        if (shape.kind === "double") assert.throws(() => decodeJson("1e400", shape), TypeError);
        if (shape.minimum !== undefined && shape.kind === "int64") {
          assert.throws(() => encodeJson(BigInt(shape.minimum) - 1n, shape), RangeError);
        }
      }
    }
  }
  assert.equal(Object.keys(operations).length, 55);
  for (const operation of Object.values(operations)) {
    for (const shape of Object.values(operation.parameters)) visit(shape);
    for (const shape of Object.values(operation.request)) visit(shape);
    for (const { content, headers } of Object.values(operation.responses)) {
      for (const shape of Object.values(content)) visit(shape);
      for (const shape of Object.values(headers)) visit(shape);
    }
  }
  for (const kind of Object.keys(counts)) assert(counts[kind] > 0, kind);
});

for (const fixture of fixtures.cases) {
  test(`corpus: ${fixture.id}`, () => {
    const documents = fixture.exchanges.map((exchange, step) => {
      const { request, response } = exchange;
      if (request.body && fixture.id === "int64-overflow") {
        assert.throws(() => decodeRequestJson(fixture.operation, request.media, request.body), RangeError);
        return { exchange, request: null, response: decodeResponseJson(fixture.operation, response.status, response.media, response.body) };
      }
      let decodedRequest;
      let decodedResponse;
      if (request.body) {
        decodedRequest = decodeRequestJson(fixture.operation, request.media, request.body);
        const roundTrip = encodeRequestJson(fixture.operation, request.media, decodedRequest);
        assert.deepEqual(decodeRequestJson(fixture.operation, request.media, roundTrip), decodedRequest);
        for (const item of fixture.assertions ?? []) {
          if (item.message === "request" && item.decimalDigits && !item.absent &&
              (item.step ?? 0) === step) {
            assert.equal(pointer(JSON.parse(roundTrip, (_key, value, context) =>
              typeof value === "number" ? context.source : value), item.pointer), item.decimalDigits);
          }
        }
      }
      if (response.body) {
        decodedResponse = decodeResponseJson(fixture.operation, response.status, response.media, response.body);
      }
      if (response.bodyFile) {
        const bytes = readFileSync(new URL(`../contract/${response.bodyFile}`, import.meta.url));
        assert.equal(createHash("sha256").update(bytes).digest("hex"), response.sha256);
        assert.throws(() => decodeResponseJson(fixture.operation, response.status, response.media, bytes.toString()),
          /does not define structured JSON/);
      }
      return { exchange, request: decodedRequest, response: decodedResponse };
    });
    for (const assertion of fixture.assertions ?? []) {
      const doc = documents[assertion.step ?? 0][assertion.message];
      if (doc === null && fixture.id === "int64-overflow") continue;
      if (assertion.absent) {
        assert.throws(() => pointer(doc, assertion.pointer), ReferenceError);
        continue;
      }
      const value = pointer(doc, assertion.pointer);
      if (assertion.jsonType === "null") assert.equal(value, null);
      else if (assertion.jsonType) assert.equal(typeof value, assertion.jsonType === "int64" ? "bigint" : assertion.jsonType);
      if (assertion.decimalDigits) assert.equal(String(value), assertion.decimalDigits);
      if (Object.hasOwn(assertion, "equals")) {
        assert.equal(value, typeof value === "bigint" ? BigInt(assertion.equals) : assertion.equals);
      }
      if (assertion.sameAsStep !== undefined) {
        assert.deepEqual(value, pointer(documents[assertion.sameAsStep][assertion.message], assertion.pointer));
      }
    }
  });
}
