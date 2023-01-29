/* template */

type LookUp<U, T extends PropertyKey> = {
  [Key in T]: U extends { type: T } ? U : never;
}[T];

// type LookUp<U, T extends PropertyKey, K extends PropertyKey> = {
//   [Key in T]: U extends Record<K, T> ? U : never;
// }[T];

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

interface Cat {
  type: "cat";
  breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
}

interface Dog {
  type: "dog";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
}

type Animal = Cat | Dog;

type cases = [
  Expect<Equal<LookUp<Animal, "dog">, Dog>>, //
  Expect<Equal<LookUp<Animal, "cat">, Cat>> //
];
