export type Int64Input = bigint | number;

const minInt64 = -(1n << 63n);
const maxInt64 = (1n << 63n) - 1n;

/** Convert a bigint or safe integer to an exact signed 64-bit integer. */
export function toInt64(value: Int64Input): bigint {
  if (typeof value === "number") {
    if (!Number.isSafeInteger(value)) {
      throw new RangeError("An int64 number must be a safe integer");
    }
    value = BigInt(value);
  }
  if (typeof value !== "bigint") {
    throw new TypeError("An int64 value must be a bigint or safe integer");
  }
  if (value < minInt64 || value > maxInt64) {
    throw new RangeError("Value is outside the signed int64 range");
  }
  return value;
}
