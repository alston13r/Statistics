let canvas = document.createElement('canvas')
let grapher = new Graph(canvas, [-10,10], [-10,10], 500)
grapher.appendTo(document.body)
grapher.clear()
grapher.drawAxes()

grapher.graphFunction(myErfApprox.fn, [-5,0], true, false, '#0000ff')

console.log(PseudoNumber.mul(541.1234, 5427.32))
console.log(541.1234*5427.32)