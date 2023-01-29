/* template */

type LengthOfString<
  S extends string,
  List extends any[] = []
> = S extends `${infer First}${infer Rest}`
  ? LengthOfString<Rest, [...List, First]>
  : List["length"];

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<LengthOfString<"">, 0>>,
  Expect<Equal<LengthOfString<"kumiko">, 6>>,
  Expect<Equal<LengthOfString<"reina">, 5>>,
  Expect<Equal<LengthOfString<"Sound! Euphonium">, 16>>
];
