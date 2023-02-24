/* template */

type Filter<T extends any[], P, Acc extends unknown[] = []> = T extends [infer First, ...infer Rest]
  ? First extends P
    ? Filter<Rest, P, [...Acc, First]>
    : Filter<Rest, P, Acc>
  : Acc;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type Falsy = false | 0 | "" | null | undefined;

type T1 = Filter<[0, 1, 2], 2>;
type T2 = Filter<[0, 1, 2], 0 | 1>;
type T3 = Filter<[0, 1, 2], Falsy>;

type cases = [
  Expect<Equal<T1, [2]>>, //
  Expect<Equal<T2, [0, 1]>>, //
  Expect<Equal<T3, [0]>> //
];
