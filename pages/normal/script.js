let container = document.getElementById('actualGraph')
let canvas = document.createElement('canvas')
let grapher = new Graph(canvas, [-5,5], [-0.5,1], [600,400])
grapher.appendTo(container)
grapher.clear()
grapher.drawAxes()

grapher.graphNormalCurve(0, 1, '#00f', 2)

let calcOuputContainer = document.getElementById('calcOutputContainer')

let meanInput = document.getElementById('meanInput')
let stdevInput = document.getElementById('stdevInput')
meanInput.defaultValue = '0'
stdevInput.defaultValue = '1'

function submitGraphDetails() {
  grapher.clear()
  grapher.drawAxes()
  grapher.graphNormalCurve(0, 1, '#00f', 2)
  let mean = parseInt(meanInput.value)
  let stdev = parseInt(stdevInput.value)
  grapher.graphNormalCurve(mean, stdev, '#f00', 1)
}

let xInput = document.getElementById('xInput')
xInput.defaultValue = '0'
function submitPdfDetails() {
  let x = parseInt(xInput.value)
  let mean = parseInt(meanInput.value)
  let stdev = parseInt(stdevInput.value)
  calcOuputContainer.innerText = 'Output: '+NormalPDF(x, mean, stdev)
}

let lowerInput = document.getElementById('lowerInput')
let upperInput = document.getElementById('upperInput')
lowerInput.defaultValue = '-10000'
upperInput.defaultValue = '0'
function submitCdfDetails() {
  let lower = parseInt(lowerInput.value)
  let upper = parseInt(upperInput.value)
  let mean = parseInt(meanInput.value)
  let stdev = parseInt(stdevInput.value)
  calcOuputContainer.innerText = 'Output: '+NormalCDF(lower, upper, mean, stdev)
}

for (let b of document.getElementsByClassName('submitButton')) {
  b.addEventListener('mousedown', () => {
    b.style.border = 'inset #a00 3px'
    b.style.backgroundColor = '#d00'
  })
  b.addEventListener('mouseup', () => {
    b.style.border = 'outset #a00 3px'
    b.style.backgroundColor = '#f00'
  })
}

document.getElementById('submitGraphButton').addEventListener('mousedown', submitGraphDetails)
document.getElementById('submitPdfButton').addEventListener('mousedown', submitPdfDetails)
document.getElementById('submitCdfButton').addEventListener('mousedown', submitCdfDetails)

// grapher.graphFunction(myErfApprox.fn, [-5,0], '#0000ff', 2, GraphingOptions.Lining)

// let w = min(window.innerWidth, window.innerHeight)

// let canvas = document.createElement('canvas')
// let grapher = new GraphingUtility(canvas, w)
// grapher.appendTo(document.body)

// grapher.background('#000000')
// grapher.align = TextAlign.Center
// grapher.baseline = TextBaseline.Middle
// grapher.font = '40px arial'
// grapher.noStroke()
// grapher.fill('#ffffff')
// grapher.text(res, w/2, w/2)