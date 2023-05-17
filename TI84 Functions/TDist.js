function TPDF(x, df) {
  let c1 = math.gamma((df + 1) / 2) / (sqrt(df * PI) * math.gamma(df / 2))
  let c2 = -(df + 1) / 2
  return c1 * (1 + x ** 2 / df) ** c2
}


// 1-30
// 40 60 80 100
// 1000
// z

function TCDF(lower, upper, df) {
  return `tcdf(lower: ${lower}, upper: ${upper}, df: ${df})`
}

function InvT(area, df) {
  return `invT(area: ${area}, df: ${df})`
}