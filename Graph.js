class GraphingOptions {
  static Lining = new GraphingOptions('line')
  static Pointing = new GraphingOptions('point')
  static LandP = new GraphingOptions('landp')
  constructor(name) {
    this.name = name
  }
}
class Graph {
  constructor(canvas, xRange, yRange, canvasSize, options) {
    this.grapher = new GraphingUtility(canvas, canvasSize)
    this.defaultLineColor = '#fff'
    this.defaultPointColor = '#f00'
    this.defaultFunctionColor = '#700'
    this.defaultParametricColor = '#00f'
    this.defaultLineWidth = 2
    this.defaultPointRadius = 5
    this.defaultFunctionSize = 2
    this.defaultParametricSize = 2
    this.defaultParametricDensity = 0.1
    this.defaultAxisWidth = 1.5
    this.defaultAxisColor = '#777'
    this.defaultGridWidth = 1
    this.defaultGridColor = '#222'
    if (options != undefined) {
      for (let k in options) {
        this[k] = options[k]
      }
    }
    this.xLower = xRange[0]
    this.xUpper = xRange[1]
    this.yLower = yRange[0]
    this.yUpper = yRange[1]
  }
  clear(c) {
    this.grapher.background(c)
  }
  appendTo(element) {
    this.grapher.appendTo(element)
  }
  setCanvasSize(size) {
    this.grapher.size = size
  }
  getCanvasSize() {
    return this.grapher.size
  }
  graphToCanvX(x) {
    return map(x, this.xLower, this.xUpper, 0, this.getCanvasSize()[0])
  }
  graphToCanvY(y) {
    return map(y, this.yLower, this.yUpper, this.getCanvasSize()[1], 0)
  }
  graphToCanv(x, y) {
    return [this.graphToCanvX(x), this.graphToCanvY(y)]
  }
  canvToGraphX(x) {
    return map(x, 0, this.getCanvasSize()[0], this.xLower, this.xUpper)
  }
  canvToGraphY(y) {
    return map(y, 0, this.getCanvasSize()[1], this.yUpper, this.yLower)
  }
  canvToGraph(x, y) {
    return [this.canvToGraphX(x), this.canvToGraphY(y)]
  }
  pixel(x, y, size) {
    this.grapher.rect(x, y, size, size)
  }
  line(x1, y1, x2, y2, color, width) {
    this.grapher.push()
    this.grapher.stroke(color ? color : this.defaultLineColor)
    this.grapher.lineWidth = width ? width : this.defaultLineWidth
    this.grapher.line(...this.graphToCanv(x1, y1), ...this.graphToCanv(x2, y2))
    this.grapher.pop()
  }
  point(x, y, color, radius) {
    this.grapher.push()
    this.grapher.noStroke()
    this.grapher.fill(color ? color : this.defaultPointColor)
    this.grapher.ellipseMode = EllipseMode.Center
    let r = radius ? radius*2 : this.defaultPointRadius*2
    this.grapher.ellipse(...this.graphToCanv(x, y), r, r)
    this.grapher.pop()
  }
  graphFunction(func, xBounds, color, size, plotOptions) {
    let lining = plotOptions == GraphingOptions.Lining || plotOptions == GraphingOptions.LandP
    let pointing = plotOptions == GraphingOptions.Pointing || plotOptions == GraphingOptions.LandP
    this.grapher.push()
    let c = color ? color : this.defaultFunctionColor
    let s = size ? size : this.defaultFunctionSize
    this.grapher.rectMode = RectMode.Center
    
    if (lining) {
      this.grapher.stroke(c)
      this.grapher.lineWidth = s
    } else {
      this.grapher.noStroke()
    }
    if (pointing) {
      this.grapher.fill(c)
    } else {
      this.grapher.noFill()
    }

    let prev = []
    let lower, upper
    if (xBounds) {
      lower = this.graphToCanvX(xBounds[0])
      upper = this.graphToCanvX(xBounds[1])
    } else {
      lower = -5
      upper = this.getCanvasSize()[0]+5
    }
    for (let i=lower; i<upper; i++) {
      let currX = this.canvToGraphX(i)
      let currY = func(currX)
      if (lining) {
        if (prev.length != 0) {
          this.grapher.line(...prev, i, this.graphToCanvY(currY))
        }
        prev = [i, this.graphToCanvY(currY)]
      }
      if (pointing) {
        this.pixel(i, this.graphToCanvY(currY), s)
      }
    }
    this.grapher.pop()
  }
  graphParametric(xFunc, yFunc, tLower, tUpper, density, color, size, lining, pointing) {
    this.grapher.push()
    let d = density ? density : this.defaultParametricDensity
    let c = color ? color : this.defaultParametricColor
    let s = size ? size : this.defaultParametricSize
    this.grapher.rectMode = RectMode.Center
    if (pointing) this.grapher.fill(c)
    else this.grapher.noFill()
    if (lining) {
      this.grapher.stroke(c)
      this.grapher.lineWidth = s
    }
    else this.grapher.noStroke()
    if (lining || pointing) {
      let prev = []
      for (let t=tLower; t<=tUpper+d; t+=d) {
        let currX = xFunc(t)
        let currY = yFunc(t)
        if (lining) {
          if (prev.length != 0) {
            this.grapher.line(...this.graphToCanv(...prev), ...this.graphToCanv(currX, currY))
          }
          prev = [currX, currY]
        }
        if (pointing) {
          this.pixel(...this.graphToCanv(currX, currY), s)
        }
      }
    }
    this.grapher.pop()
  }
  graphNormalCurve(mu, stdev, color, size) {
    let fx = x => 1/(stdev*ROOT_TWO_PI)*exp(-0.5*((x-mu)/stdev)**2)
    this.graphFunction(fx, null, color, size, GraphingOptions.Lining)
  }
  graphTCurve(df, color, size) {
    let c1 = math.gamma((df+1)/2)/(sqrt(df*PI)*math.gamma(df/2))
    let c2 = -(df+1)/2
    let fx = x => c1*(1+x**2/df)**c2
    this.graphFunction(fx, null, color, size, GraphingOptions.Lining)
  }
  graphChi2Curve(df, color, size) {
    let a = df/2-1
    let b = 2**(df/2)*math.gamma(df/2)
    let fx = x => x**a*exp(-x/2)/b
    this.graphFunction(x => x>=0?fx(x):0, [0,this.xUpper], color, size, GraphingOptions.Lining)
  }
  drawAxes(color, width) {
    let c = color ? color : this.defaultAxisColor
    let w = width ? width : this.defaultAxisWidth
    this.line(this.xLower-1, 0, this.xUpper+1, 0, c, w)
    this.line(0, this.yLower-1, 0, this.yUpper+1, c, w)
  }
  drawGrid(color, width) {
    let c = color ? color : this.defaultGridColor
    let w = width ? width : this.defaultGridWidth
  }
}

/*
	graphLabel(x,y,label,f='#555',align='start',base='alphabetic') {
		ctx.fillStyle = f
		ctx.font = '20px arial'
		ctx.textBaseline = base
		ctx.textAlign = align
		ctx.fillText(label,x,y)
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


  */