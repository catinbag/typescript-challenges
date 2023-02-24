import { IsNever } from "../27-is-never";

/* template */

type IsTuple<T> = IsNever<T> extends true
  ? false
  : T extends readonly any[]
  ? number extends T["length"]
    ? false
    : true
  : false;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type T1 = IsTuple<[]>;
type T2 = IsTuple<[number]>;
type T3 = IsTuple<readonly [1]>;
type T4 = IsTuple<{ length: 1 }>;
type T5 = IsTuple<number[]>;
type T6 = IsTuple<never>;

type cases = [
  Expect<Equal<T1, true>>,
  Expect<Equal<T2, true>>,
  Expect<Equal<T3, true>>,
  Expect<Equal<T4, false>>,
  Expect<Equal<T5, false>>,
  Expect<Equal<T6, false>>
];
