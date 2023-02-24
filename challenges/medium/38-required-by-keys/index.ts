/* template */

type Flatten<T> = {
  [K in keyof T]: T[K];
};

type TRequired<T, K extends keyof T> = {
  [Key in K]-?: T[Key];
};

type TOptional<T, K extends keyof T> = {
  [Key in keyof Omit<T, K>]: T[Key];
};

type RequiredByKeys<T, K extends keyof T = keyof T> = Flatten<TRequired<T, K> & TOptional<T, K>>;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type A1 = RequiredByKeys<User, "name">; // UserRequiredName
type A2 = RequiredByKeys<User, "name" | "age">; // UserRequiredNameAndAge
type A3 = RequiredByKeys<User>; // Required<User>
// @ts-expect-error
type A4 = RequiredByKeys<User, "name" | "unknown">; // UserRequiredName

interface User {
  name?: string;
  age?: number;
  address?: string;
}

interface UserRequiredName {
  name: string;
  age?: number;
  address?: string;
}

interface UserRequiredNameAndAge {
  name: string;
  age: number;
  address?: string;
}

type cases = [
  Expect<Equal<RequiredByKeys<User, "name">, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, "name" | "age">, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>,
  // @ts-expect-error
  Expect<Equal<RequiredByKeys<User, "name" | "unknown">, UserRequiredName>>
];
