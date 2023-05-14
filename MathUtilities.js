const specialCharacters = ['Σ','μ','σ','x̄']

class Matrix {
  constructor(r,c) {
    if (r instanceof Array) {
      if (r[0] instanceof Array) {
        this.r = r.length
        this.c = r[0].length
        this.grid = []
        for (let i=0;i<this.r;i++) this.grid[i] = [...r[i]]
      } else {
        this.r = r.length
        this.c = 1
        this.grid = []
        for (let i=0;i<this.r;i++) this.grid[i] = [r[i]]
      }
    } else if (r instanceof Matrix) {
      this.r = r.r
      this.c = r.c
      this.grid = []
      for (let i=0;i<this.r;i++) this.grid[i] = [...r.grid[i]]
    } else {
      this.r = r
      this.c = c
      this.grid = []
      for (let i=0;i<r;i++) {
        this.grid[i] = []
        for (let j=0;j<c;j++) this.grid[i][j] = 0
      }
    }
  }
  *[Symbol.iterator]() {
    yield* this.toArray()
  }
  static map(m,fn) {
    for (let i=0;i<m.r;i++) for (let j=0;j<m.c;j++) m.grid[i][j] = fn(m.grid[i][j],i,j,m)
    return m
  }
  map(fn) {
    return Matrix.map(this.copy(),fn)
  }
  static copy(m) {
    let n = new Matrix(m.r,m.c)
    for (let i=0;i<m.r;i++) n.grid[i] = [...m.grid[i]]
    return n
  }
  copy() {
    return Matrix.copy(this)
  }
  static toArray(m) {
    let res = []
    m.map(e => res.push(e))
    return res
  }
  toArray() {
    return Matrix.toArray(this)
  }
  static summate(m) {
    let sum = 0
    m.map(e => sum += e)
    return sum
  }
  summate() {
    return Matrix.summate(this)
  }
  static add(m,x) {
    if (x instanceof Matrix) {
      if (m.r!=x.r||m.c!=x.c) throw Error('Matrix incompatibility - addition')
      return Matrix.map(m,(e,i,j) => e+x.grid[i][j])
    } return Matrix.map(m,e => e+x)
  }
  add(x) {
    return Matrix.add(this.copy(),x)
  }
  static mul(m,x) {
    if (x instanceof Matrix) {
      if (m.r!=x.r||m.c!=x.c) throw Error('Matrix incompatibility - multiplication')
      return Matrix.map(m,(e,i,j) => e*x.grid[i][j])
    } return Matrix.map(m,e => e*x)
  }
  mul(x) {
    return Matrix.mul(this.copy(),x)
  }
  static sub(m,x) {
    if (x instanceof Matrix) {
      if (m.r!=x.r||m.c!=x.c) throw Error('Matrix incompatibility - subtraction')
      return Matrix.add(m,x.mul(-1))
    } return Matrix.map(m,e => e-x)
  }
  sub(x) {
    return Matrix.sub(this.copy(),x)
  }
  static div(m,x) {
    if (x instanceof Matrix) {
      if (m.r!=x.r||m.c!=x.c) throw Error('Matrix incompatibility - subtraction')
      return Matrix.map(m,(e,i,j) => e/x.grid[i][j])
    } return Matrix.map(m,e => e/x)
  }
  div(x) {
    return Matrix.div(this.copy(),x)
  }
  static dot(a,b) {
    if (a.c != b.r) throw Error('Matrix incompatibility - dot product')
    let m = new Matrix(a.r,b.c)
    return m.map((e,i,j) => {
      let sum = 0
      for (let k=0;k<a.c;k++) sum += a.grid[i][k]*b.grid[k][j]
      return sum
    })
  }
  dot(m) {
    return Matrix.dot(this,m)
  }
  static randomize(m) {
    return Matrix.map(m,() => Math.random()*2-1)
  }
  randomize() {
    return Matrix.randomize(this.copy())
  }
  static transpose(m) {
    let tGrid = []
    for (let i=0;i<m.c;i++) {
      tGrid[i] = []
      for (let j=0;j<m.r;j++) tGrid[i][j] = m.grid[j][i]
    }
    let td = m.r
    m.r = m.c
    m.c = td
    m.grid = tGrid
    return m
  }
  transpose() {
    let m = new Matrix(this.c,this.r)
    return m.map((e,i,j) => this.grid[j][i])
  }
  static numerize(m) {
    return Matrix.map(m,(e,i,j) => i*m.c+j)
  }
  numerize() {
    return Matrix.numerize(this.copy())
  }
  static latticeMulDiagonalSum(m) {
    let res = []
    for (let i=0; i<m.r+m.c-1; i++) res[i] = 0
    m.map((e, i, j) => res[i+j] += e)
    return res
  }
  latticeMulDiagonalSum() {
    return Matrix.latticeMulDiagonalSum(this)
  }
}

class List {
  constructor(a) {
    this.elements = a!=undefined?[...a]:[]
    this.setIndecies()
  }
  clearIndecies() {
    for (let i=0;i<this.length;i++) delete this[i]
  }
  setIndecies() {
    this.clearIndecies()
    for (let k in this.elements) {
      Object.defineProperty(this, k, {
        configurable: true,
        get: () => this.elements[k],
        set: value => this.elements[k] = value
      })
    }
  }
  get length() {
    return this.elements.length
  }
  *[Symbol.iterator]() {
    yield* this.elements
  }
  static push(l, ...e) {
    l.elements.push(...e)
    l.setIndecies()
    return l
  }
  push(...e) {
    return List.push(this.copy(), ...e)
  }
  static copy(l) {
    return new List(l.elements)
  }
  copy() {
    return List.copy(this)
  }
  static map(l, fn) {
    for (let i=0;i<l.length;i++) l.elements[i] = fn(l[i], i, l)
    return l
  }
  map(fn) {
    return List.map(this.copy(), fn)
  }
  static leastToGreatest(l) {
    l.elements.sort((a,b) => a-b)
    return l
  }
  leastToGreatest() {
    return List.leastToGreatest(this.copy())
  }
  static greatestToLeast(l) {
    l.elements.sort((a,b) => b-a)
    return l
  }
  greatestToLeast() {
    return List.greatestToLeast(this.copy())
  }
  static sum(l) {
    let s = 0
    for (let x of l) s += x
    return s
  }
  sum() {
    return List.sum(this)
  }
  static mean(l) {
    let s = l.sum()
    return s/l.length
  }
  mean() {
    return List.mean(this)
  }
  static median(l) {
    let s = l.leastToGreatest()
    if (s.length%2==0) {
      let h = s.length/2
      return (s[h]+s[h-1])/2
    }
    return s
  }
  median() {
    return List.median(this)
  }
  static min(l) {
    let a = Infinity
    for (let x of l) if (x < a) a = x
    return a
  }
  min() {
    return List.min(this)
  }
  static max(l) {
    let a = -Infinity
    for (let x of l) if (x > a) a = x
    return a
  }
  max() {
    return List.max(this)
  }
  static range(l) {
    return l.max()-l.min()
  }
  range() {
    return List.range(this)
  }
  static slice(l, a, b) {
    let s = l.elements.slice(a, b)
    l.clearIndecies()
    l.elements = s
    l.setIndecies()
    return l
  }
  slice(a, b) {
    return List.slice(this.copy(), a, b)
  }
  static Q1(l) {
    let s = l.leastToGreatest()
    if (s.length%2==0) return s.slice(0, s.length/2).median()
    return s.slice(0, floor(s.length/2)).median()
  }
  Q1() {
    return List.Q1(this)
  }
  static Q3(l) {
    let s = l.greatestToLeast()
    if (s.length%2==0) return s.slice(0, s.length/2).median()
    return s.slice(0, floor(s.length/2)).median()
  }
  Q3() {
    return List.Q3(this)
  }
  static IQR(l) {
    return l.Q3() - l.Q1()
  }
  IQR() {
    return List.IQR(this)
  }
  static outliers(l) {
    let o = new List()
    let iqr = l.IQR()
    let a = l.Q1()-1.5*iqr
    let b = l.Q3()+1.5*iqr
    for (let x of l) if (x < a || x > b) o.push(x)
    return o
  }
  outliers() {
    return List.outliers(this)
  }
  static fiveNumberSummary(l) {
    return [l.min(), l.Q1(), l.median(), l.Q3(), l.max()]
  }
  fiveNumberSummary() {
    return List.fiveNumberSummary(this)
  }
  static variability(l, nSub) {
    let a = l.mean()
    let n = l.length - nSub
    let m = l.map(x => (x-a)**2)
    return m.sum()/n
  }
  variability(nSub) {
    return List.variability(this, nSub)
  }
  static variance(l, sample) {
    return List.variability(l, sample?l.length-1:l.length)
  }
  variance(sample) {
    return List.variance(this, sample)
  }
  static standardDeviation(l, sample) {
    return sqrt(l.variance(sample))
  }
  standardDeviation(sample) {
    return List.standardDeviation(this, sample)
  }
  static correlation(x, y) {
    if (x.length != y.length) return
    let xb = x.mean()
    let sx = x.standardDeviation(true)
    let yb = y.mean()
    let sy = y.standardDeviation(true)
    return x.map(a => (a-xb)/sx).map((a,i) => a*(y[i]-yb)/sy).sum()/(x.length-1)
  }
  correlation(l) {
    return List.correlation(this, l)
  }
  static determination(x, y) {
    return List.correlation(x, y)**2
  }
  determination(l) {
    return List.determination(this, l)
  }
  static linRegSlope(x, y) {
    return List.correlation(x, y)*y.standardDeviation(true)/x.standardDeviation(true)
  }
  linRegSlope(l) {
    return List.linRegSlope(this, l)
  }
  static linRegIntercept(x, y) {
    return y.mean()-(List.linRegSlope(x, y)*x.mean())
  }
  linRegIntercept(l) {
    return List.linRegIntercept(this, l)
  }
}

function singleOrArray(func, ...params) {
  let x = params.shift()
  if (x instanceof Array) {
    let res = []
    for (let y of x) res.push(func(y, ...params))
    return res
  }
  return func(x, ...params)
}

const radToDeg = x => singleOrArray(x => x*180/Math.PI, x)
const degToRad = x => singleOrArray(x => x*Math.PI/180, x)

const floor = x => singleOrArray(Math.floor, x)
const ceil = x => singleOrArray(Math.ceil, x)
const sqrt = x => singleOrArray(Math.sqrt, x)
const exp = x => singleOrArray(Math.exp, x)
const abs = x => singleOrArray(Math.abs, x)

const max = (...x) => singleOrArray(Math.max, ...x)
const min = (...x) => singleOrArray(Math.min, ...x)

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

const round = (x, p) => singleOrArray((x, a) => Math.round(x*a)/a, x, 10**(p!=undefined?p:0))
const trunc = (x, p) => singleOrArray((x, a) => Math.trunc(x*a)/a, x, 10**(p!=undefined?p:0))

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

function randGaussian(a) {
  if (a == undefined) {
    let t = 0
    for (let i=0;i<6;i++) t += rand()
    return t / 6
  }
  let res = []
  for (let i=0;i<a;i++) res.push(randGaussian())
  return res
}