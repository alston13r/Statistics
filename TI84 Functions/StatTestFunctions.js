function Chi2(observed, expected) {
	let s = 0
	for (let [i,e] of expected.entries()) s += round((observed[i]-e)**2/e,3)
	return s
}