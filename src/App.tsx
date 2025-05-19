import "./App.css";
import NotebookPage, {
  type Notebook,
} from "./components/Notebook/NotebookPage.tsx";
import setupGlobals from "./globals.js";
import { NotebookProvider } from "./hooks/useNotebook.tsx";

setupGlobals();

export const TEST_QUINTIC_TPOW6: Notebook = {
  custom_variable: `globalThis.a = 0;
globalThis.b = 1;
globalThis.n = 1000;
globalThis.maxSteps = 4;

globalThis.c1 = 0;
globalThis.c2 = 0;
globalThis.c3 = 0;
globalThis.c4 = 1;
globalThis.c5 = 6;

globalThis.t = Array({ length: n + 1 });
globalThis.xk = Array({ length: n + 1 });
globalThis.xk_1 = Array({ length: n + 1 });`,

  custom_functions: [
    {
      code: `globalThis.g = (T) => (c5 - 3 * c4 + c3 / 2 + 2 * c2 + 3 * c1) * T * T * T * T + (4 * c4 - c5 - c3 - 3 * c2 - 4 * c1) * T * T * T + c3 / 2 * T * T + c2 * T + c1`,
      tests: ["return g(2);"],
      test_outputs: [{ result: 3 }],
    },
    /*`globalThis.H = (t, s) => {
  return 1 / 24 * s * s * (t - 1) * (t - 1) * (3 * s * s * t * t + 2 * s * s * t + s * s - 8 * s * t * t - 4 * s * t + 6 * t * t);
}`,
    `globalThis.K = (t, s) => {
  return 1 / 24 * (s - 1) * (s - 1) * (s - 1) * t * t * t * (t - 4 * s + 3 * t * s);
}`,
    `globalThis.Green = (t, s) => {
  if (s <= t) {
    return H(t, s);
  } else {
    return K(t, s);
  }
}`,
    `globalThis.f = (s, v, w) => 720 * s + (v * w) / 5 - (v * v * v) / 5;`,

    `globalThis.fi = (t) => t * t;`,

    `globalThis.F = (ti, t) => {
  return Green(ti, t) * f(t, g(t), g(fi(t)));
};`,
    `globalThis.F4 = (ti, t, x, S) => {
  return Green(ti, t) * f(t, x, S(fi(t)));
};`,
    `globalThis.calc = (s) => {
  return eval(s);
};`,*/
  ],

  steps: [
    {
      code: `
// h reprezinta pasul, dimensiunea subintervalelor
// ti reprezinta capetele subintervalelor
globalThis.h = b - a / n;
for (let i = 0; i <= n; i++) {
  t[i] = i * h;
}

// Iteratia 0 a solutiei este reprezentata de g(ti)
for (let i = 0; i <= n; i++) {
  xk_1[i] = g(t[i]);
}
`,
      tests: [],
      test_outputs: [],
    },

    {
      code: `xk[0] = c1;
for (let i = 1; i < n; i++) {
  let suma1 = 0;
  for (let j = 1; j <= n; j++) {
    suma1 += F(t[i], t[j - 1]) + F(t[i], t[j]);
  }
  let suma3 =
    5 * F(t[i], t[n]) -
    18 * F(t[i], t[n - 1]) +
    24 * F(t[i], t[n - 2]) -
    14 * F(t[i], t[n - 3]) +
    3 * F(t[i], t[n - 4]) +
    5 * F(t[i], t[0]) -
    18 * F(t[i], t[1]) +
    24 * F(t[i], t[2]) -
    14 * F(t[i], t[3]) +
    3 * F(t[i], t[4]);
  xk[i] = g(t[i]) + (h / 2) * suma1 + (h / 1440) * suma3;
}
xk[n] = c4;
`,
      tests: [],
      test_outputs: [],
    },
  ],
};
export const TEST_SUM: Notebook = {
  custom_variable: `globalThis.a = 10;
globalThis.b = 20;
globalThis.c = -1;`,
  custom_functions: [
    {
      code: "globalThis.add = (x, y) => x + y;",
      tests: [`return add(1,2);`, `return add(a,b)`],
      test_outputs: [],
    },
    {
      code: "globalThis.sub = (x, y) => x - y;",
      tests: [`return sub(a,b);`],
      test_outputs: [],
    },
  ],
  steps: [
    { code: `c = add(a,b)`, tests: [`return c`], test_outputs: [] },
    { code: `c += sub(b,a)`, tests: [`return c`], test_outputs: [] },
  ],
};

export const TEST_EMPTY: Notebook = {
  custom_variable: ``,
  custom_functions: [{ code: "", tests: [""], test_outputs: [] }],
  steps: [{ code: "", tests: [""], test_outputs: [] }],
};

export const QUINTIC_TPOW6 = {
  custom_variable: `const a = 0, b = 1, n = 10, maxSteps = 4;

const c1 = 0, c2 = 0, c3 = 0, c4 = 1, c5 = 6;`,

  custom_functions: [
    "globalThis.f = (s, v, w) => calc(`720 * ${s} + (${v} * ${w}) / 5 - (${v} * ${v} * ${v}) / 5`);",
    "globalThis.fi = (t) => calc(`${t} * ${t}`);",
    /*"function g(T) {\
  return calc(\
    `(${c5} - 3 * ${c4} + ${c3} / 2 + 2 * ${c2} + 3 * ${c1}) * ${T} * ${T}* ${T}* ${T} + (4 * ${c4} - ${c5} - ${c3} - 3 * ${c2} - 4 * ${c1}) * ${T}* ${T}* ${T} + ${c3} / 2 * ${T} * ${T} + ${c2} * ${T} + ${c1}`\
  );\
}", */
  ],
};

/*
custom var
  a = 10, b = 20, c = 0;

helper funcs
  add, sub

Main
  step 1
    c = add(a,b) // 30

  step 2
    c += sub(b, a) // 40 = 30+10

result
  c:40
*/

function App() {
  return (
    <>
      <NotebookProvider>
        <h1 className="text-3xl bg-white">
          Zecimal Notebook<sub>(open-beta)</sub>
        </h1>
        <NotebookPage />
      </NotebookProvider>
    </>
  );
}

export default App;
