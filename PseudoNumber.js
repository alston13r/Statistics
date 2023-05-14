class PseudoNumber {
  static sqrt2 = new PseudoNumber('1.4142135623730950488016887242096980785697')
  static cbrt2 = new PseudoNumber('1.2599210498948731647672106072782283505703')
  static sqrt3 = new PseudoNumber('1.7320508075688772935274463415058723669428')
  static cbrt3 = new PseudoNumber('1.4422495703074083823216383107801095883919')
  static e = new PseudoNumber('2.7182818284590452353602874713526624977572')
  static pi = new PseudoNumber('3.1415926535897932384626433832795028841972')
  static half_pi = new PseudoNumber('1.5707963267948966192313216916397514420986')
  static two_pi = new PseudoNumber('6.2831853071795864769252867665590057683943')
  static root_pi = new PseudoNumber('1.7724538509055160272981674833411451827975')
  static root_half_pi = new PseudoNumber('1.2533141373155002512078826424055226265035')
  static root_two_pi = new PseudoNumber('2.506628274631000502415765284811045253007')
  constructor(n) {
    if (n != undefined) this.pseudo = typeof n==='string' ? n : n.toString()
    else this.pseudo = '0'

    if (this.pseudo.indexOf('-') != -1) {
      this.pseudo = this.pseudo.split('-')[1]
      this.sign = '-'
    } else this.sign = '+'

    PseudoNumber.clean(this)
  }
  static clean(n) {
    let sf = false
    if (n.pseudo.indexOf('-') != -1) {
      n.pseudo = n.pseudo.split('-')[1]
      sf = true
    }
    let newD = ''
    if (n.hasDecimals()) {
      let dec = n.getDecimals()
      let decF = true
      for (let i=dec.length-1; i>=0; i--) {
        if (decF && dec[i]!=='0') decF = false
        if (!decF) newD = dec[i]+newD
      }
    }
    let newB = ''
    let baseF = true
    let base = n.getBase()
    for (let i=0; i<base.length; i++) {
      if (baseF && base[i]!=='0') baseF = false
      if (!baseF) newB += base[i]
    }
    if (newB == '') newB = '0'
    n.pseudo = newB+(newD.length>0?'.'+newD:'')
    if (n.isZero()) {
      n.sign = '+'
      n.pseudo = '0'
    }
    if (sf) n.flipSign()
    return n
  }
  clean() {
    return PseudoNumber.clean(this)
  }
  static copyFrom(a, b) {
    a = PseudoNumber.EnsurePseudo(a)
    b = PseudoNumber.EnsurePseudo(b)
    a.pseudo = b.pseudo
    a.sign = b.sign
    return a.clean()
  }
  copy() {
    return new PseudoNumber(this.toString())
  }
  static EnsurePseudo(x) {
    if (typeof x === 'number' || typeof x === 'string') {
      return new PseudoNumber(x)
    }
    if (x instanceof PseudoNumber) return x
  }
  static max(...x) {
    if (x.length > 0) {
      for (let [i,e] of x.entries()) x[i] = PseudoNumber.EnsurePseudo(e)
      if (x.length == 1) return x[0].copy()
      let t = x[0]
      for (let i=1; i<x.length; i++) if (x[i].greaterThan(t)) t = x[i]
      return t.copy()
    } return new PseudoNumber()
  }
  static min(...x) {
    if (x.length > 0) {
      for (let [i,e] of x.entries()) x[i] = PseudoNumber.EnsurePseudo(e)
      if (x.length == 1) return x[0].copy()
      let t = x[0]
      for (let i=1; i<x.length; i++) if (x[i].lessThan(t)) t = x[i]
      return t.copy()
    } return new PseudoNumber()
  }
  static round(n, p) {
    n = PseudoNumber.EnsurePseudo(n)
    PseudoNumber.shiftDecimal(n, p)
    if (n.hasDecimals()) {
      let d = n.getDecimals()[0]
      if (n.isPositive()) {
        if (d >= 5) PseudoNumber.ceil(n)
        else PseudoNumber.floor(n)
      } else {
        if (d < 5) PseudoNumber.ceil(n)
        else if (d > 5) PseudoNumber.floor(n)
        else {
          if (n.shiftDecimal(1).hasDecimals()) PseudoNumber.floor(n)
          else PseudoNumber.ceil(n)
        }
      }
    }
    PseudoNumber.shiftDecimal(n, -p)
    return n.clean()
  }
  round(p) {
    return PseudoNumber.round(this.copy(), p)
  }
  static floor(n, p) {
    n = PseudoNumber.EnsurePseudo(n)
    PseudoNumber.shiftDecimal(n, p)
    if (n.hasDecimals()) {
      PseudoNumber.trunc(n)
      if (n.isNegative()) PseudoNumber.sub(n, 1)
    }
    PseudoNumber.shiftDecimal(n, -p)
    return n.clean()
  }
  floor(p) {
    return PseudoNumber.floor(this.copy(), p)
  }
  static ceil(n, p) {
    n = PseudoNumber.EnsurePseudo(n)
    PseudoNumber.shiftDecimal(n, p)
    if (n.hasDecimals()) {
      PseudoNumber.trunc(n)
      if (n.isPositive()) PseudoNumber.add(n, 1)
    }
    PseudoNumber.shiftDecimal(n, -p)
    return n.clean()
  }
  ceil(p) {
    return PseudoNumber.ceil(this.copy(), p)
  }
  static trunc(n, p) {
    n = PseudoNumber.EnsurePseudo(n)
    if (p == undefined || p == 0) {
      n.pseudo = n.getBase()
    } else {
      PseudoNumber.shiftDecimal(n, p)
      n.pseudo = n.getBase()
      PseudoNumber.shiftDecimal(n, -p)
    }
    return n.clean()
  }
  trunc(p) {
    return PseudoNumber.trunc(this.copy(), p)
  }
  static isZero(n) {
    n = PseudoNumber.EnsurePseudo(n)
    if (n.pseudo === '') return true
  }
  isZero() {
    return PseudoNumber.isZero(this)
  }
  static abs(n) {
    n = PseudoNumber.EnsurePseudo(n)
    n.sign = '+'
    return n
  }
  abs() {
    return PseudoNumber.abs(this.copy())
  }
  static flipSign(n) {
    n = PseudoNumber.EnsurePseudo(n)
    n.sign = n.isPositive() ? '-' : '+'
    return n
  }
  flipSign() {
    return PseudoNumber.flipSign(this.copy())
  }
  static shiftDecimal(n, s) {
    n = PseudoNumber.EnsurePseudo(n)
    let base = n.getBase()
    if (s > 0) {
      if (n.hasDecimals()) {
        let dec = n.getDecimals()
        let shft = dec.substring(0, s)
        while (shft.length < s) shft += '0'
        base += shft
        dec = dec.substring(s)
        n.pseudo = base+'.'+dec
      } else {
        for (let i=0; i<s; i++) n.pseudo += '0'
      }
    } else if (s < 0) {
      s = abs(s)
      if (n.hasDecimals()) {
        let dec = n.getDecimals()
        let shft = base.substring(base.length-s)
        while (shft.length < s) shft = '0'+shft
        dec = shft+dec
        base = base.substring(0, base.length-s)
        n.pseudo = base+'.'+dec
      } else {
        let dec = base.substring(base.length-s)
        while (dec.length < s) dec = '0'+dec
        base = base.substring(0, base.length-s)
        n.pseudo = base+'.'+dec
      }
    }
    return PseudoNumber.clean(n)
  }
  shiftDecimal(s) {
    return PseudoNumber.shiftDecimal(this.copy(), s)
  }
  static equals(a, b) {
    a = PseudoNumber.EnsurePseudo(a)
    b = PseudoNumber.EnsurePseudo(b)

    return a.pseudo == b.pseudo && a.sign == b.sign
  }
  equals(n) {
    return PseudoNumber.equals(this, n)
  }
  static greaterThan(a, b) {
    a = PseudoNumber.EnsurePseudo(a)
    b = PseudoNumber.EnsurePseudo(b)

    let ap = a.isPositive()
    let bp = b.isPositive()
    if (ap && !bp) return true
    if (!ap && bp) return false
    if (a.equals(b)) return false
    if (ap) {
      let aBase = a.getBase()
      let bBase = b.getBase()
      if (aBase.length > bBase.length) return true
      if (bBase.length > aBase.length) return false
      for (let i=0; i<aBase.length; i++) {
        let ad = aBase[i]
        let bd = bBase[i]
        if (ad == bd) continue
        return ad > bd
      }
      let aDec = a.hasDecimals()
      let bDec = b.hasDecimals()
      if (aDec && !bDec) return true
      if (!aDec && bDec) return false
      let aDecs = a.getDecimals()
      let bDecs = b.getDecimals()
      let aDecLen = aDecs.length
      let bDecLen = bDecs.length
      let minDecLen = Math.min(aDecLen, bDecLen)
      for (let i=0; i<minDecLen; i++) {
        let ad = aDecs[i]
        let bd = bDecs[i]
        if (ad == bd) continue
        return ad > bd
      }
      return aDecLen > bDecLen
    } else {
      return PseudoNumber.greaterThan(b.flipSign(), a.flipSign())
    }
  }
  greaterThan(n) {
    return PseudoNumber.greaterThan(this, n)
  }
  static greaterThanEqualTo(a, b) {
    return PseudoNumber.equals(a, b) || PseudoNumber.greaterThan(a, b)
  }
  greaterThanEqualTo(n) {
    return PseudoNumber.greaterThanEqualTo(this, n)
  }
  static lessThan(a, b) {
    return PseudoNumber.greaterThan(b, a)
  }
  lessThan(n) {
    return PseudoNumber.lessThan(this, n)
  }
  static lessThanEqualTo(a, b) {
    return PseudoNumber.equals(a, b) || PseudoNumber.lessThan(a, b)
  }
  lessThanEqualTo(n) {
    return PseudoNumber.lessThanEqualTo(this, n)
  }
  static add(a, b) {
    a = PseudoNumber.EnsurePseudo(a)
    b = PseudoNumber.EnsurePseudo(b)

    let as = a.isPositive()
    let bs = b.isPositive()
    if (as) {
      if (bs) {
        PseudoNumber.clean(a)
        PseudoNumber.clean(b)

        let aDec = a.hasDecimals()
        let bDec = b.hasDecimals()
        let aBase = a.getBase()
        let bBase = b.getBase()

        let c = 0
        let newD = ''
        if (aDec || bDec) {
          let aDecs = aDec ? a.getDecimals() : '0'
          let bDecs = bDec ? b.getDecimals() : '0'
          let maxD = Math.max(aDecs.length, bDecs.length)
          for (let i=aDecs.length; i<maxD; i++) aDecs += '0'
          for (let i=bDecs.length; i<maxD; i++) bDecs += '0'
          for (let i=maxD-1; i>=0; i--) {
            let s = parseInt(aDecs[i]) + parseInt(bDecs[i]) + c
            if (s >= 10) {
              c = floor(s/10)
              s %= 10
            } else c = 0
            newD = s+newD
          }
        }

        let newB = ''
        let maxB = Math.max(aBase.length, bBase.length)
        for (let i=aBase.length; i<maxB; i++) aBase = '0'+aBase
        for (let i=bBase.length; i<maxB; i++) bBase = '0'+bBase
        for (let i=maxB-1; i>=0; i--) {
          let s = parseInt(aBase[i]) + parseInt(bBase[i]) + c
          if (s >= 10) {
            c = floor(s/10)
            s %= 10
          } else c = 0
          newB = s+newB
        }
        newB = c+newB
        a.pseudo = newB+(newD.length>0?'.'+newD:'')
        return PseudoNumber.clean(a)
      } else {
        return PseudoNumber.sub(a, b.flipSign())
      }
    } else {
      if (bs) {
        let c = PseudoNumber.sub(b.copy(), a.flipSign())
        return PseudoNumber.copyFrom(a, c)
      } else {
        return PseudoNumber.add(a.flipSign(), b.flipSign()).flipSign()
      }
    }
  }
  add(n) {
    return PseudoNumber.add(this.copy(), n)
  }
  static sub(a, b) {
    a = PseudoNumber.EnsurePseudo(a)
    b = PseudoNumber.EnsurePseudo(b)

    let as = a.isPositive()
    let bs = b.isPositive()
    if (as) {
      if (bs) {
        PseudoNumber.clean(a)
        PseudoNumber.clean(b)

        if (a.equals(b)) return PseudoNumber.copyFrom(a, 0)
        else if (a.greaterThan(b)) {
          let aDec = a.hasDecimals()
          let bDec = b.hasDecimals()
          let aBase = a.getBase()
          let bBase = b.getBase()
  
          let borrow = 0
          let newD = ''
          if (aDec || bDec) {
            let aDecs = aDec ? a.getDecimals() : '0'
            let bDecs = bDec ? b.getDecimals() : '0'
            let maxD = Math.max(aDecs.length, bDecs.length)
            for (let i=aDecs.length; i<maxD; i++) aDecs += '0'
            for (let i=bDecs.length; i<maxD; i++) bDecs += '0'
            for (let i=maxD-1; i>=0; i--) {
              let d = parseInt(aDecs[i]) - parseInt(bDecs[i]) - borrow
              if (d < 0) {
                borrow = 1
                d += 10
              } else borrow = 0
              newD = d+newD
            }
          }
          let newB = ''
          let maxB = Math.max(aBase.length, bBase.length)
          for (let i=aBase.length; i<maxB; i++) aBase = '0'+aBase
          for (let i=bBase.length; i<maxB; i++) bBase = '0'+bBase
          for (let i=maxB-1; i>=0; i--) {
            let d = parseInt(aBase[i] - parseInt(bBase[i])) - borrow
            if (d < 0) {
              borrow = 1
              d += 10
            } else borrow = 0
            newB = d+newB
          }
          a.pseudo = newB+(newD.length>0?'.'+newD:'')
          return PseudoNumber.clean(a)
        } else {
          let c = PseudoNumber.sub(b.copy(), a).flipSign()
          return PseudoNumber.copyFrom(a, c)
        }
      } else {
        return PseudoNumber.add(a, b.flipSign())
      }
    } else {
      if (bs) {
        let c = PseudoNumber.add(a.flipSign(), b.copy()).flipSign()
        return PseudoNumber.copyFrom(a, c)
      } else {
        return PseudoNumber.sub(b.flipSign(), a.flipSign())
      }
    }
  }
  sub(n) {
    return PseudoNumber.sub(this.copy(), n)
  }
  static mul(a, b) {
    a = PseudoNumber.EnsurePseudo(a)
    b = PseudoNumber.EnsurePseudo(b)
    let decimals = 0
    let top = []
    for (let d of a.getBase()) top.push(parseInt(d))
    if (a.hasDecimals()) {
      let dec = a.getDecimals()
      decimals += dec.length
      for (let d of dec) top.push(parseInt(d))
    }
    let side = []
    for (let d of b.getBase()) side.push(parseInt(d))
    if (b.hasDecimals()) {
      let dec = b.getDecimals()
      decimals += dec.length
      for (let d of dec) side.push(parseInt(d))
    }
    let bottomLattice = new Matrix(side.length, top.length)
    Matrix.map(bottomLattice, (e, i, j) => top[j]*side[i])
    let topLattice = bottomLattice.map(e => floor(e/10))
    Matrix.map(bottomLattice, e => e%10)

    let botSum = bottomLattice.latticeMulDiagonalSum()
    let topSum = topLattice.latticeMulDiagonalSum()

    topSum.push(0)
    botSum.splice(0, 0, 0)

    let res = []
    for (let i=0; i<top.length+side.length; i++) res[i] = topSum[i] + botSum[i]

    for (let i=res.length-1; i>=0; i--) {
      if (res[i] >= 10) {
        let c = floor(res[i]/10)
        res[i] %= 10
        if (i == 0) {
          res.splice(i, 0, 0)
          i++
        }
        res[i-1] += c
      }
    }
    let n = res.join('')
    let c = new PseudoNumber(n.slice(0, n.length-decimals)+'.'+n.slice(n.length-decimals))
    if (a.isPositive() != b.isPositive()) PseudoNumber.flipSign(c)

    return PseudoNumber.copyFrom(a, c)
  }
  mul(n) {
    return PseudoNumber.mul(this.copy(), n)
  }
  static div(a, b, p) {
    a = PseudoNumber.EnsurePseudo(a)
    b = PseudoNumber.EnsurePseudo(b)

    let aDecLen = a.getDecimalLength()
    let bDecLen = b.getDecimalLength()
    let decimalPlaces = aDecLen-bDecLen

    let precision
    if (p <= 0 || p == undefined) precision = 0
    else precision = p

    if (precision == 0) {
      if (b.greaterThan(a)) return PseudoNumber.copyFrom(a, 0).clean()
      else if (b.equals(a)) return PseudoNumber.copyFrom(a, 1).clean()
    }
    precision++

    let am = a.getSplit().join('')
    let divisor = new PseudoNumber(b.getSplit().join(''))

    let borrowing = false
    let quotient = ''
    let remainder = new PseudoNumber()
    for (let i=0; i<am.length; i++) {
      if (borrowing && remainder.equals(0)) {
        return PseudoNumber.copyFrom(a, new PseudoNumber(quotient).shiftDecimal(am.length-precision-i)).clean()
      }
      let quot
      let dividend = remainder.shiftDecimal(1).add(am[i])
      if (dividend.equals(divisor)) {
        quot = 1
        remainder = new PseudoNumber()
      } else if (dividend.lessThan(divisor)) {
        quot = 0
        remainder = dividend.copy()
      } else {
        quot = 2
        let t = divisor.mul(quot)
        while (t.lessThanEqualTo(dividend)) t = divisor.mul(++quot)
        quot--
        remainder = dividend.sub(divisor.mul(quot))
      }
      quotient += quot

      if (i == am.length-1 && !borrowing) {
        for (let j=0; j<precision-decimalPlaces; j++) am += '0'
        borrowing = true
      }
    }

    return PseudoNumber.copyFrom(a, new PseudoNumber(quotient).shiftDecimal(-precision).round(precision-1))
  }
  div(n, p) {
    return PseudoNumber.div(this.copy(), n, p)
  }
  static mod(n, d) {
    n = PseudoNumber.EnsurePseudo(n)
    d = PseudoNumber.EnsurePseudo(d)
    if (n.lessThan(d)) return n.copy()
    if (n.equals(d)) return new PseudoNumber()
    let q = 2
    let t = d.mul(q)
    while(t.lessThanEqualTo(n)) t = d.mul(++q)
    q--
    return n.sub(d.mul(q))
  }
  mod(d) {
    return PseudoNumber.mod(this, d)
  }
  static pow(n, power, precision) {
    n = PseudoNumber.EnsurePseudo(n)
    power = PseudoNumber.EnsurePseudo(power)
    let t = n.copy()
    for (let i=1; PseudoNumber.lessThan(i, power); i++) PseudoNumber.mul(t, n)
    if (precision != undefined) PseudoNumber.round(t, precision)
    return PseudoNumber.copyFrom(n, t)
  }
  pow(power, precision) {
    return PseudoNumber.pow(this.copy(), power, precision)
  }
  static nroot(n, root, precision) {
    n = PseudoNumber.EnsurePseudo(n)
    root = PseudoNumber.EnsurePseudo(root)
    let terms = [n.div(root).add(rand())]
    let calcing = true
    let A = root.sub(1).div(root, precision+5)
    let B = n.div(root, precision+5)
    main: while (calcing) {
      let prevTerm = terms[terms.length-1]
      let C = PseudoNumber.div(1, (prevTerm.pow(root.sub(1), precision+5)), precision+5)
      terms.push(A.mul(prevTerm).add(B.mul(C)))
      let lastTerm = terms[terms.length-1]
      if (prevTerm.round(precision).equals(lastTerm.round(precision))) break main
    }
    return PseudoNumber.copyFrom(n, terms[terms.length-1].round(precision))
  }
  nroot(root, precision) {
    return PseudoNumber.nroot(this.copy(), root, precision)
  }
  static fracPow(n, a, b, precision) {
    n = PseudoNumber.EnsurePseudo(n)
    return PseudoNumber.pow(n, a, precision+5).nroot(b, precision)
  }
  fracPow(a, b, precision) {
    return PseudoNumber.fracPow(this.copy(), a, b, precision)
  }
  static sqrt(n, precision) {
    return PseudoNumber.nroot(n, 2, precision)
  }
  sqrt(precision) {
    return PseudoNumber.sqrt(this.copy(), precision)
  }
  static cbrt(n, precision) {
    return PseudoNumber.nroot(n, 3, precision)
  }
  cbrt(precision) {
    return PseudoNumber.cbrt(this.copy(), precision)
  }
  static getSplit(n) {
    n = PseudoNumber.EnsurePseudo(n)
    return n.pseudo.split('.')
  }
  getSplit() {
    return PseudoNumber.getSplit(this)
  }
  static hasDecimals(n) {
    n = PseudoNumber.EnsurePseudo(n)
    return n.getSplit().length == 2
  }
  hasDecimals() {
    return PseudoNumber.hasDecimals(this)
  }
  static getBase(n) {
    n = PseudoNumber.EnsurePseudo(n)
    return n.getSplit()[0]
  }
  getBase() {
    return PseudoNumber.getBase(this)
  }
  static getDecimals(n) {
    n = PseudoNumber.EnsurePseudo(n)
    return n.hasDecimals() ? n.getSplit()[1] : '0'
  }
  getDecimals() {
    return PseudoNumber.getDecimals(this)
  }
  static getDecimalLength(n) {
    if (n.hasDecimals()) return n.getDecimals().length
    return 0
  }
  getDecimalLength() {
    return PseudoNumber.getDecimalLength(this)
  }
  static getSign(n) {
    n = PseudoNumber.EnsurePseudo(n)
    return n.sign
  }
  getSign() {
    return this.sign
  }
  static isPositive(n) {
    n = PseudoNumber.EnsurePseudo(n)
    return n.sign == '+'
  }
  isPositive() {
    return this.sign == '+'
  }
  static isNegative(n) {
    n = PseudoNumber.EnsurePseudo(n)
    return n.sign == '-'
  }
  isNegative() {
    return this.sign == '-'
  }
  toNumber() {
    if (this.hasDecimals()) return parseFloat(this.pseudo)
    return parseInt(this.pseudo)
  }
  toString() {
    return (this.isNegative()?'-':'')+this.pseudo
  }
}


/*

Fraction Simplification

let top = PseudoNumber.EnsurePseudo(top)
let bottom = PseudoNumber.EnsurePseudo(bottom)

while (top.hasDecimals() || bottom.hasDecimals) {
  PseudoNumber.shiftDecimal(top, 1)
  PseudoNumber.shiftDecimal(bottom, 1)
}

main: while(true) {
  let t = PseudoNumber.min(top, bottom)
  for (let i=2; PseudoNumber.lessThanEqualTo(i, t); i++) {
    if (top.mod(i).equals(0) && bottom.mod(i).equals(0)) {
      PseudoNumber.div(top, i)
      PseudoNumber.div(bottom, i)
      continue main
    }
  }
  break main
}

*/