class RGB {
  constructor(r, g, b) {
    this.r = r
    this.g = g
    this.b = b
  }
  *[Symbol.iterator]() {
    yield this.r
    yield this.g
    yield this.b
  }
  getNormal() {
    return [this.r/255, this.g/255, this.b/255]
  }
  getMax() {
    return Math.max(...this.getNormal())
  }
  getMin() {
    return Math.min(...this.getNormal())
  }
  getHue(rp, gp, bp, d) {
    let max = this.getMax()
    let h = 60
    if (d == 0) h = 0
    else if (max == rp) h *= (gp-bp)/d%6
    else if (max == gp) h *= (bp-rp)/d+2
    else if (max == bp) h *= (rp-gp)/d+4
    return h
  }
  getULD() {
    let max = this.getMax()
    let min = this.getMin()
    let delta = max-min
    return [max, min, delta]
  }
  toHSL() {
    let rp, gp, bp
    [rp, gp, bp] = this.getNormal()
    let max, min, delta
    [max, min, delta] = this.getULD()

    let H = this.getHue(rp, gp, bp, delta)
    let L = (max+min)/2
    let S = delta!=0 ? delta/(1-Math.abs(2*L-1)) : 0
    return new HSL(H>0?Math.round(H):Math.round(360+H), Math.round(S*100), Math.round(L*100))
  }
  toHSV() {
    let rp, gp, bp
    [rp, gp, bp] = this.getNormal()
    let max, min, delta
    [max, min, delta] = this.getULD()

    let H = this.getHue(rp, gp, bp, delta)
    let S = max!=0?delta/max:0
    return new HSV(H>0?Math.round(H):Math.round(360+H), Math.round(S*100), Math.round(max*100))
  }
  toCMYK() {
    let rp, gp, bp
    [rp, gp, bp] = this.getNormal()
    let K = 1-Math.max(rp, gp, bp)
    let C = (1-rp-K)/(1-K)
    let M = (1-gp-K)/(1-K)
    let Y = (1-bp-K)/(1-K)
    return new CMYK(Math.round(C*100), Math.round(M*100), Math.round(Y*100), Math.round(K*100))
  }
  toHex() {
    return '#' + this.r.toString(16) + this.g.toString(16) + this.b.toString(16)
  }
  toString() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`
  }
}

class HSL {
  constructor(h, s, l) {
    this.h = h
    this.s = s
    this.l = l
  }
  *[Symbol.iterator]() {
    yield this.h
    yield this.s
    yield this.l
  }
  toRGB() {
    let C = (1-Math.abs(2*(this.l)/100-1))*this.s/100
    let X = C*(1-Math.abs(this.h/60%2-1))
    let m = this.l/100-C/2
    
    X = Math.round((X+m)*255)
    C = Math.round((C+m)*255)

    if (this.h < 60) return new RGB(C, X, 0)
    else if (this.h < 120) return new RGB(X, C, 0)
    else if (this.h < 180) return new RGB(0, C, X)
    else if (this.h < 240) return new RGB(0, X, C)
    else if (this.h < 300) return new RGB(X, 0, C)
    return new RGB(C, 0, X)
  }
  toHSV() {
    return this.toRGB().toHSV()
  }
  toCMYK() {
    return this.toRGB().toCMYK()
  }
  toHex() {
    return this.toRGB().toHex()
  }
  toString() {
    return `hsl(${this.h}, ${this.s}%, ${this.l}%)`
  }
}

class HSV {
  constructor(h, s, v) {
    this.h = h
    this.s = s
    this.v = v
  }
  *[Symbol.iterator]() {
    yield this.h
    yield this.s
    yield this.v
  }
  toRGB() {
    let C = this.v*this.s/10000
    let X = C*(1-Math.abs(this.h/60%2-1))
    let m = this.v/100 - C

    X = Math.round((X+m)*255)
    C = Math.round((C+m)*255)

    if (this.h < 60) return new RGB(C, X, 0)
    else if (this.h < 120) return new RGB(X, C, 0)
    else if (this.h < 180) return new RGB(0, C, X)
    else if (this.h < 240) return new RGB(0, X, C)
    else if (this.h < 300) return new RGB(X, 0, C)
    return new RGB(C, 0, X)
  }
  toHSL() {
    return this.toRGB().toHSL()
  }
  toCMYK() {
    this.toRGB().toCMYK()
  }
  toHex() {
    return this.toRGB().toHex()
  }
  toString() {
    return `hsv(${this.h}, ${this.s}%, ${this.v}%)`
  }
}

class CMYK {
  constructor(c, m, y, k) {
    this.c = c
    this.m = m
    this.y = y
    this.k = k
  }
  toRGB() {
    let R = 255*(1-this.c/100)*(1-this.k/100)
    let G = 255*(1-this.m/100)*(1-this.k/100)
    let B = 255*(1-this.y/100)*(1-this.k/100)
    return new RGB(R, G, B)
  }
  toHSL() {
    return this.toRGB().toHSL()
  }
  toHSV() {
    return this.toRGB().toHSV()
  }
  toHex() {
    return this.toRGB().toHex()
  }
  toString() {
    return `cmyk(${this.c}%, ${this.m}%, ${this.y}%, ${this.k}%)`
  }
}