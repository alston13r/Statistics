function df2stt(arr1,arr2) {
	let a = variance(arr1,true)/arr1.length
	let b = variance(arr2,true)/arr2.length
	let top = (a+b)**2
	let c = a**2/(arr1.length-1)
	let d = b**2/(arr2.length-1)
	let bottom = c+d
	return top/bottom
}

function chi2(observed, expected) {
	let s = 0
	for (let [i,e] of expected.entries()) {
		s += round((observed[i]-e)**2/e,3)
	}
	return s
}