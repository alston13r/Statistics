let canvas = document.createElement('canvas')
let grapher = new Graph(canvas, [-10,10], [-10,10], 500)
grapher.appendTo(document.body)
grapher.clear()
grapher.drawAxes()

grapher.graphFunction(myErfApprox.fn, [-5,0], true, false, '#0000ff')

let a = new PreciseNumber(5+rand())
let b = new PreciseNumber(5+rand())

let c = 5+rand()
console.log(c, new PreciseNumber(c.toString()))

console.log(a.toString())
console.log(b.toString())

// console.log(5+rand())