/* template */

type Concat<Str extends string, Char, Divider extends string> = Char extends string
  ? Str extends ""
    ? Char
    : `${Str}${Divider}${Char}`
  : Str;

type Join<T, U extends string | number, Str extends string = ""> = T extends [
  infer First,
  ...infer Rest
]
  ? Join<Rest, U, Concat<Str, First, `${U}`>>
  : Str;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type T1 = Join<["a", "p", "p", "l", "e"], "-">;
type T2 = Join<["Hello", "World"], " ">;
type T3 = Join<["2", "2", "2"], 1>;
type T4 = Join<["o"], "u">;

type cases = [
  Expect<Equal<T1, "a-p-p-l-e">>,
  Expect<Equal<T2, "Hello World">>,
  Expect<Equal<T3, "21212">>,
  Expect<Equal<T4, "o">>
];
