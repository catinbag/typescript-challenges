/* template */

type PromiseByFn<T> = { then: (onfulfilled: (arg: T) => any) => any };

type MyAwaitedObj<T extends PromiseByFn<any>> = T extends PromiseByFn<infer Arg>
  ? Arg
  : never;

type MyAwaitedPromise<T> = T extends Promise<infer TRes>
  ? TRes extends Promise<any>
    ? MyAwaited<TRes>
    : TRes
  : never;

type MyAwaited<T extends object | Promise<any>> = T extends Promise<any>
  ? MyAwaitedPromise<T>
  : T extends PromiseByFn<any>
  ? MyAwaitedObj<T>
  : never;

/* tests */

import type { Equal, Expect } from "../../utils";

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
