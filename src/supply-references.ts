const goSpace = "[\\t\\n\\v\\f\\r \\u0085\\u00a0\\u1680\\u2000-\\u200a\\u2028\\u2029\\u202f\\u205f\\u3000]";
const outerSpace = new RegExp(`^${goSpace}+|${goSpace}+$`, "gu");
const utf8 = new TextEncoder();
const maxReferenceBytes = 160;

function plainRecord(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== "object") return false;
  const prototype: unknown = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function normalizeReference(value: unknown, required: boolean): string | undefined {
  if (!required && (value === null || value === undefined)) return undefined;
  // Under the Unicode flag a valid surrogate pair is matched as one scalar, outside this range.
  if (typeof value !== "string" || value.includes("\0") || /[\uD800-\uDFFF]/u.test(value)) {
    throw new TypeError("Invalid supply reference");
  }
  const normalized = value.replace(outerSpace, "");
  if ((!normalized && required) || utf8.encode(normalized).byteLength > maxReferenceBytes) {
    throw new TypeError("Invalid supply reference");
  }
  return normalized || undefined;
}

export function normalizeSupplyReferences(body: unknown): unknown {
  if (!plainRecord(body)) throw new TypeError("Invalid supply input");
  const snapshot = { ...body };
  if (!plainRecord(snapshot.event)) throw new TypeError("Invalid supply event");
  const event = { ...snapshot.event };
  event.external_order_id = normalizeReference(event.external_order_id, true);
  event.external_line_id = normalizeReference(event.external_line_id, true);

  const correction = event.event_type === "refund" || event.event_type === "cancellation" ||
    event.event_type === "credit_note" || event.event_type === "adjustment";
  const externalEventId = normalizeReference(event.external_event_id, correction);
  if (externalEventId === undefined) delete event.external_event_id;
  else {
    if (event.event_type === "sale") throw new TypeError("An external event reference belongs to a correction");
    event.external_event_id = externalEventId;
  }

  return { ...snapshot, event };
}
