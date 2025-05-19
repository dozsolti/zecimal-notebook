const full = require("./full");
const a = 0,
  b = 1,
  n = 1000,
  maxSteps = 4;

const c1 = 0,
  c2 = 0,
  c3 = 0,
  c4 = 1,
  c5 = 6;

const f = (s, v, w) =>
  _calc(`720 * ${s} + (${v} * ${w}) / 5 - (${v} * ${v} * ${v}) / 5)`);

const fi = (t) => _calc(`${t} * ${t}`);

function g(T) {
  return _calc(
    `(${c5} - 3 * ${c4} + ${c3} / 2 + 2 * ${c2} + 3 * ${c1}) * ${T} * ${T}* ${T}* ${T} + (4 * ${c4} - ${c5} - ${c3} - 3 * ${c2} - 4 * ${c1}) * ${T}* ${T}* ${T} + ${c3} / 2 * ${T} * ${T} + ${c2} * ${T} + ${c1}`
  );
}

function H(t, s) {
  return _calc(
    `1 / 24 * ${s} * ${s} * (${t} - 1) * (${t} - 1) * (3 * ${s} * ${s} * ${t} * ${t} + 2 * ${s} * ${s} * ${t} + ${s} * ${s} - 8 * ${s} * ${t} * ${t} - 4 * ${s} * ${t} + 6 * ${t} * ${t})`
  );
}

function K(t, s) {
  return _calc(
    `1 / 24 * (${s} - 1) * (${s} - 1) * (${s} - 1) * ${t} * ${t} * ${t} * (${t} - 4 * ${s} + 3 * ${t} * ${s})`
  );
}
function Green(t, s) {
  if (s <= t) {
    return H(t, s);
  } else {
    return K(t, s);
  }
}

function F(ti, t) {
  return _calc([Green(ti, t), f(t, g(t), g(fi(t)))].join(" * "));
}

function F4(ti, t, x, S) {
  return _calc([Green(ti, t), f(t, x, S(fi(t)))].join(" * "));
}

function Calculare() {
  let t = Array({ length: n + 1 });
  let xk = Array({ length: n + 1 });
  let xk_1 = Array({ length: n + 1 });

  console.log(
    "---------------------------------------- Pasul 1 ----------------------------------------"
  );
  // h reprezinta pasul, dimensiunea subintervalelor
  // ti reprezinta capetele subintervalelor
  let h = _calc(`(${b} - ${a}) / ${n}`);
  for (let i = 0; i <= n; i++) {
    t[i] = _calc(i + "*" + h);
  }

  // Iteratia 0 a solutiei este reprezentata de g(ti)
  for (let i = 0; i <= n; i++) {
    xk_1[i] = g(t[i]);
  }

  console.log(
    "---------------------------------------- Pasul 2 ----------------------------------------"
  );
  // Calculam xk
  xk[0] = c1;
  for (let i = 1; i < n; i++) {
    let suma1 = 0;
    for (let j = 1; j <= n; j++) {
      suma1 = _calc([suma1, F(t[i], t[j - 1]), F(t[i], t[j])].join(" + "));
    }
    let suma3 = _calc(
      `5 * ${F(t[i], t[n])} - 18 * ${F(t[i], t[n - 1])} + 24 * ${F(
        t[i],
        t[n - 2]
      )} - 14 * ${F(t[i], t[n - 3])} + 3 * ${F(t[i], t[n - 4])} + 5 * ${F(
        t[i],
        t[0]
      )} - 18 * ${F(t[i], t[1])} + 24 * ${F(t[i], t[2])} - 14 * ${F(
        t[i],
        t[3]
      )} + 3 * ${F(t[i], t[4])}`
    );
    xk[i] = _calc(`${g(t[i])} + ${h} / 2 * ${suma1} + ${h} / 1440 * ${suma3}`);
  }
  xk[n] = c4;

  console.log(
    "---------------------------------------- Pasul 3 ----------------------------------------"
  );
  // m reprezinta derivatele functiei Spline pe noduri
  let m = Array.from({ length: n + 1 });
  m[0] = c2;
  m[1] = _calc(
    `(-12 * ${xk[0]} - 65 * ${xk[1]} + 120 * ${xk[2]} - 60 * ${xk[3]} + 20 * ${xk[4]} - 3 * ${xk[5]}) / 60 / ${h}`
  );
  m[2] = _calc(
    `(3 * ${xk[0]} - 30 * ${xk[1]} - 20 * ${xk[2]} + 60 * ${xk[3]} - 15 * ${xk[4]} + 2 * ${xk[5]}) / 60 / ${h}`
  );
  for (let i = 3; i < n - 1; i++) {
    m[i] = _calc(
      `(-2 * ${xk[i - 3]} + 15 * ${xk[i - 2]} - 60 * ${xk[i - 1]} + 20 * ${
        xk[i]
      } + 30 * ${xk[i + 1]} - 3 * ${xk[i + 2]}) / 60 / ${h}`
    );
  }
  m[n - 1] = _calc(
    `(3 * ${xk[n - 5]} - 20 * ${xk[n - 4]} + 60 * ${xk[n - 3]} - 120 * ${
      xk[n - 2]
    } + 65 * ${xk[n - 1]} + 12 * ${xk[n]}) / 60 / ${h}`
  );
  m[n] = c5;

  // M reprezinta derivatele de gradul 2 a functiei Spline pe noduri
  let M = Array.from({ length: n + 1 });
  M[0] = c3;
  M[1] = _calc(
    ` (50 * ${xk[0]} - 75 * ${xk[1]} - 20 * ${xk[2]} + 70 * ${xk[3]} - 30 * ${xk[4]} + 5 * ${xk[5]}) / 60 / ${h} / ${h}`
  );
  for (let i = 2; i < n - 1; i++) {
    M[i] = _calc(
      ` (0 - ${xk[i - 2]} + 16 * ${xk[i - 1]} - 30 * ${xk[i]} + 16 * ${
        xk[i + 1]
      } - ${xk[i + 2]}) / 12 / ${h} / ${h}`
    );
  }
  M[n - 1] = _calc(
    `(50 * ${xk[n]} - 75 * ${xk[n - 1]} - 20 * ${xk[n - 2]} + 70 * ${
      xk[n - 3]
    } - 30 * ${xk[n - 4]} + 5 * ${xk[n - 5]}) / 60 / ${h} / ${h}`
  );
  M[n] = _calc(
    `(225 * ${xk[n]} - 770 * ${xk[n - 1]} + 1070 * ${xk[n - 2]} - 780 * ${
      xk[n - 3]
    } + 305 * ${xk[n - 4]} - 50 * ${xk[n - 5]}) / 60 / ${h} / ${h}`
  );

  // Calculam functia spline quintica
  let S = (T) => {
    let i = 1;
    while (T > t[i] && i < n) i++;

    let tau = _calc(`(${T} - ${t[i - 1]}) / ${h}`);

    let oneMinusTau = _calc(`1 - ${tau}`);
    return _calc(
      `${oneMinusTau} * ${oneMinusTau} * ${oneMinusTau} * (1 + 3 * ${tau} + 6 * ${tau} * ${tau}) * ${
        xk_1[i - 1]
      } + ${tau} * ${tau} * ${tau} * (4 - 3 * ${tau} + 6 * ${oneMinusTau} * ${oneMinusTau}) * ${
        xk_1[i]
      } + ${h} * ${oneMinusTau} * ${oneMinusTau} * ${oneMinusTau} * (${tau} + 3 * ${tau} * ${tau}) * ${
        m[i - 1]
      } - ${h} * ${tau} * ${tau} * ${tau} * (1 - ${tau} + 3 * ${oneMinusTau} * ${oneMinusTau}) * ${
        m[i]
      } + ${h} * ${h} / 2 * ${oneMinusTau} * ${oneMinusTau} * ${oneMinusTau} * ${tau} * ${tau} * ${
        M[i - 1]
      } + ${h} * ${h} / 2 * ${tau} * ${tau} * ${tau} * ${oneMinusTau} * ${oneMinusTau} * ${
        M[i]
      }`
    );
  };

  console.log(
    "---------------------------------------- Pasul 4 ----------------------------------------"
  );
  let SolutionIsGoodEnough = (m) => {
    if (maxSteps != 0) {
      return maxSteps <= m;
    }
    return false;
    // let maxM = xk.Skip(1).Take(n - 2).Max(), maxM_1 = xk_1.Skip(1).Take(n - 2).Max();
    // return (maxM - maxM_1).Abs < epsilon;
  };
  let k = 1;

  while (!SolutionIsGoodEnough(k)) {
    k++;
    xk_1 = [...xk];
    xk[0] = c1;

    for (let i = 1; i < n; i++) {
      let suma1 = 0;
      for (let j = 1; j <= n; j++) {
        suma1 = _calc(
          [
            suma1,
            F4(t[i], t[j - 1], xk_1[j - 1], S),
            F4(t[i], t[j], xk_1[j], S),
          ].join(" + ")
        );
      }

      let strSuma3 = `5 * (${F4(t[i], t[n], xk_1[n], S)}) - 18 * (${F4(
        t[i],
        t[n - 1],
        xk_1[n - 1],
        S
      )}) + 24 * (${F4(t[i], t[n - 2], xk_1[n - 2], S)}) - 14 * (${F4(
        t[i],
        t[n - 3],
        xk_1[n - 3],
        S
      )}) + 3 * (${F4(t[i], t[n - 4], xk_1[n - 4], S)}) + 5 * (${F4(
        t[i],
        t[0],
        xk_1[0],
        S
      )}) - 18 * (${F4(t[i], t[1], xk_1[1], S)}) + 24 * (${F4(
        t[i],
        t[2],
        xk_1[2],
        S
      )}) - 14 * (${F4(t[i], t[3], xk_1[3], S)}) + 3 * (${F4(
        t[i],
        t[4],
        xk_1[4],
        S
      )})`;

      let suma3 = _calc(strSuma3);

      // debugger;
      xk[i] = _calc(
        `${g(t[i])} + (${h} / 2) * (${suma1}) + (${h} / 1440) * (${suma3})`
      );
    }

    xk[n] = c4;

    console.log(
      "---------------------------------------- Pasul 5 ----------------------------------------"
    );
    m[0] = c2;
    m[1] = _calc(
      `(-12 * ${xk[0]} - 65 * ${xk[1]} + 120 * ${xk[2]} - 60 * ${xk[3]} + 20 * ${xk[4]} - 3 * ${xk[5]}) / 60 / ${h}`
    );
    m[2] = _calc(
      `(3 * ${xk[0]} - 30 * ${xk[1]} - 20 * ${xk[2]} + 60 * ${xk[3]} - 15 * ${xk[4]} + 2 * ${xk[5]}) / 60 / ${h}`
    );
    for (let i = 3; i < n - 1; i++) {
      m[i] = _calc(
        `(-2 * ${xk[i - 3]} + 15 * ${xk[i - 2]} - 60 * ${xk[i - 1]} + 20 * ${
          xk[i]
        } + 30 * ${xk[i + 1]} - 3 * ${xk[i + 2]}) / 60 / ${h}`
      );
    }
    m[n - 1] = _calc(
      `(3 * ${xk[n - 5]} - 20 * ${xk[n - 4]} + 60 * ${xk[n - 3]} - 120 * ${
        xk[n - 2]
      } + 65 * ${xk[n - 1]} + 12 * ${xk[n]}) / 60 / ${h})`
    );
    m[n] = c5;

    M[0] = c3;
    M[1] = _calc(
      ` (50 * ${xk[0]} - 75 * ${xk[1]} - 20 * ${xk[2]} + 70 * ${xk[3]} - 30 * ${xk[4]} + 5 * ${xk[5]}) / 60 / ${h} / ${h} `
    );
    for (let i = 2; i < n - 1; i++) {
      M[i] = _calc(
        ` (0 - ${xk[i - 2]} + 16 * ${xk[i - 1]} - 30 * ${xk[i]} + 16 * ${
          xk[i + 1]
        } - ${xk[i + 2]}) / 12 / ${h} / ${h} `
      );
    }
    M[n - 1] = _calc(
      ` (50 * ${xk[n]} - 75 * ${xk[n - 1]} - 20 * ${xk[n - 2]} + 70 * ${
        xk[n - 3]
      } - 30 * ${xk[n - 4]} + 5 * ${xk[n - 5]}) / 60 / ${h} / ${h} `
    );
    M[n] = _calc(
      ` (225 * ${xk[n]} - 770 * ${xk[n - 1]} + 1070 * ${xk[n - 2]} - 780 * ${
        xk[n - 3]
      } + 305 * ${xk[n - 4]} - 50 * ${xk[n - 5]}) / 60 / ${h} / ${h} `
    );
  }
  return { t, xk };
}

let _m_ = new Map();
function _calc(f, decimales = 50, showLog = false) {
  if (_m_.has(f)) return _m_.get(f);
  full.my.parser.radiansQ = false; // full.my.toggles.rad
  full.my.parser.newParse(f);

  let s = full.my.parser.getVal().toPrecision(decimales);
  let r = full.fmtNum(s);
  _m_.set(f, r);
  // if (showLog) console.log(f, "=", r);
  return r;
}
full.init();

console.time("Calculare");
const { t, xk } = Calculare();
console.timeEnd("Calculare");

let xt = (t) => _calc(`${t} ^ 6`);

let table = [];
for (let i = 0; i <= n; i++) {
  table.push({
    ti: t[i],
    xk: xk[i],
    xt: xt(t[i]),
    error: _calc(
      (xk[i] + "").replace("-", "") + "-" + xt(t[i]).replace("-", "")
    ).replace("-", ""),
  });
}
// return m;
// console.table(table);

// console.log("Min error: ", Math.min(...table.map((x) => x.error || 999)));
console.log("Max error: ", Math.max(...table.map((x) => x.error)));
// console.log(v);
