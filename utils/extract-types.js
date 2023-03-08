function extract(str) {
  const values = str
    .split("\n")
    .filter(Boolean)
    .map((row, index) => {
      const regex = /\w+<\w+<(?<payload>.+), (?<res>.+)>>/gm;
      const matched = row.matchAll(regex);
      const item = Array.from(matched).pop();

      const { payload, res } = item.groups;

      return `type T${index + 1} = ${payload} // ${res}`;
    });

  return values.join("\n");
}

const str = `
// todo
`;

const res = extract(str);
console.log(res);
