/* template */

type MyReadonly<T extends Record<string, any>> = {
  readonly [ObjectKey in keyof T]: T[ObjectKey];
};

/* tests */

import type { Equal, Expect } from "../utils";

type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>];

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}
