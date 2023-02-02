/* template */

type Flatten<T> = {
  [K in keyof T]: T[K];
};

type Optional<T, K extends keyof T> = {
  [P in K]?: T[P];
};

type Required<T, K extends keyof T> = {
  [P in keyof Omit<T, K>]: T[P];
};

type PartialByKeys<T, K extends keyof T = keyof T> = Flatten<Optional<T, K> & Required<T, K>>;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

interface User {
  name: string;
  age: number;
  address: string;
}

interface UserPartialName {
  name?: string;
  age: number;
  address: string;
}

interface UserPartialNameAndAge {
  name?: string;
  age?: number;
  address: string;
}

type cases = [
  Expect<Equal<PartialByKeys<User, "name">, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, "name" | "age">, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys<User, "name" | "unknown">, UserPartialName>>
];
