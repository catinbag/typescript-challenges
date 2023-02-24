/* template */

type PromiseByFn<T> = { then(onfulfilled: T, ...args: any): any };

type MyAwaited<T extends object> = T extends PromiseByFn<infer F>
  ? F extends (value: infer V, ...args: infer _) => any
    ? V extends object
      ? MyAwaited<V>
      : V
    : never
  : T;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any };

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>
];

// @ts-expect-error
type error = MyAwaited<number>;
