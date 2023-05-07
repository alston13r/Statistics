let canvas = document.createElement('canvas')
let grapher = new Graph(canvas, [-10,10], [-10,10], 500)
grapher.appendTo(document.body)
grapher.clear()
grapher.drawAxes()

grapher.graphFunction(myErfApprox.fn, [-5,0], true, false, '#0000ff')

let a = new PseudoNumber('52.7235')
let b = new PseudoNumber('0057.4525')

console.log(a.toString()+' + '+b.toString())
PseudoNumber.add(a,b)

console.log(a)

console.log(PseudoNumber.add(12, 13))

// console.log(52.7235 + 57.4526)