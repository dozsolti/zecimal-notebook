import { create, all } from "mathjs";

const setupGlobals = () => {
  const math = create(all);
  math.config({
    number: "BigNumber",
    precision: 50,
    precision: 64,
    relTol: 1e-60,
    absTol: 1e-63,
  });

  globalThis.calc = (s) => {
    /* let scope = Object.fromEntries(
      Object.entries(globalThis._zecimal_vars).map((row) => [
        row[0],
        math.bignumber(row[1]),
      ])
    ); */

    return math.evaluate(s).toString();
  };
};

export default setupGlobals;
