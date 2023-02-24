import { Includes } from "../../easy/10-includes";

/* template */

type Unique<T extends any[], Acc extends any[] = []> = T extends [infer First, ...infer Rest]
  ? Includes<Acc, First> extends true
    ? Unique<Rest, Acc>
    : Unique<Rest, [...Acc, First]>
  : Acc;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type A1 = Unique<[1, 1, 2, 2, 3, 3]>;
type A2 = Unique<[1, 2, 3, 4, 4, 5, 6, 7]>;
type A3 = Unique<[1, "a", 2, "b", 2, "a"]>;
type A4 = Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>;
type A5 = Unique<[unknown, unknown, any, any, never, never]>;

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, "a", 2, "b", 2, "a"]>, [1, "a", 2, "b"]>>,
  Expect<
    Equal<
      Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>,
      [string, number, 1, "a", 2, "b"]
    >
  >,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>
];
