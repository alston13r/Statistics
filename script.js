let canvas = document.createElement('canvas')
let grapher = new Graph(canvas, [-10,10], [-10,10], 500)
grapher.appendTo(document.body)
grapher.clear()
grapher.drawAxes()

let l1 = new List([134,145,104,119,124,161,107,83,113,129,97,129])
let l2 = new List([70,118,101,85,107,132,94])