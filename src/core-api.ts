import type { paths } from "./generated/operations.js";
import type { HttpResponseMetadata } from "./http-error.js";
import type { HttpRequestOptions } from "./http-request.js";
import type { HttpTransportResponse } from "./http-response.js";
import type { Int64Input } from "./int64.js";

export type CoreDispatch = (operation: string, options?: HttpRequestOptions) => Promise<HttpTransportResponse>;

type Value<T, K> = K extends keyof T ? T[K] : never;
type Verb = "get" | "post" | "put" | "patch" | "delete" | "head" | "options" | "trace";
type Path = keyof paths;
type Method<P extends Path> = {
  [M in Verb]: [NonNullable<Value<paths[P], M>>] extends [never] ? never : M;
}[Verb];

type InputValue<T> = T extends bigint ? Int64Input : T extends object
  ? { readonly [K in keyof T]: InputValue<T[K]> }
  : T;
type RequiredKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? never : K;
}[keyof T];
type ParameterGroup<Key extends string, T> = [NonNullable<T>] extends [never]
  ? { readonly [K in Key]?: never }
  : RequiredKeys<NonNullable<T>> extends never
    ? { readonly [K in Key]?: InputValue<NonNullable<T>> }
    : { readonly [K in Key]: InputValue<NonNullable<T>> };

type Body<O> = Value<Value<NonNullable<Value<O, "requestBody">>, "content">, "application/json">;
type BodyGroup<O> = [Body<O>] extends [never]
  ? { readonly body?: never }
  : undefined extends Value<O, "requestBody">
    ? { readonly body?: InputValue<Body<O>> }
    : { readonly body: InputValue<Body<O>> };

type InvocationOptions = Pick<HttpRequestOptions, "signal" | "deadlineMs" | "timeoutMs">;
type Input<O, P = Value<O, "parameters">> =
  InvocationOptions & ParameterGroup<"path", Value<P, "path">> & ParameterGroup<"query", Value<P, "query">> &
  ParameterGroup<"headers", Value<P, "header">> & BodyGroup<O>;

type MediaResponse<S extends number, C, B extends string> = [NonNullable<C>] extends [never]
  ? { readonly kind: "empty"; readonly metadata: HttpResponseMetadata & { readonly status: S } }
  : {
    [Media in keyof C & string]: {
      readonly metadata: HttpResponseMetadata & { readonly status: S };
    } & (`${S} ${Media}` extends B
      ? { readonly kind: "bytes"; readonly data: Uint8Array }
      : { readonly kind: "json"; readonly data: C[Media] })
  }[keyof C & string];

type Result<O, B extends string, R = Value<O, "responses">> = {
  [S in keyof R & number]: `${S}` extends `2${string}` ? MediaResponse<S, Value<R[S], "content">, B> : never;
}[keyof R & number];

type Arguments<I> = RequiredKeys<I> extends never ? [options?: I] : [options: I];
export type CoreMethod<P extends Path, M extends Method<P>, B extends string = never> =
  (...args: Arguments<Input<Value<paths[P], M>>>) => Promise<Result<Value<paths[P], M>, B>>;

/** Narrow the shared response to the checked-in operation and documented success media. */
export function bindOperation<P extends Path, M extends Method<P>, B extends string = never>(
  dispatch: CoreDispatch, operation: `${Uppercase<M>} ${P}`,
): CoreMethod<P, M, B> {
  return (...[options]) => dispatch(operation, options as HttpRequestOptions | undefined) as Promise<Result<Value<paths[P], M>, B>>;
}
