import assert from "node:assert/strict";
import { log } from "node:console";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import process from "node:process";
import { URL } from "node:url";
import openapiTS, { astToString } from "openapi-typescript";
import ts from "typescript";
import { parse } from "yaml";

const check = process.argv[2] === "--check";
const relative = (path) => new URL(path, import.meta.url);
const manifest = JSON.parse(readFileSync(relative("../contract/manifest.json"), "utf8"));
const catalog = JSON.parse(readFileSync(relative("../contract/operations.json"), "utf8")).operations;
const schemaUrl = relative("../contract/openapi.yaml");
const raw = readFileSync(schemaUrl);
assert.equal(createHash("sha256").update(raw).digest("hex"), manifest.artifact.sha256,
  "Generation requires the approved public OpenAPI digest");
const spec = parse(raw.toString("utf8"), { intAsBigInt: true });
assert.equal(spec.openapi, "3.0.3");

function resolve(ref) {
  assert(ref.startsWith("#/"), "Only local OpenAPI references are supported");
  return decodeURIComponent(ref.slice(2)).split("/").reduce((value, key) => {
    const property = key.replaceAll("~1", "/").replaceAll("~0", "~");
    assert(Object.hasOwn(value, property), `Unresolved reference ${ref}`);
    return value[property];
  }, spec);
}

function dereference(schema, seen = []) {
  if (!schema.$ref) return schema;
  assert(!seen.includes(schema.$ref), `Cyclic reference ${schema.$ref}`);
  return dereference(resolve(schema.$ref), [...seen, schema.$ref]);
}

const numericDeclarations = new Set();
function inventory(value) {
  if (!value || typeof value !== "object") return;
  if (value.$ref) resolve(value.$ref);
  if (value.type === "integer" || value.type === "number") numericDeclarations.add(value);
  for (const child of Object.values(value)) inventory(child);
}
inventory(spec);

const numericKinds = new Map([
  ["integer:int64", "int64"],
  ["integer:int32", "int32"],
  ["integer:", "integer"],
  ["number:double", "double"],
]);
const classified = new Map();
const schemas = new Map();

function mapValues(record, map) {
  return Object.fromEntries(Object.keys(record ?? {}).sort().map((key) => [key, map(record[key], key)]));
}

function numericShape(schema) {
  const kind = numericKinds.get(`${schema.type}:${schema.format ?? ""}`);
  assert(kind, `Unsupported numeric format ${schema.type}/${schema.format}`);
  assert(!schema.exclusiveMinimum && !schema.exclusiveMaximum && schema.multipleOf === undefined,
    "Review new numeric constraints before generating conversion metadata");
  const result = { kind };
  if (schema.nullable) result.nullable = true;
  for (const bound of ["minimum", "maximum"]) {
    if (schema[bound] === undefined) continue;
    if (kind === "double") assert(Number.isFinite(Number(schema[bound])));
    else assert.equal(typeof schema[bound], "bigint", "Integer bounds must be exact");
    result[bound] = String(schema[bound]);
  }
  classified.set(schema, kind);
  return result;
}

function mergeObjects(members) {
  assert(members.every(({ kind }) => kind === "object"), "Unsupported allOf conversion");
  // The pinned allOf intersections add named fields, with no typed dictionaries.
  assert(members.every(({ additional }) => !additional), "Review allOf dictionary conversion");
  const properties = new Map();
  for (const member of members) {
    for (const [key, value] of Object.entries(member.properties)) {
      if (properties.has(key)) assert.deepEqual(properties.get(key), value, `Ambiguous allOf field ${key}`);
      properties.set(key, value);
    }
  }
  return { kind: "object", properties: Object.fromEntries(properties) };
}

function shape(schema) {
  assert(schema && typeof schema === "object", "Media and parameter entries must have schemas");
  assert(!schema.not && !schema.discriminator && !schema.patternProperties,
    "Review unsupported schema keywords");
  if (schema.$ref) {
    if (!schemas.has(schema.$ref)) {
      schemas.set(schema.$ref, null);
      schemas.set(schema.$ref, shape(dereference(schema)));
    }
    return { kind: "ref", name: schema.$ref };
  }
  if (schema.allOf || schema.anyOf || schema.oneOf) {
    assert.equal([schema.allOf, schema.anyOf, schema.oneOf].filter(Boolean).length, 1);
    assert(!schema.type && !schema.properties && !schema.items && !schema.additionalProperties,
      "Review mixed composition and structural conversion");
    const members = (schema.allOf ?? schema.anyOf ?? schema.oneOf).map((item) => shape(dereference(item)));
    const [first] = members;
    assert(first, "Empty schema composition");
    if (members.every((member) => JSON.stringify(member) === JSON.stringify(first))) return first;
    assert(schema.allOf, "Ambiguous union numeric conversion");
    return mergeObjects(members);
  }
  if (schema.type === "integer" || schema.type === "number") return numericShape(schema);
  if (schema.type === "array") return { kind: "array", items: shape(schema.items) };
  if (schema.type === "object" || schema.properties || schema.additionalProperties) {
    const result = { kind: "object", properties: mapValues(schema.properties, shape) };
    if (typeof schema.additionalProperties === "object") result.additional = shape(schema.additionalProperties);
    return result;
  }
  assert(schema.type === undefined || ["boolean", "string"].includes(schema.type), `Unsupported schema type ${schema.type}`);
  if (schema.format === "binary") return { kind: "bytes" };
  return { kind: schema.type ?? "unknown" };
}

const jsonMedia = (media) => media.split(";", 1)[0] === "application/json";
function mediaShapes(content) {
  return mapValues(content, ({ schema }, media) => {
    const result = shape(schema);
    return jsonMedia(media) && dereference(schema).format !== "binary" ? result : { kind: "bytes" };
  });
}

const operations = Object.fromEntries(Object.keys(catalog).sort().map((identity) => {
  const [method, path] = identity.split(" ");
  const item = spec.paths[path];
  const operation = item[method.toLowerCase()];
  const entry = catalog[identity];
  const body = dereference(operation.requestBody ?? {});
  const parameters = Object.fromEntries(
    [...(item.parameters ?? []), ...(operation.parameters ?? [])].map(dereferenceParameter),
  );
  function dereferenceParameter(value) {
    const parameter = dereference(value);
    assert(parameter.schema && !parameter.content, "Review parameter content before generation");
    return [`${parameter.in}:${parameter.name}`, {
      schema: shape(parameter.schema), required: parameter.required === true,
    }];
  }
  assert.deepEqual(Object.keys(parameters).sort(), Object.keys(entry.request.parameters).sort());
  const requiredParameters = Object.keys(parameters).sort().filter((key) => parameters[key].required);
  assert.deepEqual(requiredParameters, Object.keys(entry.request.parameters).sort()
    .filter((key) => entry.request.parameters[key].required));
  assert(["anonymous", "api_key", "claim_token"].includes(entry.authentication));
  assert.equal(body.required === true, entry.request.bodyRequired);
  const responses = mapValues(operation.responses, (value, status) => {
    const response = dereference(value);
    const content = mediaShapes(response.content);
    assert.deepEqual(Object.keys(content), Object.keys(catalog[identity].responses[status].media).sort());
    for (const [media, wire] of Object.entries(content)) {
      assert.equal(wire.kind === "bytes" ? "bytes" : "json", catalog[identity].responses[status].media[media]);
    }
    const headers = mapValues(response.headers, (header) => shape(dereference(header).schema));
    return { content, headers };
  });
  return [identity, {
    authentication: entry.authentication,
    behavior: entry.behavior,
    contextAssertion: entry.contextAssertion,
    scopes: entry.scopes,
    environments: entry.environments,
    retryClass: entry.retryClass,
    bodyRequired: entry.request.bodyRequired,
    requiredParameters,
    request: mediaShapes(body.content),
    parameters: mapValues(parameters, (parameter) => parameter.schema),
    responses,
  }];
}));

// Cover declarations even when they are not used by an operation in this projection.
for (const component of Object.values(spec.components.schemas)) shape(component);
for (const parameter of Object.values(spec.components.parameters ?? {})) shape(dereference(parameter).schema);
for (const header of Object.values(spec.components.headers ?? {})) shape(dereference(header).schema);
for (const body of Object.values(spec.components.requestBodies ?? {})) mediaShapes(dereference(body).content);
for (const response of Object.values(spec.components.responses ?? {})) {
  mediaShapes(dereference(response).content);
  for (const header of Object.values(dereference(response).headers ?? {})) shape(dereference(header).schema);
}
assert.deepEqual(new Set(classified.keys()), numericDeclarations, "Numeric declaration without a conversion mapping");

const operationsAst = await openapiTS(schemaUrl, {
  alphabetize: true,
  transform(schema) {
    if (schema.type !== "integer" || schema.format !== "int64") return;
    const bigint = ts.factory.createKeywordTypeNode(ts.SyntaxKind.BigIntKeyword);
    return schema.nullable
      ? ts.factory.createUnionTypeNode([bigint, ts.factory.createLiteralTypeNode(ts.factory.createNull())])
      : bigint;
  },
});
const paths = operationsAst.find((node) => ts.isInterfaceDeclaration(node) && node.name.text === "paths");
const generatedOperations = paths.members.flatMap((path) => path.type.members
  .filter((method) => /^(get|put|post|delete|options|head|patch|trace)$/.test(method.name.text) &&
    method.type.kind !== ts.SyntaxKind.NeverKeyword)
  .map((method) => `${method.name.text.toUpperCase()} ${path.name.text}`));
assert.deepEqual(generatedOperations.sort(), Object.keys(operations));

const wireSchemas = Object.fromEntries([...schemas.keys()].sort().map((key) => [key, schemas.get(key)]));
const banner = "// Generated from the pinned public OpenAPI. Run npm run generate.\n";
const counts = Object.fromEntries([...numericKinds.values()].map((kind) =>
  [kind, [...classified.values()].filter((value) => value === kind).length]));
const mapping = JSON.parse(readFileSync(relative("../contract/js-methods.json"), "utf8"));
assert.equal(mapping.formatVersion, 1);
assert.equal(mapping.status, "finalized");
assert.deepEqual(Object.keys(mapping.methods).sort(), generatedOperations);
assert.equal(new Set(Object.values(mapping.methods)).size, generatedOperations.length);

const groups = new Map();
for (const operation of generatedOperations) {
  const [method, path] = operation.split(" ");
  const name = mapping.methods[operation];
  assert(/^[a-z][A-Za-z0-9]*\.[a-z][A-Za-z0-9]*$/u.test(name));
  const [group, member] = name.split(".");
  const success = Object.entries(catalog[operation].responses).filter(([status]) => /^2\d{2}$/u.test(status));
  assert(success.length > 0, `Missing documented success response for ${operation}`);
  const bytes = success.flatMap(([status, response]) => Object.entries(response.media)
    .filter(([, mode]) => mode === "bytes").map(([media]) => JSON.stringify(`${status} ${media}`)));
  const params = [JSON.stringify(path), JSON.stringify(method.toLowerCase()), ...bytes.length ? [bytes.join(" | ")] : []].join(", ");
  const summary = spec.paths[path][method.toLowerCase()].summary?.replaceAll("*/", "* /").replace(/\s+/gu, " ");
  const entries = groups.get(group) ?? [];
  entries.push({ member, params, operation, summary });
  groups.set(group, entries);
}
const orderedGroups = [...groups.keys()].sort().map((group) => [group, groups.get(group)
  .sort((a, b) => a.member < b.member ? -1 : a.member > b.member ? 1 : 0)]);
const moduleTypes = orderedGroups.map(([group, entries]) => [
  `  readonly ${group}: {`,
  ...entries.flatMap(({ member, params, summary }) => [
    ...(summary ? [`    /** ${summary} */`] : []),
    `    readonly ${member}: CoreMethod<${params}>;`,
  ]),
  "  };",
].join("\n")).join("\n");
const moduleBindings = orderedGroups.map(([group, entries]) => [
  `    ${group}: Object.freeze({`,
  ...entries.map(({ member, params, operation }) =>
    `      ${member}: bindOperation<${params}>(dispatch, ${JSON.stringify(operation)}),`),
  "    }),",
].join("\n")).join("\n");
const files = {
  "operations.ts": banner + astToString(operationsAst),
  "wire.ts": banner + 'import type { OperationShape, WireShape } from "../wire-schema.js";\n\n' +
    `export const operations: Readonly<Record<string, OperationShape>> = ${JSON.stringify(operations, null, 2)};\n\n` +
    `export const schemas: Readonly<Record<string, WireShape>> = ${JSON.stringify(wireSchemas, null, 2)};\n`,
  "api-modules.ts": banner + '// Public names come from contract/js-methods.json.\n' +
    'import { bindOperation } from "../core-api.js";\n' +
    'import type { CoreDispatch, CoreMethod } from "../core-api.js";\n\n' +
    `export interface ApiModules {\n${moduleTypes}\n}\n\n` +
    `export function createApiModules(dispatch: CoreDispatch): ApiModules {\n  return {\n${moduleBindings}\n  };\n}\n`,
};
for (const [name, contents] of Object.entries(files)) {
  const path = relative(`../src/generated/${name}`);
  if (check) assert.equal(readFileSync(path, "utf8"), contents, `Stale ${name}. Run npm run generate.`);
  else writeFileSync(path, contents);
}
log(`Mapped ${generatedOperations.length} operations and ${classified.size} numeric declarations (${JSON.stringify(counts)})`);
