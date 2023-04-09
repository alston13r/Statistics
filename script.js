class AngleMode {
  static Radians = new AngleMode('radians')
  static Degrees = new AngleMode('degrees')
  constructor(name) {
    this.name = name
  }
}
class RectMode {
  static Corner = new RectMode('corner')
  static Center = new RectMode('center')
  constructor(name) {
    this.name = name
  }
}
class EllipseMode {
  static Corner = new EllipseMode('corner')
  static Center = new EllipseMode('center')
  constructor(name) {
    this.name = name
  }
}

class Layer {
  static Additionals = {
    fillEnabled: true,
    strokeEnabled: true,
    angleMode: AngleMode.Radians,
    rectMode: RectMode.Corner,
    ellipseMode: EllipseMode.Center
  }
  constructor(prev) {
    if (prev instanceof CanvasRenderingContext2D) {
      this.ctx = prev
      for (let k in Layer.Additionals) this.ctx[k] = Layer.Additionals[k]
    } else this.ctx = prev.ctx
    for (let k in prev) {
      let type = typeof prev[k]
      if (type == 'string' || type == 'number' || type == 'boolean') this[k] = prev[k]
    }
    for (let k in Layer.Additionals) {
      this[k] = prev[k]
    }
    this.updateTransform()
  }
  updateTransform() {
    this.currTransform = this.ctx.getTransform()
  }
}

class Grapher {
  constructor(canvas, ...others) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.layers = [new Layer(this.ctx)]
    Object.defineProperty(this, 'lastLayerIndex', {get: () => this.layers.length-1})
    Object.defineProperty(this, 'lastLayer', {get: () => this.layers[this.lastLayerIndex]})
    for (let k in this.lastLayer) {
      if (k != 'ctx' && k != 'currTransform') {
        Object.defineProperty(this, k, {
          get: () => this.lastLayer[k],
          set: value => {
            this.lastLayer[k] = value
            this.updateCtx()
          }
        })
      }
    }
    if (others.length > 0) {
      if (others.length == 1) {
        if (others[0] instanceof Array) {
          this.size = [...others[0]]
        } else {
          this.size = [others[0], others[0]]
        }
      } else if (others.length == 2) {
        this.size = [...others]
      }
    }
  }
  set width(w) {
    this.canvas.width = w
  }
  get width() {
    return this.canvas.width
  }
  set height(h) {
    this.canvas.height = h
  }
  get height() {
    return this.canvas.height
  }
  set size(s) {
    this.width = s[0]
    this.height = s[1]
  }
  get size() {
    return [this.width, this.height]
  }
  appendTo(ele) {
    ele.appendChild(this.canvas)
  }
  updateCtx() {
    for (let k in this.lastLayer) {
      if (k != 'ctx') this.ctx[k] = this.lastLayer[k]
      if (k == 'currTransform') this.ctx.setTransform(this.lastLayer[k])
    }
  }
  push() {
    this.layers.push(new Layer(this.lastLayer))
  }
  pop() {
    if (this.layers.length > 1) {
      this.layers.pop()
      this.updateCtx()
    }
  }
  noFill() {
    this.fillEnabled = false
  }
  noStroke() {
    this.strokeEnabled = false
  }
  fill(c) {
    this.fillEnabled = true
    this.fillStyle = c
  }
  stroke(c) {
    this.strokeEnabled = true
    this.strokeStyle = c
  }
  background(c) {
    this.push()
    this.fill(c)
    this.rect(0, 0, ...this.size)
    this.pop()
  }
  clearRect(x, y, w, h) {
    this.ctx.clearRect(x, y, w, h)
  }
  rect(x, y, w, h) {
    this.push()
    if (this.rectMode == RectMode.Corner) this.translate(x, y)
    else if (this.rectMode == RectMode.Center) this.translate(x - w/2, y - h/2)
    if (this.fillEnabled) this.ctx.fillRect(0, 0, w, h)
    if (this.strokeEnabled) this.ctx.strokeRect(0, 0, w, h)
    this.pop()
  }
  ellipse(x, y, w, h) {
    this.push()
    if (this.ellipseMode == EllipseMode.Center) this.translate(x, y)
    else if (this.ellipseMode == EllipseMode.Corner) this.translate(x + w/2, y + h/2)
    this.ctx.beginPath()
    this.ctx.ellipse(0, 0, w/2, h/2, 0, 0, Math.PI*2)
    if (this.fillEnabled) this.ctx.fill()
    if (this.strokeEnabled) this.ctx.stroke()
    this.pop()
  }
  transform(a, b, c, d, e, f) {
    this.ctx.transform(a, b, c, d, e, f)
    this.lastLayer.updateTransform()
  }
  translate(x, y) {
    this.ctx.translate(x, y)
    this.lastLayer.updateTransform()
  }
  setTransform(...params) {
    if (params.length == 1) {
      this.ctx.setTransform(params[0])
    } else {
      this.ctx.setTransform(...params)
    }
    this.lastLayer.updateTransform()
  }
  getTransform() {
    return this.lastLayer.currTransform
  }
  resetTransform() {
    this.ctx.resetTransform()
    this.lastLayer.updateTransform()
  }
}

let canvas = document.createElement('canvas')
let grapher = new Grapher(canvas, 500, 500)
grapher.appendTo(document.body)
CanvasRenderingContext2D.prototype.fillText()