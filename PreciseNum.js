class PreciseNumber {
  constructor(base, ...decimals) {
    if (typeof base === 'string') {
      let split = base.split('.')
      let len = split.length
      this.decimals = []
      if (len == 2) {
        this.base = split[0]=='' ? 0 : parseInt(split[0])
        if (split[1] == '') {
          this.decimals[0] = 0
        } else {
          for (let c of split[1]) this.decimals.push(parseInt(c))
        }
      } else if (len == 1) {
        this.decimals[0] = 0
        this.base = split[0]=='' ? 0 : parseInt(split[0])
      } else {
        this.base = 0
        this.decimals = [0]
      }
    } else if (typeof base === 'number') {
      this.base = base
      if (decimals.length > 0) this.decimals = [...decimals]
      else this.decimals = [0]
    } else {
      this.base = 0
      this.decimals = [0]
    }
    this.fix()
  }
  copy() {
    return new PreciseNumber(this.base, this.decimals).fix()
  }
  get decLen() {
    return this.decimals.length
  }
  fix() {
    if (this.decimals.length == 0) {
      this.decimals = [0]
    }
    let bumpDown = 0
    if (this.base > floor(this.base)) {
      bumpDown = round((this.base-floor(this.base))*10, this.base.toString().split('.')[1].length)
      this.base = floor(this.base)
    }
    for (let i=0;i<this.decLen;i++) {
      this.decimals[i] += bumpDown
      let curr = this.decimals[i]
      if (curr > floor(curr)) {
        bumpDown = round((curr-floor(curr))*10, curr.toString().split('.')[1].length)
        this.decimals[i] = floor(curr)
        if (i == this.decimals.length-1) this.decimals.push(0)
      } else {
        bumpDown = 0
      }
    }
    let bumpUp = 0
    for (let i=this.decLen-1;i>=0;i--) {
      this.decimals[i] += bumpUp
      let curr = this.decimals[i]
      if (curr >= 10) {
        bumpUp = floor(curr/10)
        this.decimals[i] %= 10
      } else {
        bumpUp = 0
      }
    }
    this.base += bumpUp
    for (let i=this.decLen-1;i>0;i--) {
      if (this.decimals[i] == 0) this.decimals.pop()
      else break
    }
    return this
  }
  static add(a, b) {
    if (a instanceof PreciseNumber) {
      if (b instanceof PreciseNumber) {
        let min = min(a.decLen, b.decLen)
        let max = max(a.decLen, b.decLen)
        if (min == max) {
          for (let i=0;i<a.decLen;i++) a.decimals[i] += b.decimals[i]
        } else {
          for (let i=0;i<min;i++) a.decimals[i] += b.decimals[i]
          if (a.decLen < b.decLen) {
            for (let i=min;i<max;i++) a.decimals[i] = b.decimals[i]
          }
        }
      } else {
        this.base += n
        this.fix()
      }
    } else {
      if (b instanceof PreciseNumber) {
        return b.add(a)
      } else {
        return new PreciseNumber(a+b)
      }
    }
    a.fix()
  }
  add(n) {
    return PreciseNumber.add(this.copy(), n)
  }
  static sub(a, b) {
    let c
    if (b instanceof LongNumber) {
      c = b.copy()
      c.base *= -1
      for (let [i,d] of c.decimals.entries()) c.decimals[i] = -d
    } else c *= -b
    return PreciseNumber.add(a, c)
  }
  sub(n) {
    return PreciseNumber.sub(this.copy(), n)
  }
  toString() {
    return this.base+'.'+this.decimals.join('')
  }
}