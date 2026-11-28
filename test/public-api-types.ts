import type { ApiInput, ApiMethodName, ApiResult, Int64Input, VatClient } from "../src/index.js";

type Equal<L, R> = (<T>() => T extends L ? 1 : 2) extends (<T>() => T extends R ? 1 : 2) ? true : false;
type Check<T extends true> = T;

type Calculation = ApiResult<"vat.calculateAndPersist">;
type Receipt = ApiResult<"supplies.commit">;
type Claim = ApiResult<"auth.claimAgentApiKey">;
type Sme = ApiResult<"sme.checkEligibility">;

export type PublicDeclarations = [
  Check<Equal<ApiInput<"vat.calculateAndPersist">["body"]["gross_amount_minor"], Int64Input>>,
  Check<Equal<ApiInput<"supplies.commit">["body"]["event"]["event_version"], Int64Input>>,
  Check<Equal<ApiInput<"supplies.commit">["body"]["source_profile_id"], string>>,
  Check<Equal<ApiInput<"sources.update">["path"]["id"], Int64Input>>,
  Check<Equal<Calculation["data"]["gross_amount_minor"], bigint>>,
  Check<Equal<Receipt["data"]["event_version"], string>>,
  Check<Equal<Receipt["metadata"]["status"], 200 | 201>>,
  Check<Equal<Claim["data"]["api_key"], string>>,
  Check<Equal<Sme["data"]["ecb_rate_eur"], number | null | undefined>>,
  Check<Equal<ApiResult<"reports.downloadLockedUnionOssExport">["data"], Uint8Array>>,
  Check<Equal<ApiResult<"transactions.export">["kind"], "bytes">>,
  Check<Equal<ApiResult<"reports.exportUnionOssQuarterlySummary">["kind"], "bytes" | "json">>,
  Check<Equal<ApiResult<"auth.startAgentRegistration">["metadata"]["status"], 202>>,
  Check<Equal<NonNullable<ApiInput<"customerVat.listEvents">["query"]>["pending_only"], boolean | undefined>>,
];

// These assignments compile only when module methods, required groups and wire field labels agree.
export function callingConventions(client: VatClient) {
  client.system.health();
  client.system.ready({ deadlineMs: 1000 });
  client.customerVat.listEvents({ query: { pending_only: false } });
  client.classification.lookupCode({ path: { scheme: "cn", code: "49030000" } });
  client.reports.getFilingPrepWorkspace({ query: { period: "2026-Q1" } });
  client.vat.calculateAndPersist({
    body: { country: "DE", currency: "EUR", tax_class_id: "standard", gross_amount_minor: 10n, price_includes_vat: false },
    headers: { "Idempotency-Key": "fixture-id", "X-Source-ID": "fixture-source" },
  });
  client.sme.checkEligibility({ body: { country: "PL", currency: "PLN", annual_turnover_nac: 10 } });

  // @ts-expect-error Request body required for persisted calculation.
  client.vat.calculateAndPersist();
  // @ts-expect-error Locked exports require an export ID.
  client.reports.downloadLockedUnionOssExport({});
  // @ts-expect-error An anonymous liveness call has no operation headers.
  client.system.health({ headers: { "X-API-Key": "fixture" } });
  // @ts-expect-error Required start and end dates cannot be omitted.
  client.transactions.export({ query: { from: "2026-01-02" } });
  // @ts-expect-error Unsupported parameter name should not typecheck.
  client.customerVat.listEvents({ query: { unmapped_filter: true } });
  // @ts-expect-error A response field's decimal string representation differs from an int64 input.
  client.vat.calculateAndPersist({ body: { country: "DE", currency: "EUR", tax_class_id: "standard", gross_amount_minor: "10", price_includes_vat: true } });
  // @ts-expect-error An explicit undefined is distinct from omission on exact optional fields.
  client.customerVat.listEvents({ query: { pending_only: undefined } });
}

export type NamedResults = { [Name in ApiMethodName]: ApiResult<Name>["metadata"]["status"] };
