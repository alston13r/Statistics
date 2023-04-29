function BinomPDF(trials, p, x) {
  let coeff = BinomCoefficient(trials, x)
  return coeff*p**x*(1-p)**(trials-x)
}

function BinomCDF(trials, p, x) {
  let s = 0
  for (let i=x;i>=0;i--) s += BinomPDF(trials, p, i)
  return s
}

function Chi2PDF(x, df) {
  let a = df/2-1
  let b = 2**(df/2)*math.gamma(df/2)
  let fx = x => x**a*exp(-x/2)/b
  return x>=0?fx(x):0
}

function Chi2CDF(lower, upper, df) {}

function GeometricPDF(p, x) {
  return p*(1-p)**(x-1)
}

function GeometricCDF(p, x) {
  return 1-(1-p)**x
}

function InvNorm() {}

function InvT() {}

function NormalPDF(x,mu,stdev) {
	return 1/(stdev*Math.sqrt(2*Math.PI))*Math.exp(-0.5*((x-mu)/stdev)**2)
}

function NormalCDF(a,b,c,d) {
	if (d == undefined) return 0.5*(1+math.erf((a-b)/(c*Math.sqrt(2))))
	else return NormalCDF(b,c,d)-NormalCDF(a,c,d)
}

function TPDF(x, df) {
  let c1 = math.gamma((df+1)/2)/(sqrt(df*PI)*math.gamma(df/2))
  let c2 = -(df+1)/2
  return c1*(1+x**2/df)**c2
}

function TCDF(lower, upper, df) {}