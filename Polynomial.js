class Polynomial {
  constructor(center, aTerm, coeffs, pows) {
    this.aTerm = aTerm
    this.center = center
    this.coeffs = [...coeffs]
    this.pows = [...pows]
    this.fn = x => {
      let s = 0
      for (let i=0;i<this.coeffs.length;i++) s += this.valueOf(x, i)
      if (this.aTerm != 1) s *= this.aTerm
      return s
    }
  }
  valueOf(x, n) {
    return this.coeffs[n]*(x-this.center)**this.pows[n]
  }
}