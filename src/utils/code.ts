function extractVars(s: string) {
  // extract the name of the variables from the s string and returns it as an array
  return s
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("globalThis."))
    .reduce((t, line) => {
      let sp = line
        .substring("globalThis.".length)
        .split("=")
        .map((_) => _.trim().replace(';', ""));

      if (sp[1] == "()") return t;
      t[sp[0]] = sp[1];
      return t;
    }, {} as any);
}
export function runCode(s: string) {
  let x = eval(s);
  if (!(globalThis as any)["_zecimal_vars"])
    (globalThis as any)["_zecimal_vars"] = {};

  (globalThis as any)["_zecimal_vars"] = {
    ...(globalThis as any)["_zecimal_vars"],
    ...extractVars(s),
  };
  return x;
}
