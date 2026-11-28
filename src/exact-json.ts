import { operations, schemas } from "./generated/wire.js";
import { toInt64 } from "./int64.js";
import type { NumericShape, WireShape } from "./wire-schema.js";

interface NativeJson {
  parse(text: string, reviver: (key: string, value: unknown, context?: { source?: string }) => unknown): unknown;
  rawJSON(text: string): object;
  isRawJSON(value: unknown): boolean;
}
const nativeJson = JSON as unknown as NativeJson;
const integerToken = /^-?(0|[1-9][0-9]*)$/;
const unknownShape: WireShape = { kind: "unknown" };

class NumberToken {
  constructor(readonly value: number, readonly source: string) {}
}

function resolved(shape: WireShape): Exclude<WireShape, { kind: "ref" }> {
  while (shape.kind === "ref") {
    const target = schemas[shape.name];
    if (!target) throw new TypeError("Missing local wire schema");
    shape = target;
  }
  return shape;
}

function lookup<T>(record: Readonly<Record<string, T>> | undefined, key: string): T | undefined {
  return record && Object.hasOwn(record, key) ? record[key] : undefined;
}

function structuredJson(shape: WireShape | undefined): WireShape {
  if (!shape || resolved(shape).kind === "bytes") {
    throw new TypeError("Operation does not define structured JSON for this media type and status");
  }
  return shape;
}

function requestShape(operation: string, media: string): WireShape {
  return structuredJson(lookup(lookup(operations, operation)?.request, media));
}

function responseShape(operation: string, status: number, media: string): WireShape {
  const response = lookup(lookup(operations, operation)?.responses, String(status));
  return structuredJson(lookup(response?.content, media));
}

function isNumeric(shape: WireShape): shape is NumericShape {
  return shape.kind === "int64" || shape.kind === "int32" || shape.kind === "integer" || shape.kind === "double";
}

function checkedNumber(value: unknown, shape: NumericShape): number | bigint | null {
  if (value === null && shape.nullable) return null;
  if (shape.kind === "int64") {
    if (typeof value !== "number" && typeof value !== "bigint") throw new TypeError("Expected an int64 value");
    const exact = toInt64(value);
    if ((shape.minimum !== undefined && exact < BigInt(shape.minimum)) ||
        (shape.maximum !== undefined && exact > BigInt(shape.maximum))) {
      throw new RangeError("Value is outside the declared int64 bounds");
    }
    return exact;
  }

  if (typeof value !== "number" || !Number.isFinite(value)) throw new TypeError("Expected a finite JSON number");
  if (shape.kind !== "double" && !Number.isSafeInteger(value)) throw new RangeError("Expected a safe integer");
  if (shape.kind === "int32" && (value < -(2 ** 31) || value > 2 ** 31 - 1)) {
    throw new RangeError("Value is outside the signed int32 range");
  }
  const comparable = shape.kind === "double" ? value : BigInt(value);
  const bound = shape.kind === "double" ? Number : BigInt;
  if ((shape.minimum !== undefined && comparable < bound(shape.minimum)) ||
      (shape.maximum !== undefined && comparable > bound(shape.maximum))) {
    throw new RangeError("Value is outside the declared numeric bounds");
  }
  return value;
}

function checkNativeJson(): void {
  if (typeof nativeJson.rawJSON !== "function" || typeof nativeJson.isRawJSON !== "function") {
    throw new Error("This Node runtime does not support exact JSON");
  }
}

function decodeValue(value: unknown, schema: WireShape): unknown {
  const shape = resolved(schema);
  if (isNumeric(shape)) {
    if (value === null && shape.nullable) return null;
    if (!(value instanceof NumberToken)) throw new TypeError("Expected a JSON number at a declared numeric field");
    if (shape.kind !== "double" && !integerToken.test(value.source)) throw new TypeError("Expected an integer JSON token");
    if (shape.kind === "int64") {
      // The longest in-range token has 19 digits and a leading minus sign.
      if (value.source.length > 20) throw new RangeError("Value is outside the signed int64 range");
      return checkedNumber(BigInt(value.source), shape);
    }
    return checkedNumber(value.value, shape);
  }
  if (value === null) return null;
  if (shape.kind === "bytes") throw new TypeError("Attachments must retain their original bytes");
  if (shape.kind === "string" || shape.kind === "boolean") {
    if (typeof value !== shape.kind) throw new TypeError("Unexpected JSON scalar type");
    return value;
  }
  if (value instanceof NumberToken) {
    if (shape.kind !== "unknown") throw new TypeError("Unexpected JSON number");
    // Unknown numbers outside the exact safe integer representation stay opaque.
    return Number.isSafeInteger(value.value) && value.source === String(value.value)
      ? value.value
      : nativeJson.rawJSON(value.source);
  }
  if (Array.isArray(value)) {
    if (shape.kind !== "array" && shape.kind !== "unknown") throw new TypeError("Unexpected JSON array");
    const itemShape = shape.kind === "array" ? shape.items : unknownShape;
    return value.map((item: unknown) => decodeValue(item, itemShape));
  }
  if (value && typeof value === "object") {
    if (shape.kind !== "object" && shape.kind !== "unknown") throw new TypeError("Unexpected JSON object");
    return Object.fromEntries(Object.entries(value).map(([key, child]: [string, unknown]) =>
      [key, decodeValue(child, propertyShape(shape, key))]));
  }
  if (shape.kind !== "unknown") throw new TypeError("Unexpected JSON scalar");
  return value;
}

function propertyShape(shape: WireShape, key: string): WireShape {
  return shape.kind === "object"
    ? lookup(shape.properties, key) ?? shape.additional ?? unknownShape
    : unknownShape;
}

function encodeValue(value: unknown, schema: WireShape, ancestors: Set<object>): unknown {
  const shape = resolved(schema);
  if (isNumeric(shape)) {
    const checked = checkedNumber(value, shape);
    return typeof checked === "bigint" ? nativeJson.rawJSON(checked.toString()) : checked;
  }
  if (value === null) return null;
  if (shape.kind === "bytes") throw new TypeError("Attachments must retain their original bytes");
  if (typeof value === "string" || typeof value === "boolean") {
    if (shape.kind !== "unknown" && typeof value !== shape.kind) throw new TypeError("Unexpected JSON scalar type");
    return value;
  }
  if (typeof value === "number" && shape.kind === "unknown") {
    if (!Number.isFinite(value) || (Number.isInteger(value) && !Number.isSafeInteger(value))) {
      throw new RangeError("Unsafe number at an undeclared numeric field");
    }
    return value;
  }
  if (!value || typeof value !== "object" || nativeJson.isRawJSON(value)) {
    throw new TypeError("Unsupported JSON input value");
  }
  if (ancestors.has(value)) throw new TypeError("Circular JSON input");
  ancestors.add(value);
  try {
    if (Array.isArray(value)) {
      if (shape.kind !== "array" && shape.kind !== "unknown") throw new TypeError("Unexpected JSON array");
      const itemShape = shape.kind === "array" ? shape.items : unknownShape;
      return Array.from(value, (item: unknown) => encodeValue(item, itemShape, ancestors));
    }
    if (shape.kind !== "object" && shape.kind !== "unknown") throw new TypeError("Unexpected JSON object");
    const prototype: unknown = Object.getPrototypeOf(value);
    if (prototype !== null && prototype !== Object.prototype) throw new TypeError("Expected a plain JSON object");

    // A null-prototype copy treats field names as data and never invokes a toJSON method.
    const encoded: Record<string, unknown> = Object.create(null);
    for (const [key, child] of Object.entries(value) as [string, unknown][]) {
      if (child !== undefined) encoded[key] = encodeValue(child, propertyShape(shape, key), ancestors);
    }
    return encoded;
  } finally {
    ancestors.delete(value);
  }
}

export function decodeJson(text: string, schema: WireShape): unknown {
  checkNativeJson();
  const tokens = nativeJson.parse(text, (_key, value, context) => {
    if (typeof value !== "number") return value;
    if (typeof context?.source !== "string") throw new Error("This Node runtime does not expose exact JSON tokens");
    return new NumberToken(value, context.source);
  });
  return decodeValue(tokens, schema);
}

export function encodeJson(value: unknown, schema: WireShape): string {
  checkNativeJson();
  return JSON.stringify(encodeValue(value, schema, new Set()));
}

export function decodeRequestJson(operation: string, media: string, text: string): unknown {
  return decodeJson(text, requestShape(operation, media));
}

export function encodeRequestJson(operation: string, media: string, value: unknown): string {
  return encodeJson(value, requestShape(operation, media));
}

export function decodeResponseJson(operation: string, status: number, media: string, text: string): unknown {
  return decodeJson(text, responseShape(operation, status, media));
}
