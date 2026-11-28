export type NumericKind = "int64" | "int32" | "integer" | "double";

export interface NumericShape {
  readonly kind: NumericKind;
  readonly nullable?: true;
  readonly minimum?: string;
  readonly maximum?: string;
}

export type WireShape =
  | NumericShape
  | { readonly kind: "ref"; readonly name: string }
  | { readonly kind: "string" | "boolean" | "unknown" | "bytes" }
  | { readonly kind: "array"; readonly items: WireShape }
  | {
    readonly kind: "object";
    readonly properties: Readonly<Record<string, WireShape>>;
    readonly additional?: WireShape;
  };

type Media = Readonly<Record<string, WireShape>>;

export interface OperationShape {
  readonly authentication: "anonymous" | "api_key" | "claim_token";
  readonly behavior: "read_only" | "mutation" | "credential_read";
  readonly contextAssertion: boolean;
  readonly scopes: readonly string[];
  readonly environments: readonly ("operational" | "sandbox")[] | null;
  readonly retryClass: "read_candidate" | "mutation_no_retry" | "registration_no_retry" |
    "claim_polling" | "calculation_conditional" | "supply_conditional";
  readonly bodyRequired: boolean;
  readonly requiredParameters: readonly string[];
  readonly request: Media;
  readonly parameters: Media;
  readonly responses: Readonly<Record<string, {
    readonly content: Media;
    readonly headers: Media;
  }>>;
}
