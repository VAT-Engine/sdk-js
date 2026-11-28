import type { ApiModules } from "./generated/api-modules.js";

export type ApiMethodName = {
  [Group in keyof ApiModules]: `${Group}.${keyof ApiModules[Group] & string}`;
}[keyof ApiModules];

type PublicMethod<Name extends ApiMethodName> = Name extends `${infer Group}.${infer Member}`
  ? Group extends keyof ApiModules
    ? Member extends keyof ApiModules[Group]
      ? ApiModules[Group][Member]
      : never
    : never
  : never;

/** Options object accepted by a named API method. */
export type ApiInput<Name extends ApiMethodName> =
  NonNullable<Parameters<PublicMethod<Name>>[0]>;

/** Successful response for a named API method. */
export type ApiResult<Name extends ApiMethodName> = Awaited<ReturnType<PublicMethod<Name>>>;
