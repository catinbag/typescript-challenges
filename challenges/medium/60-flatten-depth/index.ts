import { MinusOne } from "../33-medium-minus-one";

/* template */

type IsPrimitiveArr<T extends unknown[], U = true> = T extends [infer First, ...infer Rest]
  ? First extends number
    ? IsPrimitiveArr<Rest, U>
    : IsPrimitiveArr<Rest, false>
  : U;

type FlatOneLevel<T extends unknown[]> = T extends [infer First, ...infer Rest]
  ? First extends unknown[]
    ? [...First, ...FlatOneLevel<Rest>]
    : [First, ...FlatOneLevel<Rest>]
  : T;

type FlattenDepth<T extends unknown[], U extends number = 1> = IsPrimitiveArr<T> extends true
  ? T
  : U extends 0
  ? T
  : FlattenDepth<FlatOneLevel<T>, MinusOne<U>>;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type A1 = FlattenDepth<[]>; // []
type A2 = FlattenDepth<[1, 2, 3, 4]>; // [1, 2, 3 // 4]
type A3 = FlattenDepth<[1, [2]]>; // [1,  [2]
type A4 = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>; // [1, 2, 3, 4, [5]]
type A5 = FlattenDepth<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, [[5]]]
type A6 = FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>; // [1, 2, 3, 4, [5]]
type A7 = FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>; // [1, 2, 3, 4, 5]

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>
];
