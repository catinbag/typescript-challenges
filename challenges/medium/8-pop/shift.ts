/* template */

type Shift<T extends any[]> = T extends [infer First, ...infer Rest] ? Rest : [];

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<["a", "b", "c", "d"]>, ["b", "c", "d"]>>,
  Expect<Equal<Shift<[]>, []>>
];
