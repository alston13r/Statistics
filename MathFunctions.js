const PI = Math.PI
const HALF_PI = PI/2
const TWO_PI = PI*2

function singleOrArray(func, ...params) {
  let x = params.shift()
  if (x instanceof Array) {
    let res = []
    for (let y of x) res.push(func(y, ...params))
    return res
  }
  return func(x, ...params)
}

const radToDeg = x => singleOrArray(x => x*180/PI, x)
const degToRad = x => singleOrArray(x => x*PI/180, x)

const floor = x => singleOrArray(Math.floor, x)
const ceil = x => singleOrArray(Math.ceil, x)

const map = (x, a, b, c, d) => singleOrArray((x, a, b, c, d) => (x-a)/(b-a)*(d-c)+c, x, a, b, c, d)
const lerp = (t, a, b) => map(t, 0, 1, a, b)

const sin = (x, d) => singleOrArray((x, d) => !d?Math.sin(x):sin(degToRad(x)), x, d)
const cos = (x, d) => singleOrArray((x, d) => !d?Math.cos(x):cos(degToRad(x)), x, d)
const tan = (x, d) => singleOrArray((x, d) => !d?Math.tan(x):tan(degToRad(x)), x, d)
const asin = (x, d) => singleOrArray((x, d) => !d?Math.asin(x):radToDeg(asin(x)), x, d)
const acos = (x, d) => singleOrArray((x, d) => !d?Math.acos(x):radToDeg(acos(x)), x, d)
const atan = (x, d) => singleOrArray((x, d) => !d?Math.atan(x):radToDeg(atan(x)), x, d)
const sinh = (x, d) => singleOrArray((x, d) => !d?Math.sinh(x):sinh(degToRad(x)), x, d)
const cosh = (x, d) => singleOrArray((x, d) => !d?Math.cosh(x):cosh(degToRad(x)), x, d)
const tanh = (x, d) => singleOrArray((x, d) => !d?Math.tanh(x):tanh(degToRad(x)), x, d)
const asinh = (x, d) => singleOrArray((x, d) => !d?Math.asinh(x):radToDeg(asinh(x)), x, d)
const acosh = (x, d) => singleOrArray((x, d) => !d?Math.acosh(x):radToDeg(acosh(x)), x, d)
const atanh = (x, d) => singleOrArray((x, d) => !d?Math.atanh(x):radToDeg(atanh(x)), x, d)

const round = (x, p) => singleOrArray((x, a) => Math.round(x*a)/a, x, 10**p)

function rand(a, b, c) {
  if (c == undefined) {
    if (b == undefined) {
      if (a == undefined) return Math.random()
      return rand()*a
    }
    return rand(b-a) + a
  }
  let res = []
  for (let i=0; i<c; i++) res.push(rand(a, b))
  return res
}

function randInt(a, b, c) {
  if (c == undefined) {
    if (b == undefined) return floor(rand(a+1))
    return randInt(b-a) + a
  }
  let res = []
  for (let i=0; i<c; i++) res.push(randInt(a, b))
  return res
}