function round(x,n) {
	let precision = 10**n
	return Math.round(x*precision)/precision
}

const functionsAndEquivs = {
	'Z Score': ['X','Mean','Standard deviation'],
	'Normal PDF': {
		items: ['X','Mean','Stdev'],
		description: 'Normal probability distribution function, '+
		'calculate the probability of a random event having the value '+
		'of X on a normal distribution with the given mean and ' +
		'standard deviation'
	},
	'Normal CDF': {
		items: ['X','Mean','Standard deviation'],
		description: 'blah blah blah'
	},
	'Binom PDF': {
		items: ['X','Number of trials','Probability of success'],
		description: 'blah blah blah'
	},
	'Binom CDF': {
		items: ['X','Number of trials','Probability of success'],
		description: 'blah blah blah'
	},
	'Geometric PDF': {
		items: ['X','Probability of success'],
		description: 'blah blah blah'
	},
	'Geometric CDF': {
		items: ['X','Probability of success'],
		description: 'blah blah blah'
	}
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

function ZScore(x,mu,stdev) {
	return (x-mu)/stdev
}

function NormalPDF(x,mu,stdev) {
	return 1/(stdev*Math.sqrt(2*Math.PI))*Math.exp(-0.5*ZScore(x,mu,stdev)**2)
}

function NormalCDF(a,b,c,d) {
	if (d == undefined) return 0.5*(1+math.erf((a-b)/(c*Math.sqrt(2))))
	else return NormalCDF(b,c,d)-NormalCDF(a,c,d)
}

function BinomCoefficient(n,k) {
	if (k > n || k < 0) return 0
	return PascalTri.getRow(n)[k]
}

function BinomPDF(n,p,k) {
	let coeff = BinomCoefficient(n,k)
	return coeff*p**k*(1-p)**(n-k)
}

function BinomCDF(n,p,k) {
	let sum = 0
	for (let i=k;i>=0;i--) {
		sum += BinomPDF(i,n,p)
	}
	return sum
}

function GeometricPDF(p,k) {
	return p*(1-p)**(k-1)
}

function GeometricCDF(p,k) {
	return 1-(1-p)**k
}







let frameButtonListener = e => {
	let ele = document.createElement('iframe')
	ele.src = 'https://www.danielsoper.com/statcalc/default.aspx'
	ele.width = 800
	ele.height = 600
	e.target.innerHTML = ''
	e.target.appendChild(ele)
	e.target.removeEventListener('click', frameButtonListener)
}
document.getElementById('framebutton').addEventListener('click', frameButtonListener)
let dropdownButtonListener = e => {
	e.target.parentElement.children[1].classList.toggle('show')
}
for (let button of document.getElementsByClassName('dropbutton')) {
	button.addEventListener('click', dropdownButtonListener)
}
let unfocusEventListener = e => {
	if (!event.target.matches('.dropbutton')) {
		let dropdowns = document.getElementsByClassName('dropdown-content')
		for (let d of dropdowns) {
			if (d.classList.contains('show')) {
				d.classList.remove('show')
			}
		}
	}
}
document.addEventListener('click', unfocusEventListener)