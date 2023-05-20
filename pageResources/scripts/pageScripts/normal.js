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

let meanInput = document.getElementById('meanInput')
let stdevInput = document.getElementById('stdevInput')
meanInput.defaultValue = '0'
stdevInput.defaultValue = '1'

function resetGraph() {
  grapher.clear()
  grapher.drawAxes()
  grapher.graphNormalCurve(0, 1, '#00f', 2)
}

function submitGraphDetails() {
  resetGraph()
  let mean = parseFloat(meanInput.value)
  let stdev = parseFloat(stdevInput.value)
  grapher.graphNormalCurve(mean, stdev, '#f00', 1)
}

let xInput = document.getElementById('xInput')
xInput.defaultValue = '0'
function submitPdfDetails() {
  let x = parseFloat(xInput.value)
  let mean = parseFloat(meanInput.value)
  let stdev = parseFloat(stdevInput.value)
  calcOutput.innerHTML = 'Output:<br>' + round(NormalPDF(x, mean, stdev), 8)
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
  calcOutput.innerHTML = 'Output:<br>' + round(NormalCDF(lower, upper, mean, stdev), 8)
}

function startup() {
  meanInput.value = '0'
  stdevInput.value = '1'
  xInput.value = '0'
  lowerInput.value = '-10000'
  upperInput.value = '0'
  resetGraph()
}

let pressEvents = ['mousedown', 'touchstart']
let unpressEvents = ['mouseup', 'mouseout', 'touchend', 'touchcancel']

for (let b of document.getElementsByClassName('coolButton')) {
  for (let e of pressEvents) b.addEventListener(e, () => b.dataset.pressed = 'true')
  for (let e of unpressEvents) b.addEventListener(e, () => b.dataset.pressed = 'false')
}

let graphItButton = document.getElementById('graphIt')
let pdfButton = document.getElementById('calcPDF')
let cdfButton = document.getElementById('calcCDF')

for (let e of pressEvents) graphItButton.addEventListener(e, submitGraphDetails)
for (let e of pressEvents) pdfButton.addEventListener(e, submitPdfDetails)
for (let e of pressEvents) cdfButton.addEventListener(e, submitCdfDetails)

window.onresize = () => {
  grapher.grapher.size = [graphContainer.clientWidth, graphContainer.clientHeight]
  resetGraph()
}

document.addEventListener('DOMContentLoaded', startup)