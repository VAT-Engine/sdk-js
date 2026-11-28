// Generated from the pinned public OpenAPI. Run npm run generate.
// Public names come from contract/js-methods.json.
import { bindOperation } from "../core-api.js";
import type { CoreDispatch, CoreMethod } from "../core-api.js";

export interface ApiModules {
  readonly auth: {
    /** Retrieve a sandbox agent key after approval */
    readonly claimAgentApiKey: CoreMethod<"/agent/auth/claim", "post">;
    /** Verify the authenticated API key's account and data environment */
    readonly getContext: CoreMethod<"/v1/auth/context", "get">;
    /** Request approval for a sandbox agent key */
    readonly startAgentRegistration: CoreMethod<"/agent/auth", "post">;
  };
  readonly classification: {
    /** Look up an exact CN or CPA code in official source data */
    readonly lookupCode: CoreMethod<"/v1/classification-codes/{scheme}/{code}", "get">;
  };
  readonly compliance: {
    /** Threshold Check */
    readonly checkThreshold: CoreMethod<"/v1/vat/threshold-check", "post">;
    /** Compliance Threshold Status */
    readonly getThresholdStatus: CoreMethod<"/v1/compliance/threshold-status", "get">;
    /** List VAT Thresholds */
    readonly listVatThresholds: CoreMethod<"/v1/vat/thresholds", "get">;
  };
  readonly customerVat: {
    /** Declare an informational product classification */
    readonly declareClassification: CoreMethod<"/v1/information/customer-vat/classification", "post">;
    /** Inspect account-wide annual Article 59c turnover */
    readonly getArticle59cTurnover: CoreMethod<"/v1/information/customer-vat/article59c", "get">;
    /** Count unresolved current customer VAT imports */
    readonly getAttention: CoreMethod<"/v1/information/customer-vat/attention", "get">;
    /** Inspect or export an informational IOSS month preview */
    readonly getIossPreview: CoreMethod<"/v1/information/customer-vat/ioss", "get", "200 text/csv">;
    /** Inspect or export operational Union OSS calculations */
    readonly getOssPreview: CoreMethod<"/v1/information/customer-vat/oss", "get", "200 text/csv">;
    /** List customer operational VAT results */
    readonly listEvents: CoreMethod<"/v1/information/customer-vat/events", "get">;
    /** List current customer product VAT choices */
    readonly listRules: CoreMethod<"/v1/information/customer-vat/rules", "get">;
    /** Reprocess an unlocked customer transaction */
    readonly reprocess: CoreMethod<"/v1/information/customer-vat/reprocess", "post">;
    /** Retire a customer-owned product rule */
    readonly retireRule: CoreMethod<"/v1/information/customer-vat/retire", "post">;
    /** Save customer OSS establishment and coverage declarations */
    readonly saveOssContext: CoreMethod<"/v1/information/customer-vat/oss-context", "post">;
    /** Save an explicit provisional VAT rate for an owned unclassified sale */
    readonly saveProvisionalRate: CoreMethod<"/v1/information/customer-vat/provisional-rate", "post">;
    /** Save a customer-owned source-option choice */
    readonly selectSourceOption: CoreMethod<"/v1/information/customer-vat/select", "post">;
  };
  readonly information: {
    /** Inspect source-attributed informational VAT options */
    readonly lookupVat: CoreMethod<"/v1/information/vat", "get">;
    /** Calculate an ephemeral conditional VAT preview */
    readonly previewVat: CoreMethod<"/v1/information/vat/calculate", "post">;
    /** Resolve source VAT options for an exact CN or CPA code */
    readonly resolveTaxClass: CoreMethod<"/v1/information/tax-class/resolve", "post">;
  };
  readonly registrations: {
    /** Create OSS / IOSS Tax Registration */
    readonly create: CoreMethod<"/v1/tax-registrations", "post">;
    /** List OSS / IOSS Tax Registrations */
    readonly list: CoreMethod<"/v1/tax-registrations", "get">;
    /** Update OSS / IOSS Tax Registration */
    readonly update: CoreMethod<"/v1/tax-registrations/{id}", "patch">;
  };
  readonly reports: {
    /** Download Locked Union OSS Export Artifact */
    readonly downloadLockedUnionOssExport: CoreMethod<"/v1/reports/locked-return-periods/union-oss/exports/{exportID}", "get", "200 application/json" | "200 text/csv">;
    /** Union OSS Country VAT Breakdown Export */
    readonly exportUnionOssCountryVatBreakdown: CoreMethod<"/v1/reports/country-vat-breakdown/export", "get", "200 text/csv">;
    /** Union OSS Quarterly Summary Export */
    readonly exportUnionOssQuarterlySummary: CoreMethod<"/v1/reports/oss-quarterly-summary/export", "get", "200 text/csv">;
    /** OSS / IOSS Filing Prep Workspace */
    readonly getFilingPrepWorkspace: CoreMethod<"/v1/reports/filing-prep", "get">;
    /** OSS / IOSS Multi-jurisdiction Preview */
    readonly getMultiJurisdictionPreview: CoreMethod<"/v1/reports/multi-jurisdiction", "get">;
    /** Union OSS Accountant-Friendly Report */
    readonly getUnionOssAccountantReport: CoreMethod<"/v1/reports/oss-accountant-report", "get">;
    /** Union OSS Country VAT Breakdown Preview */
    readonly getUnionOssCountryVatBreakdown: CoreMethod<"/v1/reports/country-vat-breakdown", "get">;
    /** Union OSS Quarterly Summary Preview */
    readonly getUnionOssQuarterlySummary: CoreMethod<"/v1/reports/oss-quarterly-summary", "get">;
    /** List Locked Union OSS Return Periods */
    readonly listLockedUnionOssReturnPeriods: CoreMethod<"/v1/reports/locked-return-periods/union-oss", "get">;
    /** Lock Union OSS Return Period */
    readonly lockUnionOssReturnPeriod: CoreMethod<"/v1/reports/locked-return-periods/union-oss", "post">;
    /** Mark Locked Union OSS Return Period Filed */
    readonly markUnionOssReturnPeriodFiled: CoreMethod<"/v1/reports/locked-return-periods/union-oss/filed", "post">;
  };
  readonly sme: {
    /** SME Eligibility Check */
    readonly checkEligibility: CoreMethod<"/v1/vat/sme-eligibility", "post">;
    /** List SME Thresholds */
    readonly listThresholds: CoreMethod<"/v1/vat/sme-thresholds", "get">;
  };
  readonly sources: {
    /** Create Source Profile */
    readonly create: CoreMethod<"/v1/sources", "post">;
    /** List Source Profiles */
    readonly list: CoreMethod<"/v1/sources", "get">;
    /** List Unknown Source Tags */
    readonly listUnknown: CoreMethod<"/v1/sources/unknown", "get">;
    /** Update Source Profile */
    readonly update: CoreMethod<"/v1/sources/{id}", "patch">;
  };
  readonly supplies: {
    /** Commit a sale or correction */
    readonly commit: CoreMethod<"/v1/supplies", "post">;
    /** Get one committed supply revision */
    readonly get: CoreMethod<"/v1/supplies/{id}", "get">;
    /** List committed supply revisions */
    readonly list: CoreMethod<"/v1/supplies", "get">;
  };
  readonly system: {
    /** Health check (liveness probe) */
    readonly health: CoreMethod<"/health", "get">;
    /** Readiness check */
    readonly ready: CoreMethod<"/ready", "get">;
  };
  readonly taxClasses: {
    /** Get Tax Class Detail */
    readonly get: CoreMethod<"/v1/tax-classes/{id}", "get">;
    /** List Tax Classes */
    readonly list: CoreMethod<"/v1/tax-classes", "get">;
  };
  readonly transactions: {
    /** Aggregated Transactions */
    readonly aggregate: CoreMethod<"/v1/transactions/aggregated", "get">;
    /** Export Transactions (CSV) */
    readonly export: CoreMethod<"/v1/transactions/export", "get", "200 text/csv; charset=utf-8">;
    /** Get Transaction Calculation Evidence */
    readonly get: CoreMethod<"/v1/transactions/{id}", "get">;
    /** List Transactions */
    readonly list: CoreMethod<"/v1/transactions", "get">;
  };
  readonly vat: {
    /** Calculate VAT */
    readonly calculateAndPersist: CoreMethod<"/v1/vat/calculate", "post">;
    /** Lookup Recorded VAT Rate */
    readonly getRate: CoreMethod<"/v1/vat/rates", "get">;
  };
}

export function createApiModules(dispatch: CoreDispatch): ApiModules {
  return {
    auth: Object.freeze({
      claimAgentApiKey: bindOperation<"/agent/auth/claim", "post">(dispatch, "POST /agent/auth/claim"),
      getContext: bindOperation<"/v1/auth/context", "get">(dispatch, "GET /v1/auth/context"),
      startAgentRegistration: bindOperation<"/agent/auth", "post">(dispatch, "POST /agent/auth"),
    }),
    classification: Object.freeze({
      lookupCode: bindOperation<"/v1/classification-codes/{scheme}/{code}", "get">(dispatch, "GET /v1/classification-codes/{scheme}/{code}"),
    }),
    compliance: Object.freeze({
      checkThreshold: bindOperation<"/v1/vat/threshold-check", "post">(dispatch, "POST /v1/vat/threshold-check"),
      getThresholdStatus: bindOperation<"/v1/compliance/threshold-status", "get">(dispatch, "GET /v1/compliance/threshold-status"),
      listVatThresholds: bindOperation<"/v1/vat/thresholds", "get">(dispatch, "GET /v1/vat/thresholds"),
    }),
    customerVat: Object.freeze({
      declareClassification: bindOperation<"/v1/information/customer-vat/classification", "post">(dispatch, "POST /v1/information/customer-vat/classification"),
      getArticle59cTurnover: bindOperation<"/v1/information/customer-vat/article59c", "get">(dispatch, "GET /v1/information/customer-vat/article59c"),
      getAttention: bindOperation<"/v1/information/customer-vat/attention", "get">(dispatch, "GET /v1/information/customer-vat/attention"),
      getIossPreview: bindOperation<"/v1/information/customer-vat/ioss", "get", "200 text/csv">(dispatch, "GET /v1/information/customer-vat/ioss"),
      getOssPreview: bindOperation<"/v1/information/customer-vat/oss", "get", "200 text/csv">(dispatch, "GET /v1/information/customer-vat/oss"),
      listEvents: bindOperation<"/v1/information/customer-vat/events", "get">(dispatch, "GET /v1/information/customer-vat/events"),
      listRules: bindOperation<"/v1/information/customer-vat/rules", "get">(dispatch, "GET /v1/information/customer-vat/rules"),
      reprocess: bindOperation<"/v1/information/customer-vat/reprocess", "post">(dispatch, "POST /v1/information/customer-vat/reprocess"),
      retireRule: bindOperation<"/v1/information/customer-vat/retire", "post">(dispatch, "POST /v1/information/customer-vat/retire"),
      saveOssContext: bindOperation<"/v1/information/customer-vat/oss-context", "post">(dispatch, "POST /v1/information/customer-vat/oss-context"),
      saveProvisionalRate: bindOperation<"/v1/information/customer-vat/provisional-rate", "post">(dispatch, "POST /v1/information/customer-vat/provisional-rate"),
      selectSourceOption: bindOperation<"/v1/information/customer-vat/select", "post">(dispatch, "POST /v1/information/customer-vat/select"),
    }),
    information: Object.freeze({
      lookupVat: bindOperation<"/v1/information/vat", "get">(dispatch, "GET /v1/information/vat"),
      previewVat: bindOperation<"/v1/information/vat/calculate", "post">(dispatch, "POST /v1/information/vat/calculate"),
      resolveTaxClass: bindOperation<"/v1/information/tax-class/resolve", "post">(dispatch, "POST /v1/information/tax-class/resolve"),
    }),
    registrations: Object.freeze({
      create: bindOperation<"/v1/tax-registrations", "post">(dispatch, "POST /v1/tax-registrations"),
      list: bindOperation<"/v1/tax-registrations", "get">(dispatch, "GET /v1/tax-registrations"),
      update: bindOperation<"/v1/tax-registrations/{id}", "patch">(dispatch, "PATCH /v1/tax-registrations/{id}"),
    }),
    reports: Object.freeze({
      downloadLockedUnionOssExport: bindOperation<"/v1/reports/locked-return-periods/union-oss/exports/{exportID}", "get", "200 application/json" | "200 text/csv">(dispatch, "GET /v1/reports/locked-return-periods/union-oss/exports/{exportID}"),
      exportUnionOssCountryVatBreakdown: bindOperation<"/v1/reports/country-vat-breakdown/export", "get", "200 text/csv">(dispatch, "GET /v1/reports/country-vat-breakdown/export"),
      exportUnionOssQuarterlySummary: bindOperation<"/v1/reports/oss-quarterly-summary/export", "get", "200 text/csv">(dispatch, "GET /v1/reports/oss-quarterly-summary/export"),
      getFilingPrepWorkspace: bindOperation<"/v1/reports/filing-prep", "get">(dispatch, "GET /v1/reports/filing-prep"),
      getMultiJurisdictionPreview: bindOperation<"/v1/reports/multi-jurisdiction", "get">(dispatch, "GET /v1/reports/multi-jurisdiction"),
      getUnionOssAccountantReport: bindOperation<"/v1/reports/oss-accountant-report", "get">(dispatch, "GET /v1/reports/oss-accountant-report"),
      getUnionOssCountryVatBreakdown: bindOperation<"/v1/reports/country-vat-breakdown", "get">(dispatch, "GET /v1/reports/country-vat-breakdown"),
      getUnionOssQuarterlySummary: bindOperation<"/v1/reports/oss-quarterly-summary", "get">(dispatch, "GET /v1/reports/oss-quarterly-summary"),
      listLockedUnionOssReturnPeriods: bindOperation<"/v1/reports/locked-return-periods/union-oss", "get">(dispatch, "GET /v1/reports/locked-return-periods/union-oss"),
      lockUnionOssReturnPeriod: bindOperation<"/v1/reports/locked-return-periods/union-oss", "post">(dispatch, "POST /v1/reports/locked-return-periods/union-oss"),
      markUnionOssReturnPeriodFiled: bindOperation<"/v1/reports/locked-return-periods/union-oss/filed", "post">(dispatch, "POST /v1/reports/locked-return-periods/union-oss/filed"),
    }),
    sme: Object.freeze({
      checkEligibility: bindOperation<"/v1/vat/sme-eligibility", "post">(dispatch, "POST /v1/vat/sme-eligibility"),
      listThresholds: bindOperation<"/v1/vat/sme-thresholds", "get">(dispatch, "GET /v1/vat/sme-thresholds"),
    }),
    sources: Object.freeze({
      create: bindOperation<"/v1/sources", "post">(dispatch, "POST /v1/sources"),
      list: bindOperation<"/v1/sources", "get">(dispatch, "GET /v1/sources"),
      listUnknown: bindOperation<"/v1/sources/unknown", "get">(dispatch, "GET /v1/sources/unknown"),
      update: bindOperation<"/v1/sources/{id}", "patch">(dispatch, "PATCH /v1/sources/{id}"),
    }),
    supplies: Object.freeze({
      commit: bindOperation<"/v1/supplies", "post">(dispatch, "POST /v1/supplies"),
      get: bindOperation<"/v1/supplies/{id}", "get">(dispatch, "GET /v1/supplies/{id}"),
      list: bindOperation<"/v1/supplies", "get">(dispatch, "GET /v1/supplies"),
    }),
    system: Object.freeze({
      health: bindOperation<"/health", "get">(dispatch, "GET /health"),
      ready: bindOperation<"/ready", "get">(dispatch, "GET /ready"),
    }),
    taxClasses: Object.freeze({
      get: bindOperation<"/v1/tax-classes/{id}", "get">(dispatch, "GET /v1/tax-classes/{id}"),
      list: bindOperation<"/v1/tax-classes", "get">(dispatch, "GET /v1/tax-classes"),
    }),
    transactions: Object.freeze({
      aggregate: bindOperation<"/v1/transactions/aggregated", "get">(dispatch, "GET /v1/transactions/aggregated"),
      export: bindOperation<"/v1/transactions/export", "get", "200 text/csv; charset=utf-8">(dispatch, "GET /v1/transactions/export"),
      get: bindOperation<"/v1/transactions/{id}", "get">(dispatch, "GET /v1/transactions/{id}"),
      list: bindOperation<"/v1/transactions", "get">(dispatch, "GET /v1/transactions"),
    }),
    vat: Object.freeze({
      calculateAndPersist: bindOperation<"/v1/vat/calculate", "post">(dispatch, "POST /v1/vat/calculate"),
      getRate: bindOperation<"/v1/vat/rates", "get">(dispatch, "GET /v1/vat/rates"),
    }),
  };
}
