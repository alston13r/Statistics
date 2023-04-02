let table = [
	[0,1,2,3,4],
	[0.78,0.11,0.07,0.03,0.01]
]

function round(x,n) {
	let precision = 10**n
	return Math.round(x*precision)/precision
}

function calcMean(t) {
	let sum = 0
	for (let i=0;i<t[0].length;i++) {
		sum += t[0][i]*t[1][i]
	}
	return round(sum,5)
}
function calcStdev(t) {
	let mean = calcMean(t)
	let sum = 0
	for (let i=0;i<t[0].length;i++) {
		sum += (t[0][i]-mean)**2*t[1][i]
	}
	return round(sum,5)
}

console.log(calcMean(table))
console.log(calcStdev(table))