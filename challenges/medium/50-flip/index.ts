/* template */

// type Flip<T extends { [x: string]: any }> = {
//   [P in keyof T as `${T[P]}`]: `${Exclude<P, symbol>}`;
// };

type BooleanToStr<T> = T extends true ? "true" : "false";

type Flip<T> = {
  [K in keyof T as T[K] extends PropertyKey ? T[K] : BooleanToStr<T[K]>]: K;
};

/* tests */

import type { Equal, Expect, NotEqual } from "@type-challenges/utils";

type T1 = Flip<{ pi: "a" }>;
type T2 = Flip<{ pi: "a" }>;
type T3 = Flip<{ pi: 3.14; bool: true }>;
type T4 = Flip<{ prop: "val"; prop2: "val2" }>;

type cases = [
  Expect<Equal<{ a: "pi" }, T1>>,
  Expect<NotEqual<{ b: "pi" }, T2>>,
  Expect<Equal<{ 3.14: "pi"; true: "bool" }, T3>>,
  Expect<Equal<{ val2: "prop2"; val: "prop" }, T4>>
];
