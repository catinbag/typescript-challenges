/* template */

type Positive<T extends string> = T extends `-${infer Val}` ? Val : T;

type Absolute<T extends number | string | bigint> = Positive<`${T}`>;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type A1 = Absolute<0>;
type A2 = Absolute<-0>;
type A3 = Absolute<10>;
type A4 = Absolute<-5>;
type A5 = Absolute<"0">;
type A6 = Absolute<"-0">;
type A7 = Absolute<"10">;
type A8 = Absolute<"-5">;
type A9 = Absolute<-1_000_000n>;
type A10 = Absolute<9_999n>;

type cases = [
  Expect<Equal<Absolute<0>, "0">>,
  Expect<Equal<Absolute<-0>, "0">>,
  Expect<Equal<Absolute<10>, "10">>,
  Expect<Equal<Absolute<-5>, "5">>,
  Expect<Equal<Absolute<"0">, "0">>,
  Expect<Equal<Absolute<"-0">, "0">>,
  Expect<Equal<Absolute<"10">, "10">>,
  Expect<Equal<Absolute<"-5">, "5">>,
  Expect<Equal<Absolute<-1_000_000n>, "1000000">>,
  Expect<Equal<Absolute<9_999n>, "9999">>
];
