function BinomCoefficient(n, k) {
	if (k > n || k < 0) return 0
	return PascalTri.getRow(n)[k]
}

const PascalTri = {
	get len() {
		return this.rows.length
	},
	rows: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1]],
	getRow(i) {
		if (i > this.rows.length-1) this.addRows(i-this.rows.length+1)
		return this.rows[i]
	},
	addRows(n) {
		for (let i=0;i<n;i++) {
			this.addRow()
		}
	},
	addRow() {
		let lastRow = this.rows[this.rows.length-1]
		let newRow = [1]
		for (let i=0;i<lastRow.length-1;i++) {
			newRow.push(lastRow[i]+lastRow[i+1])
		}
		newRow.push(1)
		this.rows.push([...newRow])
	}
}

function DF2SampTTest(a, b) {
  let c = a.variance(true)/a.length
  let d = b.variance(true)/b.length
  let top = (c+d)**2
  let bottom = c**2/(a.length-1)+d**2/(b.length-1)
  return top/bottom
}

function ZScore(x, mu, stdev) {
  return (x-mu)/stdev
}