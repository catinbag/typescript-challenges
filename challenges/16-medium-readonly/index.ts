/* template */

type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [ReadonlyKey in K]: T[ReadonlyKey];
} & {
  [SimpleKey in keyof T as SimpleKey extends K ? never : SimpleKey]: T[SimpleKey];
};

/* tests */

import type { Alike, Expect } from "../../utils";

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, "title" | "description">, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, "title" | "description">, Expected>>
];

// @ts-expect-error
type error = MyReadonly2<Todo1, "title" | "invalid">;

interface Todo1 {
  title: string;
  description?: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface Expected {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}