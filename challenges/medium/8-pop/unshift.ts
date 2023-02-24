/* template */

type Unshift<T extends any[], U> = U extends any[] ? [...U, ...T] : [U, ...T];

/* tests */

import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Unshift<[3, 2], [1]>, [1, 3, 2]>>,
  Expect<Equal<Unshift<[3, 2], 1>, [1, 3, 2]>>,
  Expect<Equal<Unshift<["a", "b", "c"], "d">, ["d", "a", "b", "c"]>>,
  Expect<Equal<Unshift<[], 1>, [1]>>
];
