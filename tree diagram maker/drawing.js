/*
filter
fontStretch
fontVariantCaps
globalAlpha
globalCompositeOperation
imageSmoothingEnabled
imageSmoothingQuality
letterSpacing
lineCap
lineDashOffset
lineJoin
miterLimit
shadowBlur
shadowColor
shadowOffsetX
shadowOffsetY
textRendering
wordSpacing
*/

function rand(a,b,c) {
	if (c == undefined) {
		if (b == undefined) {
			if (a == undefined) return Math.random()
			return Math.floor(Math.random()*(a+1))
		} return Math.floor(Math.random()*(b-a+1)+a)
	} else {
		let res = Array(c)
		for (let i=0;i<c;i++) {
			res[i] = rand(a,b)
		}
		return res
	}
}
function map(x,a,b,c,d) {
	if (x instanceof Array) {
		let res = []
		for (let y of x) {
			res.push(map(y,a,b,c,d))
		}
		return res
	} else {
		return (x-a)/(b-a)*(d-c)+c
	}
}
function lerp(t,a,b) {
	return map(t,0,1,a,b)
}
const PI = Math.PI
const HALF_PI = Math.PI/2
const TWO_PI = 2*Math.PI
function sin(x) {
	if (csll._angleMode == 'radian') {
		return Math.sin(x)
	} else if (csll._angleMode == 'degree') {
		return Math.sin(PI*x/180)
	}
}
function cos(x) {
	if (csll._angleMode == 'radian') {
		return Math.cos(x)
	} else if (csll._angleMode == 'degree') {
		return Math.cos(PI*x/180)
	}
}
function tan(x) {
	if (csll._angleMode == 'radian') {
		return Math.tan(x)
	} else if (csll._angleMode == 'degree') {
		return Math.tan(PI*x/180)
	}
}
function asin(x) {
	if (csll._angleMode == 'radian') {
		return Math.asin(x)
	} else if (csll._angleMode == 'degree') {
		return Math.asin(PI*x/180)
	}
}
function acos(x) {
	if (csll._angleMode == 'radian') {
		return Math.acos(x)
	} else if (csll._angleMode == 'degree') {
		return Math.acos(PI*x/180)
	}
}
function atan(x) {
	if (csll._angleMode == 'radian') {
		return Math.atan(x)
	} else if (csll._angleMode == 'degree') {
		return Math.atan(PI*x/180)
	}
}



const canv = document.getElementById('mainCanv')
const ctx = canv.getContext('2d')
Object.defineProperty(globalThis,'width',{get:()=>canv.width})
Object.defineProperty(globalThis,'height',{get:()=>canv.height})
Object.defineProperty(globalThis,'innerwidth',{get:()=>window.innerWidth})
Object.defineProperty(globalThis,'innerheight',{get:()=>window.innerHeight})
const otherSettings = {
	_angleMode: 'radian',
	_cnvSizeMode: 'static',
	_ellipseMode: 'center',
	_rectMode: 'bound',
	_fill: true,
	_stroke: true
}
let ctxSettings = []
function setWidth(a) {
	canv.width = a
}
function setHeight(a) {
	canv.height = a
}
function setSize(a,b) {
	setWidth(a)
	setHeight(b)
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
function lineWidth(w) {
	csll.lineWidth = w
	updateCtxFromSettings()
}
function line(x1,y1,x2,y2) {
	if (csll._stroke) {
		ctx.beginPath()
		ctx.moveTo(x1,y1)
		ctx.lineTo(x2,y2)
		ctx.stroke()
	}
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
function textDirection(d) {
	// ltr rtl inherit
	csll.direction = d
	updateCtxFromSettings()
}
function textAlign(ta) {
	// left right center start end
	csll.textAlign = ta
	updateCtxFromSettings()
}
function textBaseline(tb) {
	// top hanging middle alphabetic ideographic bottom
	csll.textBaseline = tb
	updateCtxFromSettings()
}
function font(f) {
	csll.font = f
	updateCtxFromSettings()
}
function kerning(k) {
	// auto normal none
	csll.fontKerning = k
	updateCtxFromSettings()
}
function text(t,x,y,m) {
	if (csll._stroke) ctx.strokeText(t,x,y,m)
	if (csll._fill) ctx.fillText(t,x,y,m)
}
Object.defineProperty(globalThis,'cslli',{get:()=>ctxSettings.length-1})
Object.defineProperty(globalThis,'csll',{get:()=>ctxSettings[cslli]})
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
let lastFrame
function loop() {
	lastFrame = window.requestAnimationFrame(loop)
	if (globalThis.hasOwnProperty('draw')) draw()
}
function stopLoop() {
	window.cancelAnimationFrame(lastFrame)
}
function updateSize() {
	if (ctx['_cnvSizeMode'] == 'dynamic') {
		canv.width = width
		canv.height = height
	}
}
window.onresize = updateSize
window.onload = () => {
	overwriteLast()
	if (globalThis.hasOwnProperty('setup')) setup()
	window.requestAnimationFrame(loop)
}