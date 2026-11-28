import type { components, paths } from "../src/generated/operations.js";
import type { Int64Input } from "../src/index.js";

type Equal<Left, Right> =
  (<T>() => T extends Left ? 1 : 2) extends (<T>() => T extends Right ? 1 : 2) ? true : false;
type Expect<T extends true> = T;
type Supply = paths["/v1/supplies"]["post"]["requestBody"]["content"]["application/json"];
type Receipt = paths["/v1/supplies"]["post"]["responses"][201]["content"]["application/json"];
type Sme = components["schemas"]["SmeEligibilityResponse"];

export type WireRepresentations = [
  Expect<Equal<Supply["event"]["event_version"], bigint>>,
  Expect<Equal<Supply["event"]["source_vat_amount_minor"], bigint | undefined>>,
  Expect<Equal<Receipt["event_version"], string>>,
  Expect<Equal<Sme["ecb_rate_eur"], number | null | undefined>>,
  Expect<Equal<Int64Input, number | bigint>>,
  Expect<Equal<keyof paths["/v1/information/customer-vat/events"]["get"]["responses"] extends never ? false : true, true>>,
];
