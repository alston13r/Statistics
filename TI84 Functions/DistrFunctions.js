function df2stt(arr1,arr2) {
	let a = variance(arr1,true)/arr1.length
	let b = variance(arr2,true)/arr2.length
	let top = (a+b)**2
	let c = a**2/(arr1.length-1)
	let d = b**2/(arr2.length-1)
	let bottom = c+d
	return top/bottom
}

function Chi2(observed, expected) {
	let s = 0
	for (let [i,e] of expected.entries()) {
		s += round((observed[i]-e)**2/e,3)
	}
	return s
}

function NormalPDF(x,mu,stdev) {
	return 1/(stdev*Math.sqrt(2*Math.PI))*Math.exp(-0.5*ZScore(x,mu,stdev)**2)
}

function NormalCDF(a,b,c,d) {
	if (d == undefined) return 0.5*(1+math.erf((a-b)/(c*Math.sqrt(2))))
	else return NormalCDF(b,c,d)-NormalCDF(a,c,d)
}

function BinomPDF(n,p,k) {
	let coeff = BinomCoefficient(n,k)
	return coeff*p**k*(1-p)**(n-k)
}

function BinomCDF(n,p,k) {
	let s = 0
	for (let i=k;i>=0;i--) s += BinomPDF(i,n,p)
	return s
}

function GeometricPDF(p,k) {
	return p*(1-p)**(k-1)
}

function GeometricCDF(p,k) {
	return 1-(1-p)**k
}
