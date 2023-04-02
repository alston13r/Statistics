const textFillColor = '#fff'
const textBorderColor = '#000'
const textFont = '40px arial'

const initialX = 100
const initialY = 400
const firstLeft = 440
const secondLeft = 440
const firstCenterSpacing = 200
const secondCenterSpacing = 60
const lineSpacing = 10
const numBackBoxesWidth = 65
const numBackBoxesHeight = 40

function setup() {
	setSize(1800,800)
	lineWidth(2)
	
	textBaseline('middle')
	textAlign('center')
	rectMode('center')
	
	stroke(textBorderColor)
	fill(textFillColor)
	font(textFont)
	
	push()
	noStroke()
	ellipse(initialX,initialY,10,10)
	pop()
	
	let aw = ctx.measureText('Machine A').width
	let bw = ctx.measureText('Machine B').width
	let cw = ctx.measureText('Machine C').width
	
	let acx = initialX+firstLeft
	let acy = initialY-firstCenterSpacing
	let bcx = initialX+firstLeft
	let bcy = initialY
	let ccx = initialX+firstLeft
	let ccy = initialY+firstCenterSpacing
	
	text('Machine A',acx,acy)
	text('Machine B',bcx,bcy)
	text('Machine C',ccx,ccy)
	
	push()
	noStroke()
	ellipse(acx-aw/2-lineSpacing,acy,10,10)
	ellipse(acx+aw/2+lineSpacing,acy,10,10)
	ellipse(bcx-bw/2-lineSpacing,bcy,10,10)
	ellipse(bcx+bw/2+lineSpacing,bcy,10,10)
	ellipse(ccx-cw/2-lineSpacing,ccy,10,10)
	ellipse(ccx+cw/2+lineSpacing,ccy,10,10)
	pop()
	
	textAlign('left')
	
	let successWidth = ctx.measureText('Success').width
	let failureWidth = ctx.measureText('Failure').width
	
	text('Success',acx+secondLeft,acy-secondCenterSpacing)
	text('Failure',acx+secondLeft,acy+secondCenterSpacing)
	text('Success',bcx+secondLeft,bcy-secondCenterSpacing)
	text('Failure',bcx+secondLeft,bcy+secondCenterSpacing)
	text('Success',ccx+secondLeft,ccy-secondCenterSpacing)
	text('Failure',ccx+secondLeft,ccy+secondCenterSpacing)
	
	push()
	noStroke()
	ellipse(acx+secondLeft-lineSpacing,acy-secondCenterSpacing,10,10)
	ellipse(acx+secondLeft-lineSpacing,acy+secondCenterSpacing,10,10)
	ellipse(bcx+secondLeft-lineSpacing,bcy-secondCenterSpacing,10,10)
	ellipse(bcx+secondLeft-lineSpacing,bcy+secondCenterSpacing,10,10)
	ellipse(ccx+secondLeft-lineSpacing,ccy-secondCenterSpacing,10,10)
	ellipse(ccx+secondLeft-lineSpacing,ccy+secondCenterSpacing,10,10)
	pop()
	
	stroke('#fff')
	
	let a1 = [initialX,initialY]
	let a2 = [acx-aw/2-lineSpacing,acy]
	let adx = a2[0]-a1[0]
	let ady = a2[1]-a1[1]
	
	let b1 = [initialX,initialY]
	let b2 = [bcx-bw/2-lineSpacing,bcy]
	let bdx = b2[0]-b1[0]
	let bdy = b2[1]-b1[1]
	
	let c1 = [initialX,initialY]
	let c2 = [ccx-cw/2-lineSpacing,ccy]
	let cdx = c2[0]-c1[0]
	let cdy = c2[1]-c1[1]
	
	line(...a1,...a2)
	line(...b1,...b2)
	line(...c1,...c2)
	
	push()
	clearRect(a1[0]+adx/2,a1[1]+ady/2,numBackBoxesWidth,numBackBoxesHeight)
	clearRect(b1[0]+bdx/2,b1[1]+bdy/2,numBackBoxesWidth,numBackBoxesHeight)
	clearRect(c1[0]+cdx/2,c1[1]+cdy/2,numBackBoxesWidth,numBackBoxesHeight)
	fill('#fff')
	stroke('#000')
	textAlign('center')
	text('0.6',a1[0]+adx/2,a1[1]+ady/2)
	text('0.3',b1[0]+bdx/2,b1[1]+bdy/2)
	text('0.1',c1[0]+cdx/2,c1[1]+cdy/2)
	pop()
	
	line(acx+aw/2+lineSpacing,acy,acx+secondLeft-lineSpacing,acy-secondCenterSpacing)
	line(acx+aw/2+lineSpacing,acy,acx+secondLeft-lineSpacing,acy+secondCenterSpacing)
	line(bcx+aw/2+lineSpacing,bcy,bcx+secondLeft-lineSpacing,bcy-secondCenterSpacing)
	line(bcx+aw/2+lineSpacing,bcy,bcx+secondLeft-lineSpacing,bcy+secondCenterSpacing)
	line(ccx+aw/2+lineSpacing,ccy,ccx+secondLeft-lineSpacing,ccy-secondCenterSpacing)
	line(ccx+aw/2+lineSpacing,ccy,ccx+secondLeft-lineSpacing,ccy+secondCenterSpacing)
	
	let aa1 = [acx+aw/2+lineSpacing,acy]
	let bb1 = [bcx+bw/2+lineSpacing,bcy]
	let cc1 = [ccx+cw/2+lineSpacing,ccy]
	
	let aa2 = [acx+secondLeft-lineSpacing,acy-secondCenterSpacing]
	let aa3 = [acx+secondLeft-lineSpacing,acy+secondCenterSpacing]
	let bb2 = [bcx+secondLeft-lineSpacing,bcy-secondCenterSpacing]
	let bb3 = [bcx+secondLeft-lineSpacing,bcy+secondCenterSpacing]
	let cc2 = [ccx+secondLeft-lineSpacing,ccy-secondCenterSpacing]
	let cc3 = [ccx+secondLeft-lineSpacing,ccy+secondCenterSpacing]
	
	let aadx = aa2[0]-aa1[0]
	let aasdy = aa2[1]-aa1[1]
	let aafdy = aa3[1]-aa1[1]
	
	let bbdx = bb2[0]-bb1[0]
	let bbsdy = bb2[1]-bb1[1]
	let bbfdy = bb3[1]-bb1[1]
	
	let ccdx = cc2[0]-cc1[0]
	let ccsdy = cc2[1]-cc1[1]
	let ccfdy = cc3[1]-cc1[1]
	
	push()
	clearRect(aa1[0]+aadx/2,aa1[1]+aasdy/2,numBackBoxesWidth,numBackBoxesHeight)
	clearRect(aa1[0]+aadx/2,aa1[1]+aafdy/2,numBackBoxesWidth,numBackBoxesHeight)
	clearRect(bb1[0]+bbdx/2,bb1[1]+bbsdy/2,numBackBoxesWidth,numBackBoxesHeight)
	clearRect(bb1[0]+bbdx/2,bb1[1]+bbfdy/2,numBackBoxesWidth,numBackBoxesHeight)
	clearRect(cc1[0]+ccdx/2,cc1[1]+ccsdy/2,numBackBoxesWidth,numBackBoxesHeight)
	clearRect(cc1[0]+ccdx/2,cc1[1]+ccfdy/2,numBackBoxesWidth,numBackBoxesHeight)
	fill('#fff')
	stroke('#000')
	textAlign('center')
	text('0.9',aa1[0]+aadx/2,aa1[1]+aasdy/2)
	text('0.1',aa1[0]+aadx/2,aa1[1]+aafdy/2)
	text('0.7',bb1[0]+bbdx/2,bb1[1]+bbsdy/2)
	text('0.3',bb1[0]+bbdx/2,bb1[1]+bbfdy/2)
	text('0.6',cc1[0]+ccdx/2,cc1[1]+ccsdy/2)
	text('0.4',cc1[0]+ccdx/2,cc1[1]+ccfdy/2)
	pop()
}

/*
0.6 Machine A
	0.1 Fail
	0.9 Success

0.3 Machine B
	0.3 Fail
	0.7 Success

0.1 Machine C
	0.4 Fail
	0.6 Success
*/