let graphContainer = document.getElementById('graphContainer')
let buttonContainer = document.getElementById('buttonContainer')
let calcOutput = document.getElementById('calcOutput')
let distInfoContainer = document.getElementById('distInfoContainer')
let calcInfoContainer = document.getElementById('calcInfoContainer')
let linkContainer = document.getElementById('linkContainer')

let bw = window.innerWidth
let bh = window.innerHeight

let marginSpace = 0.01
let leftWidth = 0.55
let rightWidth = 1 - leftWidth
let graphContainerHeight = 0.8
let buttonContainerHeight = 1 - graphContainerHeight
let distInfoContainerHeight = 0.45
let calcInfoContainerHeight = 0.3
let linkContainerHeight = 1 - distInfoContainerHeight - calcInfoContainerHeight

let t = marginSpace * bw
let usableW = bw - 3 * t
let usableLH = bh - 3 * t
let usableRH = bh - 4 * t

document.querySelector('#left').style.width = leftWidth * 100 + '%'
document.querySelector('#right').style.width = rightWidth * 100 + '%'

for (let d of document.querySelectorAll('.container')) {
  d.style.marginTop = bw * marginSpace + 'px'
}
for (let d of document.querySelectorAll('#left div')) {
  d.style.marginLeft = bw * marginSpace + 'px'
  d.style.width = usableW * leftWidth + 'px'
}
for (let d of document.querySelectorAll('#right div')) {
  d.style.marginLeft = bw * marginSpace / 2 + 'px'
  d.style.width = usableW * rightWidth + 'px'
}

let distInfoContainerPadding = 5
graphContainer.style.height = usableLH * graphContainerHeight + 'px'
buttonContainer.style.height = usableLH * buttonContainerHeight + 'px'
distInfoContainer.style.height = usableRH * distInfoContainerHeight - distInfoContainerPadding * 2 + 'px'
let newDistInfoWidth = distInfoContainer.style.width
newDistInfoWidth = parseFloat(newDistInfoWidth.substring(0, newDistInfoWidth.length - 2)) - distInfoContainerPadding * 2 + 'px'
distInfoContainer.style.width = newDistInfoWidth
calcInfoContainer.style.height = usableRH * calcInfoContainerHeight + 'px'
linkContainer.style.height = usableRH * linkContainerHeight + 'px'

let buttonContainerMargin = 0.02
let outputContainerWidth = 0.4
let buttonWidth = (1 - outputContainerWidth) / 3
let buttonPadding = 16

let buttcw = buttonContainer.style.width
let buttch = buttonContainer.style.height
buttcw = parseFloat(buttcw.substring(0, buttcw.length - 2))
buttch = parseFloat(buttch.substring(0, buttch.length - 2))
let usableButtCW = buttcw * (1 - 5 * buttonContainerMargin)
let usableButtCH = buttch - buttcw * buttonContainerMargin

for (let b of document.querySelectorAll('.coolButton')) {
  b.style.marginTop = buttcw * buttonContainerMargin + 'px'
  b.style.width = usableButtCW * buttonWidth - buttonPadding + 'px'
  b.style.height = usableButtCH - buttonPadding * 2 + 'px'
}
calcOutput.style.marginTop = buttcw * buttonContainerMargin + 'px'
calcOutput.style.width = usableButtCW * outputContainerWidth - buttonPadding + 'px'
calcOutput.style.height = usableButtCH - buttonPadding * 2 + 'px'

let canvas = document.createElement('canvas')
let gw = graphContainer.clientWidth
let gh = graphContainer.clientHeight
let grapher = new Graph(canvas, [-5, 5], [-0.5, 1], [gw, gh])
grapher.appendTo(graphContainer)
grapher.clear()
grapher.drawAxes()
grapher.graphNormalCurve(0, 1, '#00f', 2)

let calcOuputContainer = document.getElementById('calcOutput')

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
  calcOuputContainer.innerHTML = 'Output:<br>' + NormalPDF(x, mean, stdev)
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
  calcOuputContainer.innerHTML = 'Output:<br>' + NormalCDF(lower, upper, mean, stdev)
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
}

let graphItButton = document.getElementById('graphIt')
let pdfButton = document.getElementById('calcPDF')
let cdfButton = document.getElementById('calcCDF')

graphItButton.addEventListener('mousedown', submitGraphDetails)
pdfButton.addEventListener('mousedown', submitPdfDetails)
cdfButton.addEventListener('mousedown', submitCdfDetails)