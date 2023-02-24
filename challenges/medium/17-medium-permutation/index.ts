/* template */

type IsNever<T> = [T] extends [never] ? true : false;

// type Permutation<UnionType, Clone = UnionType> = IsNever<UnionType> extends true
//   ? []
//   : Clone extends infer TmpType
//   ? [TmpType, ...Permutation<Exclude<UnionType, TmpType>>]
//   : [];

type Permutation<UnionType, Clone = UnionType> = IsNever<UnionType> extends true
  ? []
  : Clone extends Clone
  ? [Clone, ...Permutation<Exclude<UnionType, Clone>>]
  : never;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type A1 = Permutation<"A" | "B" | "C">;
type A2 = Permutation<boolean>;
type A3 = Permutation<never>;

type cases = [
  Expect<Equal<Permutation<"A">, ["A"]>>,
  Expect<
    Equal<
      Permutation<"A" | "B" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<
    Equal<
      Permutation<"B" | "A" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>
];
