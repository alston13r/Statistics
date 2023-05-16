let graphContainer = document.getElementById('graphContainer')
let buttonContainer = document.getElementById('buttonContainer')
let distInfoContainer = document.getElementById('distInfoContainer')
let calcInfoContainer = document.getElementById('calcInfoContainer')
let linkContainer = document.getElementById('linkContainer')

let calcOutput = document.getElementById('calcOutput')

let canvas = document.createElement('canvas')
let gw = graphContainer.clientWidth
let gh = graphContainer.clientHeight
let grapher = new Graph(canvas, [-5, 5], [-0.5, 1], [gw, gh])
grapher.appendTo(graphContainer)
grapher.clear()
grapher.drawAxes()
grapher.graphNormalCurve(0, 1, '#00f', 2)

let meanInput = document.getElementById('meanInput')
let stdevInput = document.getElementById('stdevInput')
meanInput.defaultValue = '0'
stdevInput.defaultValue = '1'

function submitGraphDetails() {
  grapher.clear()
  grapher.drawAxes()
  grapher.graphNormalCurve(0, 1, '#00f', 2)
  let mean = parseFloat(meanInput.value)
  let stdev = parseFloat(stdevInput.value)
  grapher.graphNormalCurve(mean, stdev, '#f00', 1)
}

let xInput = document.getElementById('xInput')
xInput.defaultValue = '0'
function submitPdfDetails() {
  let x = parseInt(xInput.value)
  let mean = parseFloat(meanInput.value)
  let stdev = parseFloat(stdevInput.value)
  calcOutput.innerHTML = 'Output:<br>' + NormalPDF(x, mean, stdev)
}

let lowerInput = document.getElementById('lowerInput')
let upperInput = document.getElementById('upperInput')
lowerInput.defaultValue = '-10000'
upperInput.defaultValue = '0'
function submitCdfDetails() {
  let lower = parseFloat(lowerInput.value)
  let upper = parseFloat(upperInput.value)
  let mean = parseFloat(meanInput.value)
  let stdev = parseFloat(stdevInput.value)
  calcOutput.innerHTML = 'Output:<br>' + NormalCDF(lower, upper, mean, stdev)
}

for (let b of document.getElementsByClassName('coolButton')) {
  b.addEventListener('mousedown', () => {
    b.style.border = 'inset #a00 3px'
    b.style.backgroundColor = '#d00'
  })
  b.addEventListener('mouseup', () => {
    b.style.border = 'outset #a00 3px'
    b.style.backgroundColor = '#f00'
  })
  b.addEventListener('mouseout', () => {
    b.style.border = 'outset #a00 3px'
    b.style.backgroundColor = '#f00'
  })
}

let graphItButton = document.getElementById('graphIt')
let pdfButton = document.getElementById('calcPDF')
let cdfButton = document.getElementById('calcCDF')

graphItButton.addEventListener('mousedown', submitGraphDetails)
pdfButton.addEventListener('mousedown', submitPdfDetails)
cdfButton.addEventListener('mousedown', submitCdfDetails)

window.onresize = () => {
  grapher.grapher.size = [graphContainer.clientWidth, graphContainer.clientHeight]
  submitGraphDetails()
}