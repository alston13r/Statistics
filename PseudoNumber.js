// division
// power
// rounding
// flooring
// truncating
// ceiling
// square root
// nth root
// trig

class PseudoNumber {
  static e = new PseudoNumber('2.7182818284590452353602874713526624977572')
  static pi = new PseudoNumber('3.1415926535897932384626433832795028841971')
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
    return a
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

    let res = [topSum[0]]
    for (let i=1; i<top.length+side.length-1; i++) res[i] = botSum[i-1]+topSum[i]
    res.push(botSum[top.length+side.length-2])
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
  static div(a, b, p, internal) {
    a = PseudoNumber.EnsurePseudo(a)
    b = PseudoNumber.EnsurePseudo(b)

    if (internal) {
      let quotient, remainder
      if (a.equals(b)) {
        quotient = 1
        remainder = 0
      } else if (a.lessThan(b)) {
        quotient = 0
        remainder = a.getBase()
      } else {
        let q = 2
        let t = b.mul(q)
        while(t.lessThanEqualTo(a)) {
          t = b.mul(++q)
        }
        quotient = q-1
        remainder = a.sub(b.mul(quotient))
      }
      return [quotient.toString(), remainder.toString()]
    }

    let precision = p || 0
    if (a.hasDecimals() && precision == 0) {
      precision = a.getDecimals().length
    }
    if (b.hasDecimals() && precision == 0) {
      precision = b.getDecimals().length
    }
    
    let decimals = 0
    if (a.hasDecimals()) {
      let dec = a.getDecimals()
      decimals += dec.length
    }
    if (b.hasDecimals()) {
      let dec = b.getDecimals()
      decimals += dec.length
    }

    // calc out to precision + 1 and then round to precision
    let base = a.getBase()
    let decs = a.getDecimals()

    console.log(base, decs)
    let res = ''
    let rem = 0
    // for (let i=0; i<a.pseudo.length; i++) {
      
    // }

    
    
    return 'p: '+precision+'   d: '+decimals
    // let c = new PseudoNumber(res.slice(0, res.length-decimals)+'.'+res.slice(res.length-decimals))
    // if (a.isPositive() != b.isPositive()) PseudoNumber.flipSign(c)

    // return PseudoNumber.copyFrom(a, c)
  }
  div(n, p) {
    return PseudoNumber.div(this.copy(), n, p)
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