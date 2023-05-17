function Chi2PDF(x, df) {
  let a = df / 2 - 1
  let b = 2 ** (df / 2) * math.gamma(df / 2)
  let fx = x => x ** a * exp(-x / 2) / b
  return x >= 0 ? fx(x) : 0
}

function Chi2CDF(lower, upper, df) {
  return `x²cdf(lower: ${lower}, upper: ${upper}, df: ${df})`
}