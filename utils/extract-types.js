const regex = /\w+<\w+<(?<payload>.+),.+,?/g;

function extract(str) {
  const values = str
    .split("\n")
    .filter(Boolean)
    .map((row, index) => `type A${index + 1} = ${row.match(regex)?.pop()}`);

  return values.join("\n");
}

const str = `
// todo
`;

const res = extract(str);
console.log(res);
