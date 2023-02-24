/* template */

type IsEqual<T, U> = T extends U ? (U extends T ? true : false) : false;

type GetArr<T extends any[], U, Acc extends any[] = []> = T extends [infer First, ...infer Rest]
  ? IsEqual<First, U> extends true
    ? Acc
    : GetArr<Rest, U, [...Acc, unknown]>
  : Acc;

type CompareLength<T extends any[], U extends any[]> = IsEqual<
  T["length"],
  U["length"]
> extends true
  ? -1
  : U["length"];

export type IndexOf<T extends any[], U, Acc extends any[] = []> = CompareLength<
  T,
  GetArr<T, U, Acc>
>;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type T1 = IndexOf<[1, 2, 3], 2>;
type T2 = IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>;
type T3 = IndexOf<[0, 0, 0], 2>;
type T4 = IndexOf<[string, 1, number, "a"], number>;
type T5 = IndexOf<[string, 1, number, "a", any], any>;
type T6 = IndexOf<[string, "a"], "a">;
type T7 = IndexOf<[any, 1], 1>;

type cases = [
  Expect<Equal<T1, 1>>,
  Expect<Equal<T2, 2>>,
  Expect<Equal<T3, -1>>,
  Expect<Equal<T4, 2>>,
  Expect<Equal<T5, 4>>,
  Expect<Equal<T6, 1>>,
  Expect<Equal<T7, 1>>
];
