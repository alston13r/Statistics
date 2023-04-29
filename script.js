let canvas = document.createElement('canvas')
let grapher = new Graph(canvas, [-5,5], [-1,1], 500)
grapher.appendTo(document.body)
grapher.clear()
grapher.drawAxes()
let mu = 0
let stdev = 1
let fx = x => 1/(stdev*ROOT_TWO_PI)*exp(-0.5*((x-mu)/stdev)**2)
grapher.graphFunction(fx)