const fs = require('fs')

function createLines(file) {
	return new Promise((res,rej) => {
		fs.readFile(file,'utf8',(err,data) => {
			if (err) rej(err)
			res(data.split('\r\n'))
		})
	})
}

async function getLine(line, file) {
	let lines = await createLines(file)
	return lines[line]
}

function createArrFromLine(line) {
	let arr = []
	for (let e of line.split(' ')) {
		arr.push(parseFloat(e))
	}
	return arr
}

function round(x,p) {
	let a = 10**p
	return Math.round(x*a)/a
}

function mean(arr) {
	return sum(arr) / arr.length
}

function sum(arr) {
	let s = 0
	for (let x of arr) s += x
	return s
}

function ltg(arr) {
	return arr.sort((a,b)=>a-b)
}

function gtl(arr) {
	return arr.sort((a,b)=>b-a)
}

function median(arr) {
	let s = ltg(arr)
	if (s.length%2==0) {
		let h = s.length/2
		return mean([s[h],s[h-1]])
	} else {
		return s[Math.floor(s.length/2)]
	}
}

function min(arr) {
	let a = Infinity
	for (let x of arr) {
		if (x < a) a = x
	}
	return a
}

function max(arr) {
	let a = -Infinity
	for (let x of arr) {
		if (x > a) a = x
	}
	return a
}

function range(arr) {
	return max(arr)-min(arr)
}

function fiveNumSum(arr) {
	let arrS = ltg(arr)
	let a,b
	if (arrS.length%2==0) {
		a = arrS.slice(0,arr.length/2)
		b = arrS.slice(arr.length/2)
	} else {
		a = arrS.slice(0,Math.floor(arr.length/2))
		b = arrS.slice(Math.ceil(arr.length/2))
	}
	return [min(arr),median(a),median(arr),median(b),max(arr)]
}

function stdev(arr, sample) {
	let mu = mean(arr)
	let n = sample?arr.length-1:arr.length
	let s = 0
	for (let x of arr) {
		s += (x-mu)**2
	}
	return Math.sqrt(s/n)
}

function variance(arr, sample) {
	let mu = mean(arr)
	let n = sample?arr.length-1:arr.length
	let s = 0
	for (let x of arr) {
		s += (x-mu)**2
	}
	return s/n
}

function IQR(arr) {
	let fns = fiveNumSum(arr)
	return fns[3]-fns[1]
}

function outliers(arr) {
	let fns = fiveNumSum(arr)
	let iqr = IQR(arr)
	let o = []
	let u = fns[3]+iqr
	let l = fns[1]-iqr
	for (let x of arr) {
		if (x > u || x < l) o.push(x)
	}
	return ltg(o)
}

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

getLine(0,'./data.txt').then(l0 => {
	let femaleOb = createArrFromLine(l0)
	getLine(1,'./data.txt').then(l1 => {
		let maleOb = createArrFromLine(l1)
		getLine(2,'./data.txt').then(l2 => {
			let femaleExp = createArrFromLine(l2)
			getLine(3,'./data.txt').then(l3 => {
				let maleExp = createArrFromLine(l3)
				let observed = [...femaleOb,...maleOb]
				let expected = [...femaleExp,...maleExp]

				console.log(chi2(observed,expected))
			})
		})
	})
})