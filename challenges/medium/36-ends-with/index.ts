/* template */

// type EndsWith<T extends string, U extends string> = T extends `${string}${U}` ? true : false;
// type EndsWith<T extends string, U extends string> = T extends `${infer R}${U}`? true: false;

type Reverse<T extends string> = T extends `${infer First}${infer Rest}`
  ? `${Reverse<Rest>}${First}`
  : T;

type EndsWith<T extends string, U extends string> = Reverse<T> extends `${Reverse<U>}${infer _}`
  ? true
  : false;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<EndsWith<"abc", "bc">, true>>,
  Expect<Equal<EndsWith<"abc", "abc">, true>>,
  Expect<Equal<EndsWith<"abc", "d">, false>>,
  Expect<Equal<EndsWith<"abc", "ac">, false>>,
  Expect<Equal<EndsWith<"abc", "">, true>>,
  Expect<Equal<EndsWith<"abc", " ">, false>>
];
