class AngleMode {
  static Degrees = new AngleMode('degrees')
  static Radians = new AngleMode('radians')
  constructor(name) {
    this.name = name
  }
}

class SettingsLayer {
  static additionalSettings = {
    _angleMode: AngleMode.Radians,
    _cnvSizeMode: 'static',
    _ellipseMode: 'center',
    _rectMode: 'bound',
    _fill: true,
    _stroke: true
  }
  constructor(prevLayer) {
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
}

class Grapher {
  constructor(canvas, ...other) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    if (other.length > 0) this.setSize = [...other]
    this.layers = [new SettingsLayer(this.ctx)]
  }
  push() {

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

  set setSize(a) {
    this.width = a[0]
    this.height = a[1]
  }

  get lastSettingsLayerIndex() {
    return this.settings.length-1
  }

  get lastSettingsLayer() {
    return this.settings[this.lastSettingsLayerIndex]
  }

  get innerWidth() {
    return window.innerWidth
  }

  get innerHeight() {
    return window.innerHeight
  }

}

function createGrapher(w, h) {
  let g = new Grapher(document.createElement('canvas'))
  g.setSize = [w, h]
  return g
}

function push() {
	ctxSettings.push(null)
	overwriteLast()
}
function pop() {
	if (ctxSettings.length > 1) ctxSettings.pop()
	updateCtxFromSettings()
}
function overwriteLast() {
	if (ctxSettings.length == 0) {
		ctxSettings.push(null)
		for (let k in otherSettings) {
			ctx[k] = otherSettings[k]
		}
	}
	let tobj = {}
	for (let k in ctx) {
		let propType = typeof ctx[k]
		if (propType == 'string' ||
		propType == 'number' ||
		propType == 'boolean') {
			tobj[k] = ctx[k]
		}
	}
	ctxSettings[cslli] = tobj
}
function updateCtxFromSettings() {
	if (ctxSettings.length == 0) return
	for (let k in csll) {
		if (k == 'other') continue
		ctx[k] = csll[k]
	}
}









function angle(m) {
	csll._angleMode = m
	updateCtxFromSettings()
}
function canvSizing(m) {
	csll._cnvSizeMode = m
	updateCtxFromSettings()
}
function rectMode(m) {
	csll._rectMode = m
	updateCtxFromSettings()
}
function ellipseMode(m) {
	csll._ellipseMode = m
	updateCtxFromSettings()
}
function background(c) {
	ctx.fillStyle = c
	ctx.fillRect(0,0,canv.width,canv.height)
	updateCtxFromSettings()
}
function rect(x,y,w,h) {
	let ox = csll._rectMode=='bound'?x:x-w/2
	let oy = csll._rectMode=='bound'?y:y-h/2
	if (csll._stroke) ctx.strokeRect(ox,oy,w,h)
	if (csll._fill) ctx.fillRect(ox,oy,w,h)
}
function clearRect(x,y,w,h) {
	let ox = csll._rectMode=='bound'?x:x-w/2
	let oy = csll._rectMode=='bound'?y:y-h/2
	ctx.clearRect(ox,oy,w,h)
}
function ellipse(x,y,a,b) {
	let ox = csll._ellipseMode=='bound'?x+a/2:x
	let oy = csll._ellipseMode=='bound'?y+b/2:y
	ctx.beginPath()
	ctx.ellipse(ox,oy,a/2,b==undefined?a/2:b/2,0,0,TWO_PI)
	if (csll._stroke) ctx.stroke()
	if (csll._fill) ctx.fill()
}
function fill(c) {
	csll._fill = true
	csll.fillStyle = c
	updateCtxFromSettings()
}
function noFill() {
	csll._fill = false
	updateCtxFromSettings()
}
function stroke(c) {
	csll._stroke = true
	csll.strokeStyle = c
	updateCtxFromSettings()
}
function noStroke() {
	csll._stroke = false
	updateCtxFromSettings()
}

function lineDash(x1,y1,x2,y2,d) {
	if (csll._stroke) {
		let od = ctx.getLineDash()
		ctx.beginPath()
		ctx.moveTo(x1,y1)
		ctx.setLineDash(d)
		ctx.lineTo(x2,y2)
		ctx.stroke()
		ctx.setLineDash(od)
	}
}
