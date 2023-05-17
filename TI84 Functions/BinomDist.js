function BinomPDF(trials, p, x) {
  let coeff = BinomCoefficient(trials, x)
  return coeff * p ** x * (1 - p) ** (trials - x)
}

function BinomCDF(trials, p, x) {
  let s = 0
  for (let i = x; i >= 0; i--) s += BinomPDF(trials, p, i)
  return s
}