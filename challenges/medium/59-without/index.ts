/* template */

type IsEqual<T, U> = T extends U ? (U extends T ? true : false) : false;

type Includes<T extends any[], U> = T extends [infer First, ...infer Rest]
  ? IsEqual<First, U> extends true
    ? true
    : Includes<Rest, U>
  : false;
type IncludesSafe<T, U> = T extends any[] ? Includes<T, U> : IsEqual<T, U>;

type Without<T extends any[], U, Acc extends any[] = []> = T extends [infer First, ...infer Rest]
  ? IncludesSafe<U, First> extends true
    ? Without<Rest, U, Acc>
    : Without<Rest, U, [...Acc, First]>
  : Acc;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type T1 = Without<[1, 2], 1>;
type T2 = Without<[1, 2, 4, 1, 5], [1, 2]>;
type T3 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>;

type cases = [
  Expect<Equal<T1, [2]>>, //
  Expect<Equal<T2, [4, 5]>>, //
  Expect<Equal<T3, []>> //
];
