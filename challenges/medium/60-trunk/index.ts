/* template */

type Trunc<T extends number | string> = `${T}` extends `${infer Left}.${infer _Right}`
  ? Left
  : `${T}`;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type T1 = Trunc<0.1>;
type T2 = Trunc<1.234>;
type T3 = Trunc<12.345>;
type T4 = Trunc<-5.1>;
type T5 = Trunc<"1.234">;
type T6 = Trunc<"-10.234">;
type T7 = Trunc<10>;

type cases = [
  Expect<Equal<T1, "0">>,
  Expect<Equal<T2, "1">>,
  Expect<Equal<T3, "12">>,
  Expect<Equal<T4, "-5">>,
  Expect<Equal<T5, "1">>,
  Expect<Equal<T6, "-10">>,
  Expect<Equal<T7, "10">>
];
