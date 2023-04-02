arr = [321,360,367,374,383,402,392,329,331,354,376,355]
function round(x,p) {
	let a = 10**p
	return Math.round(x*a)/a
}
str = ''
for (x of arr) {
	if (str.length > 0) str += ' + '
	str += round(((x-362)**2)/362,3)
}
console.log(str)

for (x of arr) {
	console.log(x-362)
}