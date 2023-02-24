/* template */

type StringToUnion<T extends string, Res = never> = T extends `${infer First}${infer Rest}`
  ? StringToUnion<Rest, Res | First>
  : Res;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<StringToUnion<"">, never>>,
  Expect<Equal<StringToUnion<"t">, "t">>,
  Expect<Equal<StringToUnion<"hello">, "h" | "e" | "l" | "l" | "o">>,
  Expect<
    Equal<
      StringToUnion<"coronavirus">,
      "c" | "o" | "r" | "o" | "n" | "a" | "v" | "i" | "r" | "u" | "s"
    >
  >
];
