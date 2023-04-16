class Graph {
  constructor(canvas, options, xRange, yRange) {
    this.grapher = new GraphingUtility(canvas)
    this.defaultLineColor = '#fff'
    this.defaultPointColor = '#f00'
    this.lineWidth = 2
    this.pointRadius = 5
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
  setCanvasSize(size) {
    this.grapher.size = size
  }
  getCanvasSize() {
    return this.grapher.size
  }
  graphToCanv(x, y) {
    return [
      map(x, this.xLower, this.xUpper, 0, this.getCanvasSize[0]),
      map(y, this.yLower, this.yUpper, this.getCanvasSize[1], 0)
    ]
  }
  canvToGraph(x, y) {
    return [
      map(x, 0, this.getCanvasSize[0], this.xLower, this.xUpper),
      map(y, 0, this.getCanvasSize[1], this.yUpper, this.yLower)
    ]
  }
}