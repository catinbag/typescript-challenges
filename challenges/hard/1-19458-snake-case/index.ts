/* template */

type SnakeCase<T> = T extends `${infer First}${infer Rest}`
  ? First extends Uppercase<First>
    ? `_${Lowercase<First>}${SnakeCase<Rest>}`
    : `${First}${SnakeCase<Rest>}`
  : T;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type T1 = SnakeCase<"hello">; // 'hello'
type T2 = SnakeCase<"userName">; // 'user_name'
type T3 = SnakeCase<"getElementById">; // 'get_element_by_id'
type T4 = SnakeCase<"getElementById" | "getElementByClassNames">; // 'get_element_by_id' | 'get_element_by_class_names'

type cases = [
  Expect<Equal<T1, "hello">>,
  Expect<Equal<T2, "user_name">>,
  Expect<Equal<T3, "get_element_by_id">>,
  Expect<Equal<T4, "get_element_by_id" | "get_element_by_class_names">>
];
