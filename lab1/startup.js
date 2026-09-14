setLabSetting("d65")

values = [80,0,0,30,0,0,0,0,0,0]

newVals1 = cmykToRgb(values[0], values[1], values[2], values[3])
newVals2 = rgbToXyz(newVals1[0], newVals1[1], newVals1[2])
newVals2 = xyzToLab(newVals2[0], newVals2[1], newVals2[2])
values[4] = newVals2[0]
values[5] = newVals2[1]
values[6] = newVals2[2]
newVals2 = rgbToHsv(newVals1[0], newVals1[1], newVals1[2])
values[7] = newVals2[0]
values[8] = newVals2[1]
values[9] = newVals2[2]

updateValues(0)

var palette = document.getElementById("palette")
var ctx = palette.getContext("2d")
palette.width = 400
palette.height = 200

var cols = []
var sat = [0,20,40,60,80,100,100,100,100,100]
var val = [100,100,100,100,100,100,75,50,25,0]

for(var i = 0; i < 20; i++){
	for(var k = 0; k < 10; k++){
		cols.push(hsvToRgb(i/20*360,sat[k],val[k]))
	}
}

for(var i = 0; i < 20; i++){
	for(var k = 0; k < 10; k++){
		ctx.fillStyle = `rgb(${cols[i*10+k][0]},${cols[i*10+k][1]},${cols[i*10+k][2]})`
		ctx.fillRect(i*20, k*20, 20, 20)
		ctx.strokeRect(i*20, k*20, 20, 20)
	}
}

palette.onclick = function(e){
	var px = e.x-palette.getBoundingClientRect().left
	var py = e.y-palette.getBoundingClientRect().top
	var vals1 = rgbToCmyk(...cols[Math.floor(px/20)*10+Math.floor(py/20)])
	values[0] = vals1[0]
	values[1] = vals1[1]
	values[2] = vals1[2]
	values[3] = vals1[3]
	updateValues(0)
}

var tests = [
	[[255,0,0],[0,100,100,0],[41.246,21.267,1.933],[0,100,100]],
	[[125,12,70],[0.000,90.400,44.000,50.980],[9.695,5.066,6.261],[0.91445*360,90.401,49.020]],
	[[255,255,255],[0,0,0,0],[95.047,100.000,108.883],[0,0,100]],
	[[90,120,8],[25.000,0.000,93.333,52.941],[10.977,15.624,2.667],[0.21131*360,93.334,47.059]],
	[[15,150,230],[93.478,34.783,0.000,9.804],[25.381,27.624,78.842],[0.56202*360,93.479,90.196]]
]

var errorCnt

for(var i = 0; i < tests.length; i++){
	console.log(`test ${i}`)
	errorCnt = 0
	if(!compArrays(tests[i][1], rgbToCmyk(...tests[i][0]))){
		console.log("ERROR rgb -> cmyk")
		errorCnt++
	} 
	if(!compArrays(tests[i][2], rgbToXyz(...tests[i][0]))){
		console.log("ERROR rgb -> xyz")
		errorCnt++
	} 
	if(!compArrays(tests[i][3], rgbToHsv(...tests[i][0]))){
		console.log("ERROR rgb -> hsv")
		errorCnt++
	} 

	if(!compArrays(tests[i][0], cmykToRgb(...tests[i][1]))){
		console.log("ERROR cmyk -> rgb")
		errorCnt++
	} 
	if(!compArrays(tests[i][0], xyzToRgb(...tests[i][2]))){
		console.log("ERROR xyz -> rgb")
		errorCnt++
	} 
	if(!compArrays(tests[i][0], hsvToRgb(...tests[i][3]))){
		console.log("ERROR hsv -> rgb")
		errorCnt++
	} 
	if(errorCnt == 0) console.log("PASSED")
	else console.log(`ERRORS: ${errorCnt}`)
}
