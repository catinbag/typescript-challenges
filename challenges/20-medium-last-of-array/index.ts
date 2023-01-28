/* template */

type Last<T extends any[]> = T extends [infer First, ...infer Rest]
  ? Rest["length"] extends 0
    ? First
    : Last<Rest>
  : never;

// type Last<T extends any[]> = T extends [...infer Rest, infer LastEl] ? LastEl : never;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>
];
