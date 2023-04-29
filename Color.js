class RGB {
  static fromHex(s) {
    if (s.length != 6) s = s.substr(1)
    s = '0x'+s
    let r = s>>16&255
    let g = s>>8&255
    let b = s&255
    return new RGB(r, g, b)
  }
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
    return max(...this.getNormal())
  }
  getMin() {
    return min(...this.getNormal())
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
    let S = delta!=0 ? delta/(1-abs(2*L-1)) : 0
    return new HSL(H>0?H:360+H, S, L)
  }
  toHSV() {
    let rp, gp, bp
    [rp, gp, bp] = this.getNormal()
    let max, min, delta
    [max, min, delta] = this.getULD()

    let H = this.getHue(rp, gp, bp, delta)
    let S = max!=0?delta/max:0
    return new HSV(H>0?H:360+H, S, max)
  }
  toCMYK() {
    let rp, gp, bp
    [rp, gp, bp] = this.getNormal()
    let K = 1-max(rp, gp, bp)
    let C = (1-rp-K)/(1-K)
    let M = (1-gp-K)/(1-K)
    let Y = (1-bp-K)/(1-K)
    return new CMYK(C, M, Y, K)
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
    let C = (1-abs(2*this.l-1))*this.s
    let X = C*(1-abs(this.h/60%2-1))
    let m = this.l-C/2
    
    X = round((X+m)*255)
    C = round((C+m)*255)

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
    return `hsl(${round(this.h,0)}, ${round(this.s*100,1)}%, ${round(this.l*100,1)}%)`
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
    let C = this.v*this.s
    let X = C*(1-abs(this.h/60%2-1))
    let m = this.v - C

    X = round((X+m)*255)
    C = round((C+m)*255)

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
    return `hsv(${round(this.h,0)}, ${round(this.s*100,1)}%, ${round(this.v*100,1)}%)`
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
    let R = 255*(1-this.c)*(1-this.k)
    let G = 255*(1-this.m)*(1-this.k)
    let B = 255*(1-this.y)*(1-this.k)
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
    return `cmyk(${round(this.c*100,1)}%, ${round(this.m*100,1)}%, ${round(this.y*100,1)}%, ${round(this.k*100,1)}%)`
  }
}