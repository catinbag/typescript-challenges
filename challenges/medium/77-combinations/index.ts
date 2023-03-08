/* template */

type ModifierKeys = ["cmd", "ctrl", "opt", "fn"];

type Combs<T extends string[]> = T extends [
  infer First extends string,
  ...infer Rest extends string[]
]
  ? `${First} ${Rest[number]}` | Combs<Rest>
  : never;

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type T1 = Combs<ModifierKeys>;
type CaseTypeOne = "cmd ctrl" | "cmd opt" | "cmd fn" | "ctrl opt" | "ctrl fn" | "opt fn";

type cases = [
  Expect<Equal<T1, CaseTypeOne>> //
];
