/* template */

type IsEqual<T, U> = T extends U ? (U extends T ? true : false) : false;

type LastIndexOf<T extends any[], U> = T extends [...infer Rest, infer Last]
  ? IsEqual<Last, U> extends true
    ? Rest["length"]
    : LastIndexOf<Rest, U>
  : -1;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type A1 = LastIndexOf<[1, 2, 3, 2, 1], 2>; // 3
type A2 = LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>; // 7
type A3 = LastIndexOf<[0, 0, 0], 2>; // -1
type A4 = LastIndexOf<[string, 2, number, "a", number, 1], number>; // 4
type A5 = LastIndexOf<[string, any, 1, number, "a", any, 1], any>; // 5

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, "a", number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, "a", any, 1], any>, 5>>
];
