let canvas = document.createElement('canvas')
let grapher = new Graph(canvas, [-10,10], [-10,10], 500)
grapher.appendTo(document.body)
grapher.clear()
grapher.drawAxes()

grapher.graphFunction(myErfApprox.fn, [-5,0], true, false, '#0000ff')

console.log(PseudoNumber.sub(4.323, 4.35))