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
  readonly request: Media;
  readonly parameters: Media;
  readonly responses: Readonly<Record<string, {
    readonly content: Media;
    readonly headers: Media;
  }>>;
}
