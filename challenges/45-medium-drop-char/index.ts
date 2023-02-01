/* template */

type DropChar<S, C> = S extends `${infer First}${infer Rest}`
  ? First extends C
    ? `${DropChar<Rest, C>}`
    : `${First}${DropChar<Rest, C>}`
  : S;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type A1 = DropChar<"butter fly!", "">; // "butterfly!"
type A2 = DropChar<"butter fly!", " ">; // "butterfly!"
type A3 = DropChar<"butter fly!", "!">; // "butter fly"
type A4 = DropChar<"    butter fly!        ", " ">; // "butterfly!"
type A5 = DropChar<" b u t t e r f l y ! ", " ">; // "butterfly!"
type A6 = DropChar<" b u t t e r f l y ! ", "b">; // "  u t t e r f l y ! "
type A7 = DropChar<" b u t t e r f l y ! ", "t">; // " b u   e r f l y ! "

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<"butter fly!", "">, "butterfly!">>,
  Expect<Equal<DropChar<"butter fly!", " ">, "butterfly!">>,
  Expect<Equal<DropChar<"butter fly!", "!">, "butter fly">>,
  Expect<Equal<DropChar<"    butter fly!        ", " ">, "butterfly!">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", " ">, "butterfly!">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", "b">, "  u t t e r f l y ! ">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", "t">, " b u   e r f l y ! ">>
];
