/* template */

type UnionToIntersection<U> = (U extends U ? (x: U) => unknown : never) extends (
  x: infer R
) => unknown
  ? R
  : never;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type T1 = UnionToIntersection<"foo" | 42 | true>; // 'foo' & 42 & true
type T2 = UnionToIntersection<(() => "foo") | ((i: 42) => true)>; // (() => 'foo') & ((i: 42) => true)

type cases = [
  Expect<Equal<T1, "foo" & 42 & true>>,
  Expect<Equal<T2, (() => "foo") & ((i: 42) => true)>>
];
