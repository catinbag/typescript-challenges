/* template */

// type KebabCase<S> = S extends `${infer First}${infer Rest}`
//   ? Rest extends Uncapitalize<Rest>
//     ? `${Lowercase<First>}${KebabCase<Rest>}`
//     : `${Lowercase<First>}-${KebabCase<Rest>}`
//   : S;

type Prefix<S extends string, OnlyLetter extends boolean> = OnlyLetter extends false ? `-${S}` : S;

type Transform<T extends string, OnlyLetter extends boolean> = T extends Lowercase<T>
  ? T
  : Prefix<Lowercase<T>, OnlyLetter>;

type KebabCase<S, IsFirst extends boolean = true> = S extends `${infer First}${infer Rest}`
  ? `${Transform<First, IsFirst>}${KebabCase<Rest, false>}`
  : S;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<KebabCase<"FooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"fooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"foo-bar">, "foo-bar">>,
  Expect<Equal<KebabCase<"foo_bar">, "foo_bar">>,
  Expect<Equal<KebabCase<"Foo-Bar">, "foo--bar">>,
  Expect<Equal<KebabCase<"ABC">, "a-b-c">>,
  Expect<Equal<KebabCase<"-">, "-">>,
  Expect<Equal<KebabCase<"">, "">>,
  Expect<Equal<KebabCase<"😎">, "😎">>
];
