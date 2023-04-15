function floor(x) {
  if (x instanceof Array) {
    let res = []
    for (let y of x) res.push(floor(y))
    return res
  }
  return Math.floor(x)
}

function rand(a, b, c) {
  if (c == undefined) {
    if (b == undefined) {
      if (a == undefined) return Math.random()
      return rand()*a
    }
    return rand(b-a) + a
  }
  let res = []
  for (let i=0; i<c; i++) res.push(rand(a, b))
  return res
}

function randInt(a, b, c) {
  if (c == undefined) {
    if (b == undefined) return floor(rand(a+1))
    return randInt(b-a) + a
  }
  let res = []
  for (let i=0; i<c; i++) res.push(randInt(a, b))
  return res
}

function map(x,a,b,c,d) {
	if (x instanceof Array) {
		let res = []
		for (let y of x) {
			res.push(map(y,a,b,c,d))
		}
		return res
	}
  return (x-a)/(b-a)*(d-c)+c
}
function lerp(t,a,b) {
	return map(t,0,1,a,b)
}
const PI = Math.PI
const HALF_PI = Math.PI/2
const TWO_PI = 2*Math.PI
function sin(x) {
	if (csll._angleMode == 'radian') {
		return Math.sin(x)
	} else if (csll._angleMode == 'degree') {
		return Math.sin(PI*x/180)
	}
}
function cos(x) {
	if (csll._angleMode == 'radian') {
		return Math.cos(x)
	} else if (csll._angleMode == 'degree') {
		return Math.cos(PI*x/180)
	}
}
function tan(x) {
	if (csll._angleMode == 'radian') {
		return Math.tan(x)
	} else if (csll._angleMode == 'degree') {
		return Math.tan(PI*x/180)
	}
}
function asin(x) {
	if (csll._angleMode == 'radian') {
		return Math.asin(x)
	} else if (csll._angleMode == 'degree') {
		return Math.asin(PI*x/180)
	}
}
function acos(x) {
	if (csll._angleMode == 'radian') {
		return Math.acos(x)
	} else if (csll._angleMode == 'degree') {
		return Math.acos(PI*x/180)
	}
}
function atan(x) {
	if (csll._angleMode == 'radian') {
		return Math.atan(x)
	} else if (csll._angleMode == 'degree') {
		return Math.atan(PI*x/180)
	}
}