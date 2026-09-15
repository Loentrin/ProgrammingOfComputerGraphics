function performTests(){
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
}

document.addEventListener("DOMContentLoaded", (event) => {
	for(var i = 0; i < 20; i++){
		for(var k = 0; k < 10; k++){
			paletteCols.push(hsvToRgb(i/20*360,[0,20,40,60,80,100,100,100,100,100][k],[100,100,100,100,100,100,75,50,25,0][k]))
		}	
	}

	for(var i = 0; i < 20; i++){
		for(var k = 0; k < 10; k++){
			ctx.fillStyle = `rgb(${paletteCols[i*10+k][0]},${paletteCols[i*10+k][1]},${paletteCols[i*10+k][2]})`
			ctx.fillRect(i*20, k*20, 20, 20)
			ctx.strokeRect(i*20, k*20, 20, 20)
		}
	}

	values = [80,0,0,30,0,0,0,0,0,0]
	setLabSetting("d65")
  	document.getElementById("lightD65").checked = true
  	updateValues(0)

  	performTests()
});