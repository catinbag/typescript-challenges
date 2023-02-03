/* template */

type ReverseTypes<T> = T extends [infer First, ...infer Rest] ? [...ReverseTypes<Rest>, First] : [];

type FlipArguments<T extends Function> = T extends (...args: infer Args) => infer Res
  ? (...args: ReverseTypes<Args>) => Res
  : never;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type A1 = FlipArguments<() => boolean>; // () => boolean
type A2 = FlipArguments<(foo: string) => number>; // (foo: string) => number
type A3 = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>; // (arg0: boolean, arg1: number arg2: string) => void

// @ts-expect-error
type B1 = FlipArguments<"string">;
// @ts-expect-error
type B2 = FlipArguments<{ key: "value" }>;
// @ts-expect-error
type B3 = FlipArguments<["apple", "banana", 100, { a: 1 }]>;
// @ts-expect-error
type B4 = FlipArguments<null | undefined>;

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>>,
  Expect<
    Equal<
      FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>,
      (arg0: boolean, arg1: number, arg2: string) => void
    >
  >
];

type errors = [
  // @ts-expect-error
  FlipArguments<"string">,
  // @ts-expect-error
  FlipArguments<{ key: "value" }>,
  // @ts-expect-error
  FlipArguments<["apple", "banana", 100, { a: 1 }]>,
  // @ts-expect-error
  FlipArguments<null | undefined>
];
