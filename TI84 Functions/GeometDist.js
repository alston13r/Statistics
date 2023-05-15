function GeometricPDF(p, x) {
  return p*(1-p)**(x-1)
}

function GeometricCDF(p, x) {
  return 1-(1-p)**x
}