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

let dfInput = document.getElementById('dfInput')
dfInput.defaultValue = '1'

function submitGraphDetails() {
  grapher.clear()
  grapher.drawAxes()
  grapher.graphNormalCurve(0, 1, '#00f', 2)
  let df = parseFloat(dfInput.value)
  grapher.graphTCurve(df, '#f00', 1)
}

let xInput = document.getElementById('xInput')
xInput.defaultValue = '0'
function submitPdfDetails() {
  let df = parseFloat(dfInput.value)
  let x = parseFloat(xInput.value)
  calcOutput.innerHTML = 'Output:<br>' + TPDF(x, df)
}

let lowerInput = document.getElementById('lowerInput')
let upperInput = document.getElementById('upperInput')
lowerInput.defaultValue = '-10000'
upperInput.defaultValue = '0'
function submitCdfDetails() {
  let lower = parseFloat(lowerInput.value)
  let upper = parseFloat(upperInput.value)
  let df = parseFloat(dfInput.value)
  calcOutput.innerHTML = 'Output:<br>' + TCDF(lower, upper, df)
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