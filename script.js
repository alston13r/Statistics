let canvas = document.createElement('canvas')
let grapher = new Graph(canvas, [-10,10], [-10,10], min(window.innerWidth, window.innerHeight))
grapher.appendTo(document.body)
grapher.clear()
grapher.drawAxes()

grapher.graphFunction(myErfApprox.fn, [-5,0], '#0000ff', 2, GraphingOptions.Lining)