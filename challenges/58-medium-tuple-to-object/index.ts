/* template */

type TupleToNestedObject<T extends unknown[], U> = T extends [infer First, ...infer Rest]
  ? First extends PropertyKey
    ? { [Key in First]: TupleToNestedObject<Rest, U> }
    : never
  : U;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type A1 = TupleToNestedObject<["a"], string>; // { a: string }
type A2 = TupleToNestedObject<["a", "b"], number>; // { a: { b: number } }
type A3 = TupleToNestedObject<["a", "b", "c"], boolean>; // { a: { b: { c: boolean } } }
type A4 = TupleToNestedObject<[], boolean>; // boolean

type cases = [
  Expect<Equal<TupleToNestedObject<["a"], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<["a", "b"], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<["a", "b", "c"], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>
];
