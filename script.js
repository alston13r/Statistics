let canvas = document.createElement('canvas')
let grapher = new Graph(canvas, [-2,20], [-1,1], [1400, 900])
grapher.appendTo(document.body)
grapher.clear()
grapher.drawAxes()
grapher.graphNormalCurve(0, 1, '#0000ff')

let l1 = new List([134,145,104,119,124,161,107,83,113,129,97,129])
let l2 = new List([70,118,101,85,107,132,94])

grapher.graphTCurve(DF2SampTTest(l1, l2), '#ff0000')