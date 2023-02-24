/* template */

type Push<T extends any[], U> = U extends any[] ? [...T, ...U] : [...T, U];

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Push<[3, 2], [0, 1]>, [3, 2, 0, 1]>>,
  Expect<Equal<Push<[3, 2], 1>, [3, 2, 1]>>,
  Expect<Equal<Push<["a", "b", "c"], "d">, ["a", "b", "c", "d"]>>,
  Expect<Equal<Push<[], 1>, [1]>>
];
