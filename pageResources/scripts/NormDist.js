class Tail {
  static LEFT = new Tail('left')
  static CENTER = new Tail('center')
  static RIGHT = new Tail('right')
  constructor(name) {
    this.name = name
  }
}

function InvNorm(area, mu, stdev, tail) {
  return `invNorm(area: ${area}, mean: ${mu}, stdev: ${stdev}, tail: ${tail.name.toUpperCase()})`
}

function NormalPDF(x, mu, stdev) {
  return 1 / (stdev * Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * ((x - mu) / stdev) ** 2)
}

function NormalCDF(a, b, c, d) {
  if (d == undefined) return 0.5 * (1 + math.erf((a - b) / (c * Math.sqrt(2))))
  return NormalCDF(b, c, d) - NormalCDF(a, c, d)
}