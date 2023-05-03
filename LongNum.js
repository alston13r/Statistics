class LongNumber {
  constructor(base, ...decimals) {
    this.base = base || 0
    this.decimals = [...decimals]
    if (this.decimals.length == 0) this.decimals = [0]
    this.fix()
  }
  get decimalLength() {
    return this.decimals.length
  }
  copy() {
    let c = new LongNumber(this.base)
    c.decimals = [...this.decimals]
    c.fix()
    return c
  }
  add(a) {
    if (a instanceof LongNumber) {
      this.base += a.base
      let min = Math.min(this.decimalLength, a.decimalLength)
      let max = Math.max(this.decimalLength, a.decimalLength)
      if (min == max) {
        for (let i=0;i<this.decimalLength;i++) this.decimals[i] += a.decimals[i]
      } else {
        for (let i=0;i<min;i++) this.decimals[i] += a.decimals[i]
        if (a.decimalLength > this.decimalLength) {
          for (let i=min;i<max;i++) this.decimals[i] = a.decimals[i]
        } else {
          for (let i=min;i<max;i++) a.decimals[i] = this.decimals[i]
        }
      }
    } else {
      this.base += a
    }
    this.fix()
    return this
  }
  sub(a) {
    if (a instanceof LongNumber) {
      let c = a.copy()
      c.base *= -1
      for (let i=0;i<c.decimalLength;i++) c.decimals[i] *= -1
      this.add(c)
    } else {
      this.base -= a
    }
    this.fix()
    return this
  }
  fix() {
    if (this.decimals.length == 0) {
      this.decimals = [0]
      return this
    }
    if (this.base > Math.floor(this.base) && this.base < Math.ceil(this.base)) {
      let o = this.base - Math.floor(this.base)
      this.base = Math.floor(this.base)
      this.decimals[0] += o*10
    }
    for (let i=0;i<this.decimals.length;i++) {
      let curr = this.decimals[i]
      if (curr > Math.floor(curr)) {
        let o = curr - Math.floor(curr)
        this.decimals[i] = Math.floor(curr)
        o*=10
        if (i == this.decimals.length-1) this.decimals[i+1] = o
        else this.decimals[i+1] += o
      }
      this.decimals = round(this.decimals, 8)
    }
    let bumpUp = 0
    for (let i=this.decimals.length-1;i>=0;i--) {
      this.decimals[i] += bumpUp
      let curr = this.decimals[i]
      if (curr >= 10) {
        bumpUp = Math.floor(curr/10)
        this.decimals[i] %= 10
      } else bumpUp = 0
    }
    this.base += bumpUp
    this.decimals[0] %= 10
    for (let i=this.decimals.length-1;i>0;i--) {
      if (this.decimals[i] == 0) this.decimals.pop()
      else break
    }
    return this
  }
  toString() {
    return this.base+'.'+this.decimals.join('')
  }
}