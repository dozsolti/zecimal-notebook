console.clear()
const isDigit = (x) => x?.match(/\d/) != null
const isSymb = (x) => x?.match(/\+|-|\*|\/|\(|\)|\s/) != null

const isSpec = (x) => x?.match(/[a-z]|\[|\]|\(|\)/i) != null

export function wrapNonNumbers(inputString) {
  let s = ""

  let isParenthesis = false
  for (let i = 0; i < inputString.length; i++) {
    let c = inputString[i]
    if (isDigit(c) || isSymb(c)) s += c
    else {
      s += " ${"

      while (
        i < inputString.length &&
        (isParenthesis || inputString[i].match(/\+|-|\*|\/|\s/) == null
)
      ) {
        if (inputString[i].match(/\[|\(/) != null) isParenthesis = true
        if (inputString[i].match(/\]|\)/) != null) isParenthesis = false
        s += inputString[i]
        i++
      }

      s += "} "
    }
  }
  return s
}

// Example Usage:
const inputExpression =
  "(-12 *c0 * xk[0+1] - 65 * xk[100*2] + add(1,2) + 120 * xk[2/2] - 60 * xk[3] + 20 * xk[4] - 3 * xk[5]) / 60 / h"
const transformedExpression = wrapNonNumbers(inputExpression)
console.log(transformedExpression)
