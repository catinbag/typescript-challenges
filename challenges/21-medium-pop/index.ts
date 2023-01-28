/* template */

type Pop<T extends any[]> = T extends [...infer Arr, infer Last] ? Arr : [];

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type Tmp = Pop<[]>;

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<["a", "b", "c", "d"]>, ["a", "b", "c"]>>,
  Expect<Equal<Pop<[]>, []>>
];
