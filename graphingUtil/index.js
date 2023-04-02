const canv = document.getElementById('canv')
const ctx = canv.getContext('2d')

const width = 900
const height = 900

class Parametric {
	constructor(xfunc,yfunc) {
		this.xfunc = xfunc
		this.yfunc = yfunc
	}
	setParentGraph(g) {
		this.parent = g
	}
	getPoint(t) {
		return [this.xfunc(t),this.yfunc(t)]
	}
	pointToCanv(x,y) {
		if (this.parent instanceof Graph) {
			return this.parent.graphToCanv(x,y)
		} else {
			return undefined
		}
	}
}

class Graph {
	constructor(x1=-10,y1=-10,x2=10,y2=10,dx=1,dy=1) {
		this.xb = [x1,x2]
		this.yb = [y1,y2]
		this.dx = dx
		this.dy = dy
		this.gridColor = '#222'
		this.axisColor = '#555'
		this.pointColor = '#f00'
		this.functionColor = '#f00'
		this.parametricColor = '#00f'
		this.t = 2000
	}
	createParametric(xfunc,yfunc) {
		let temp = new Parametric(xfunc,yfunc)
		temp.setParentGraph(this)
		return temp
	}
	graphToCanv(x,y) {
		let mx = map(x,...this.xb,0,width)
		let my = map(y,...this.yb,height,0)
		return [mx,my]
	}
	canvToGraph(x,y) {
		let mx = map(x,0,width,...this.xb)
		let my = map(y,height,0,...this.yb)
		return [mx,my]
	}
	graphFunction(f) {
		let lx = this.xb[0]
		let ly = f(lx)
		let increment = (this.xb[1]-this.xb[0]+1)/this.t
		for (let x=this.xb[0],i=0;x<=this.xb[1];x+=increment,i++) {
			if (i==0) continue
			this.graphLine(lx,ly,x,f(x),this.functionColor)
			lx = x
			ly = f(x)
		}
	}
	graphParametric(p,lt,ut) {
		let [lx,ly] = p.getPoint(lt)
		for (let i=lt;i<=ut;i+=(1/this.t)) {
			if (i==0) continue
			let np = p.getPoint(i)
			this.graphLine(lx,ly,...np,this.parametricColor)
			lx = np[0]
			ly = np[1]
		}
	}
	graphPixel(x,y) {
		drawPixel(...this.graphToCanv(x,y),this.functionColor)
	}
	graphPoint(x,y,c) {
		drawCircle(...this.graphToCanv(x,y),3.5,c||this.pointColor)
	}
	graphLine(x1,y1,x2,y2,c='#f00') {
		drawLine(...this.graphToCanv(x1,y1),...this.graphToCanv(x2,y2),c)
	}
	graphLabel(x,y,label,f='#555',align='start',base='alphabetic') {
		let ofs = ctx.fillStyle
		let ogf = ctx.font
		let obl = ctx.textBaseline
		let ota = ctx.textAlign
		ctx.fillStyle = f
		ctx.font = '20px arial'
		ctx.textBaseline = base
		ctx.textAlign = align
		ctx.fillText(label,x,y)
		ctx.fillStyle = ofs
		ctx.font = ogf
		ctx.textBaseline = obl
		ctx.textAlign = ota
	}
	graphDashedLine(a,b,d,e,c='#777') {
		let [x1,y1] = this.graphToCanv(a,b)
		let [x2,y2] = this.graphToCanv(d,e)
		let len = Math.sqrt((y2-y1)**2+(x2-x1)**2)
		let dashCount = len/20
		console.log(len,dashCount)
		
		let m = (y2-y1)/(x2-x1)
		
		drawCircle(x1,y1,2,c)
		
		let ofs = ctx.fillStyle
		
		ctx.fillStyle = c
		ctx.beginPath()
		ctx.roundRect(x1,y1,15,5,10)
		ctx.roundRect(x1+20,y1,15,5,10)
		ctx.fill()
		ctx.fillStyle = ofs
		
		drawCircle(x2,y2,2,c)
	}
	drawGrid() {
		let xc = (this.xb[1]-this.xb[0])/this.dx
		let yc = (this.yb[1]-this.yb[0])/this.dy
		for (let i=0;i<=xc;i++) {
			let x = map(i/xc,0,1,0,width)
			drawLine(x,0,x,height,this.gridColor)
		}
		for (let j=0;j<yc;j++) {
			let y = map(j/yc,0,1,0,height)
			drawLine(0,y,width,y,this.gridColor)
		}
	}
	drawAxis() {
		let xaxarr = [...this.graphToCanv(this.xb[0],0),...this.graphToCanv(this.xb[1],0)]
		let yaxarr = [...this.graphToCanv(0,this.yb[0]),...this.graphToCanv(0,this.yb[1])]
		drawLine(...xaxarr,this.axisColor)
		drawLine(...yaxarr,this.axisColor)
	}
	drawAxisTicks() {
		
	}
	draw() {
		this.drawGrid()
		this.drawAxis()
		//this.drawAxisTicks()
	}
}

function rand(a,b,c) {
	let sit = (a==undefined?0:1)+(b==undefined?0:2)+(c==undefined?0:4)
	let res = []
	switch(sit) {
		case 0:
			return Math.random()
			break
		case 1:
			res = []
			for (let i=0;i<a;i++) {
				res.push(Math.random())
			}
			return res
			break
		case 3:
			return Math.floor(Math.random()*(b-a+1))+a
			break
		case 7:
			res = []
			for (let i=0;i<c;i++) {
				res.push(Math.floor(Math.random()*(b-a+1))+a)
			}
			return res
			break
		default:
			stopLoop()
			console.log('rand function error',a,b,c)
			break
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
		return (x-b)/(b-a)*(d-c)+d
	}
}
function background(c='#000') {
	let oc = ctx.fillStyle
	ctx.fillStyle = c
	ctx.fillRect(0,0,width,height)
	ctx.fillStyle = oc
}
function drawLine(x1,y1,x2,y2,c='#fff',w=1) {
	let oc = ctx.strokeStyle
	let ow = ctx.lineWidth
	ctx.strokeStyle = c
	ctx.lineWidth = w
	ctx.beginPath()
	ctx.moveTo(x1,y1)
	ctx.lineTo(x2,y2)
	ctx.stroke()
	ctx.strokeStyle = oc
	ctx.lineWidth = ow
}
function drawCircle(x,y,r=3.5,c='#f00') {
	let oc = ctx.fillStyle
	ctx.fillStyle = c
	ctx.beginPath()
	ctx.arc(x,y,r,0,2*Math.PI)
	ctx.fill()
	ctx.fillStyle = oc
}
function drawPixel(x,y,c='#f00') {
	let oc = ctx.fillStyle
	ctx.fillStyle = c
	ctx.fillRect(x,y,1,1)
	ctx.fillStyle = oc
}

let graph = new Graph(-20,-20,20,20)

let firstParaX = t => t-1.6*Math.cos(24*t)
let firstParaY = t => t-1.6*Math.sin(25*t)

let firstPara = graph.createParametric(firstParaX,firstParaY)

function draw() {
	background()
	graph.draw()
	
	graph.graphParametric(firstPara,-2*Math.PI,2*Math.PI)
	
	
	stopLoop()
}


let lastFrame
function stopLoop() {
	console.log('loop stopped')
	window.cancelAnimationFrame(lastFrame)
}
function loop() {
	lastFrame = window.requestAnimationFrame(loop)
	canv.width = width
	canv.height = height
	draw()
}
window.requestAnimationFrame(loop)