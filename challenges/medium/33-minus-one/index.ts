/* template */

type ConvertCfg = {
  "0": "9";
  "1": "0";
  "2": "1";
  "3": "2";
  "4": "3";
  "5": "4";
  "6": "5";
  "7": "6";
  "8": "7";
  "9": "8";
};
type Convert<T extends string> = T extends keyof ConvertCfg ? ConvertCfg[T] : T;

type ToNumber<T extends string> = T extends `${infer First extends number}` ? First : never;
type ToString<T extends number> = `${T}`;

type MinusOneInStr<T extends string> = T extends `${infer First}${infer Rest}`
  ? First extends "0"
    ? `${Convert<First>}${MinusOneInStr<Rest>}`
    : `${Convert<First>}${Rest}`
  : T;

type Reverse<T extends string> = T extends `${infer First}${infer Rest}`
  ? `${Reverse<Rest>}${First}`
  : T;

type RemoveUnusedZeros<T extends string> = T extends `0${infer First}${infer Rest}`
  ? `${First}${Rest}`
  : T;

type ConvertStr<T extends string> = ToNumber<RemoveUnusedZeros<Reverse<MinusOneInStr<Reverse<T>>>>>;

export type MinusOne<T extends number> = T extends 0 ? -1 : ConvertStr<ToString<T>>;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>
];
