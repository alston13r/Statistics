// check negatives
// subtraction
// multiplication
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
    for (let c of n.getBase()) {
      if (baseF && c!=='0') baseF = false
      if (!baseF) newB += c
    }
    n.pseudo = newB+(newD.length>0?'.'+newD:'')
    return n
  }
  clean() {
    return PseudoNumber.clean(this.copy())
  }
  copy() {
    return new PseudoNumber(this.toString())
  }
  static abs(n) {
    if (typeof n === 'number') n = new PseudoNumber(n)
    n.sign = '+'
    return n
  }
  abs() {
    return PseudoNumber.abs(this.copy())
  }
  static add(a, b) {
    // a and b must be positive to add


    if (typeof a === 'number') a = new PseudoNumber(a)
    if (typeof b === 'number') b = new PseudoNumber(b)

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
  }
  add(n) {
    return PseudoNumber.add(this.copy(), n)
  }
  static sub(a, b) {
    // a and b must be positive to subtract

    if (typeof a === 'number') a = new PseudoNumber(a)
    if (typeof b === 'number') b = new PseudoNumber(b)

    PseudoNumber.clean(a)
    PseudoNumber.clean(b)

    let aDec = a.hasDecimals()
    let bDec = b.hasDecimals()
    let aBase = a.getBase()
    let bBase = b.getBase()

    // let c = 0
    // let newD = ''
    // if (aDec || bDec) {
    //   let aDecs = aDec ? a.getDecimals() : '0'
    //   let bDecs = bDec ? b.getDecimals() : '0'
    //   let maxD = Math.max(aDecs.length, bDecs.length)
    //   for (let i=aDecs.length; i<maxD; i++) aDecs += '0'
    //   for (let i=bDecs.length; i<maxD; i++) bDecs += '0'
    //   for (let i=maxD-1; i>=0; i--) {
    //     let s = parseInt(aDecs[i]) + parseInt(bDecs[i]) + c
    //     if (s >= 10) {
    //       c = floor(s/10)
    //       s %= 10
    //     } else c = 0
    //     newD = s+newD
    //   }
    // }

    // let newB = ''
    // let maxB = Math.max(aBase.length, bBase.length)
    // for (let i=aBase.length; i<maxB; i++) aBase = '0'+aBase
    // for (let i=bBase.length; i<maxB; i++) bBase = '0'+bBase
    // for (let i=maxB-1; i>=0; i--) {
    //   let s = parseInt(aBase[i]) + parseInt(bBase[i]) + c
    //   if (s >= 10) {
    //     c = floor(s/10)
    //     s %= 10
    //   } else c = 0
    //   newB = s+newB
    // }
    // newB = c+newB

    a.pseudo = newB+(newD.length>0?'.'+newD:'')
    return PseudoNumber.clean(a)
  }
  static getSplit(n) {
    if (typeof n === 'number') n = new PseudoNumber(n)
    return n.pseudo.split('.')
  }
  getSplit() {
    return PseudoNumber.getSplit(this)
  }
  static hasDecimals(n) {
    if (typeof n === 'number') n = new PseudoNumber(n)
    return n.getSplit().length == 2
  }
  hasDecimals() {
    return PseudoNumber.hasDecimals(this)
  }
  static getBase(n) {
    if (typeof n === 'number') n = new PseudoNumber(n)
    return n.getSplit()[0]
  }
  getBase() {
    return PseudoNumber.getBase(this)
  }
  static getDecimals(n) {
    if (typeof n === 'number') n = new PseudoNumber(n)
    return n.hasDecimals() ? n.getSplit()[1] : '0'
  }
  getDecimals() {
    return PseudoNumber.getDecimals(this)
  }
  static getSign(n) {
    if (typeof n === 'number') n = new PseudoNumber(n)
    return n.sign
  }
  getSign() {
    return this.sign
  }
  static isPositive(n) {
    if (typeof n === 'number') n = new PseudoNumber(n)
    return n.sign == '+'
  }
  isPositive() {
    return this.sign == '+'
  }
  static isNegative(n) {
    if (typeof n === 'number') n = new PseudoNumber(n)
    return n.sign == '-'
  }
  isNegative() {
    return this.sign == '-'
  }
  toString() {
    return this.pseudo
  }
}