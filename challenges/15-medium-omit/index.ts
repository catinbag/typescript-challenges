/* template */

type MyOmit<T extends Record<string, any>, K extends keyof T> = {
  [ObjectKey in keyof T as ObjectKey extends K ? never : ObjectKey]: T[ObjectKey];
};

/* tests */

import type { Equal, Expect } from "../../utils";

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, "description">>>,
  Expect<Equal<Expected2, MyOmit<Todo, "description" | "completed">>>
];

// @ts-expect-error
type error = MyOmit<Todo, "description" | "invalid">;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}
