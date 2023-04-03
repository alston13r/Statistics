class AngleMode {
  static Degrees = new AngleMode('degrees')
  static Radians = new AngleMode('radians')
  constructor(name) {
    this.name = name
  }
}
class BoundaryMode {
  static Center = new BoundaryMode('center')
  static Corner = new BoundaryMode('corner')
  constructor(name) {
    this.name = name
  }
}

class SettingsLayer {
  static additionalSettings = {
    _angleMode: AngleMode.Radians,
    _ellipseMode: BoundaryMode.Center,
    _rectMode: BoundaryMode.Corner,
    _fillEnabled: true,
    _strokeEnabled: true
  }
  constructor(ctx, prevLayer) {
    Object.defineProperty(this, 'ctx', {value: ctx, enumerable: false})
    Object.defineProperty(this, 'settings', {value: [], enumerable: false})
    if (prevLayer instanceof CanvasRenderingContext2D) {
      for (let k in SettingsLayer.additionalSettings) {
        prevLayer[k] = SettingsLayer.additionalSettings[k]
      }
    }
    for (let k in prevLayer) {
      let type = typeof prevLayer[k]
      if (type == 'string' || type == 'number' || type == 'boolean') {
        this.settings[k] = prevLayer[k]
        Object.defineProperty(this, k, {
          get: () => this.settings[k],
          set: value => this.settings[k] = value,
          enumerable: true
        })
      }
    }
  }
  updateCtx() {
    for (let k in this) {
      this.ctx[k] = this[k]
    }
  }
}

class Grapher {
  static nonEnumerables = [
    '_fillEnabled',
    '_strokeEnabled'
  ]
  static nameExceptions = {
    strokeStyle: {
      name: 'stroke',
      getter: () => this.lastLayer.strokeStyle,
      setter: value => {
        this.lastLayer.strokeStyle = value
        this.lastLayer._fillEnabled = true
      }
    },
    fillStyle: {
      name: 'fill',
      getter: () => this.lastLayer.fillStyle,
      setter: value => {
        this.lastLayer.fillStyle = value
        this.lastLayer._strokeEnabled = true
      }
    },
    direction: {
      name: 'textDirection',
      getter: () => this.lastLayer.direction,
      setter: value => this.lastLayer.direction = value
    },
    fontKerning: {
      name: 'kerning',
      getter: () => this.lastLayer.fontKerning,
      setter: value => this.lastLayer.fontKerning = value
    },
    _angleMode: {
      name: 'angleMode',
      getter: () => this.lastLayer._angleMode,
      setter: value => this.lastLayer._angleMode = value
    },
    _ellipseMode: {
      name: 'ellipseMode',
      getter: () => this.lastLayer._ellipseMode,
      setter: value => this.lastLayer._ellipseMode = value
    },
    _rectMode: {
      name: 'rectMode',
      getter: () => this.lastLayer._rectMode,
      setter: value => this.lastLayer._rectMode = value
    }
  }
  constructor(canvas, ...other) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    if (other.length > 0) this.size = [...other]
    this.layers = [new SettingsLayer(this.ctx, this.ctx)]
    for (let k in this.lastLayer) {
      if (Grapher.nameExceptions.hasOwnProperty(k)) {
        let exception = Grapher.nameExceptions[k]
        Object.defineProperty(this, k, {enumerable: false})
        Object.defineProperty(this, exception.name, {enumerable: true, configurable: true})
        if (exception.hasOwnProperty('getter')) Object.defineProperty(this, exception.name, {get: exception.getter})
        if (exception.hasOwnProperty('setter')) Object.defineProperty(this, exception.name, {set: exception.setter})
      } else {
        Object.defineProperty(this, k, {
          get: () => this.lastLayer[k],
          set: value => this.lastLayer[k] = value,
          enumerable: Grapher.nonEnumerables.indexOf(k)==-1
        })
      }
    }
  }
  push() {
    this.layers.push(new SettingsLayer(this.ctx, this.lastLayer))
  }
  pop() {
    if (this.layers.length > 1) {
      this.layers.pop()
      this.lastLayer.updateCtx()
    }
  }
  appendTo(element) {
    element.appendChild(this.canvas)
  }
  set width(w) {
    this.canvas.width = w
  }
  set height(h) {
    this.canvas.height = h
  }
  get width() {
    return this.canvas.width
  }
  get height() {
    return this.canvas.height
  }
  set size(a) {
    this.width = a[0]
    this.height = a[1]
  }
  get size() {
    return [this.width, this.height]
  }
  get lastLayerIndex() {
    return this.layers.length-1
  }
  get lastLayer() {
    return this.layers[this.lastLayerIndex]
  }
  get innerWidth() {
    return window.innerWidth
  }
  get innerHeight() {
    return window.innerHeight
  }
  noFill() {
    this._fillEnabled = false
  }
  noStroke() {
    this._strokeEnabled = false
  }
}

function createGrapher(w, h) {
  let g = new Grapher(document.createElement('canvas'))
  g.setSize = [w, h]
  return g
}

let grapher = createGrapher(800, 800)
for (let k in grapher) {
  console.log(k)
}