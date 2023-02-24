/* template */

export type Reverse<T extends unknown[]> = T extends []
  ? []
  : T extends [infer First, ...infer Rest]
  ? [...Reverse<Rest>, First]
  : never;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type A1 = Reverse<[]>; // []
type A2 = Reverse<["a", "b"]>; // ["b" // "a"]
type A3 = Reverse<["a", "b", "c"]>; // ["c", "b" // "a"]

type cases = [
  Expect<Equal<Reverse<[]>, []>>,
  Expect<Equal<Reverse<["a", "b"]>, ["b", "a"]>>,
  Expect<Equal<Reverse<["a", "b", "c"]>, ["c", "b", "a"]>>
];

type errors = [
  // @ts-expect-error
  Reverse<"string">,
  // @ts-expect-error
  Reverse<{ key: "value" }>
];
