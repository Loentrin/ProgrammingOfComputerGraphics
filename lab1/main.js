function updateDisplays(){
	for(var i = 0; i < 10; i++){
		document.getElementById(`box${i}`).value = Math.round(values[i])
		document.getElementById(`slider${i}`).value = Math.round(values[i])
	}

	document.getElementById("slider0").style.background = generateGradientString([values[0], values[1], values[2], values[3]], 5, 0, [100,100,100,100], 0, "cmyktorgb")
	document.getElementById("slider1").style.background = generateGradientString([values[0], values[1], values[2], values[3]], 5, 0, [100,100,100,100], 1, "cmyktorgb")
	document.getElementById("slider2").style.background = generateGradientString([values[0], values[1], values[2], values[3]], 5, 0, [100,100,100,100], 2, "cmyktorgb")
	document.getElementById("slider3").style.background = generateGradientString([values[0], values[1], values[2], values[3]], 5, 0, [100,100,100,100], 3, "cmyktorgb")

	document.getElementById("slider4").style.background = generateGradientString([values[4], values[5], values[6]], 15, -100, [100,100,100], 0, "labtorgb")
	document.getElementById("slider5").style.background = generateGradientString([values[4], values[5], values[6]], 15, -100, [100,100,100], 1, "labtorgb")
	document.getElementById("slider6").style.background = generateGradientString([values[4], values[5], values[6]], 15, -100, [100,100,100], 2, "labtorgb")
	
	document.getElementById("slider7").style.background = generateGradientString([values[7], values[8], values[9]], 5, 0, [360,100,100], 0, "hsvtorgb")
	document.getElementById("slider8").style.background = generateGradientString([values[7], values[8], values[9]], 5, 0, [360,100,100], 1, "hsvtorgb")
	document.getElementById("slider9").style.background = generateGradientString([values[7], values[8], values[9]], 5, 0, [360,100,100], 2, "hsvtorgb")

	newVals1 = cmykToRgb(values[0], values[1], values[2], values[3])
	document.getElementById("display").style.background = `rgb(${newVals1[0]},${newVals1[1]},${newVals1[2]})`
}

function updateValues(ref){
	document.getElementById("clippingError").innerHTML = ""
	var newVals1, newVals2, err
	if(ref == 0){
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
	}

	if(ref == 1){
		newVals1 = labToXyz(values[4], values[5], values[6])
		newVals1 = xyzToRgb(newVals1[0], newVals1[1], newVals1[2])
		newVals2 = rgbToCmyk(newVals1[0], newVals1[1], newVals1[2])
		values[0] = newVals2[0]
		values[1] = newVals2[1]
		values[2] = newVals2[2]
		values[3] = newVals2[3]

		newVals1 = labToXyz(values[4], values[5], values[6])
		newVals1 = xyzToRgb(newVals1[0], newVals1[1], newVals1[2])
		newVals2 = rgbToHsv(newVals1[0], newVals1[1], newVals1[2])
		values[7] = newVals2[0]
		values[8] = newVals2[1]
		values[9] = newVals2[2]

		errL = []
		errH = []
		for(var i = 0; i < 4; i++){
			if(values[i] < 0){
				values[i] = 0
				errL.push(i)
			}
			if(values[i] > 100){
				values[i] = 100
				errH.push(i)
			}
		}

		if(errL.length + errH.length > 0){
			document.getElementById("clippingError").innerHTML += "При переводе LAB -> CMYK произошла обрезка значений: "
		}

		if(errL.includes(0)) document.getElementById("clippingError").innerHTML += "C "
		if(errL.includes(1)) document.getElementById("clippingError").innerHTML += "M "
		if(errL.includes(2)) document.getElementById("clippingError").innerHTML += "Y "
		if(errL.includes(3)) document.getElementById("clippingError").innerHTML += "K "
		if(errL.length > 0) document.getElementById("clippingError").innerHTML += "(снизу), "
		if(errH.includes(0)) document.getElementById("clippingError").innerHTML += "C "
		if(errH.includes(1)) document.getElementById("clippingError").innerHTML += "M "
		if(errH.includes(2)) document.getElementById("clippingError").innerHTML += "Y "
		if(errH.includes(3)) document.getElementById("clippingError").innerHTML += "K "
		if(errH.length > 0) document.getElementById("clippingError").innerHTML += "(сверху)"

		errL = []
		errH = []

		for(var i = 7; i < 10; i++){
			if(values[i] < 0){
				values[i] = 0
				errL.push(i)
			}
			if(values[i] > 100 && i != 7){
				values[i] = 100
				errH.push(i)
			}
		}
		if(values[7] > 360){
			values[7] = 360
			errH.push(7)
		}

		if(errL.length + errH.length > 0){
			document.getElementById("clippingError").innerHTML += "<br>При переводе LAB -> HSV произошла обрезка значений: "
		}

		if(errL.includes(7)) document.getElementById("clippingError").innerHTML += "H "
		if(errL.includes(8)) document.getElementById("clippingError").innerHTML += "S "
		if(errL.includes(9)) document.getElementById("clippingError").innerHTML += "V "
		if(errL.length > 0) document.getElementById("clippingError").innerHTML += "(снизу), "
		if(errH.includes(7)) document.getElementById("clippingError").innerHTML += "H "
		if(errH.includes(8)) document.getElementById("clippingError").innerHTML += "S "
		if(errH.includes(9)) document.getElementById("clippingError").innerHTML += "V "
		if(errH.length > 0) document.getElementById("clippingError").innerHTML += "(сверху)"
	}

	if(ref == 2){
		newVals1 = hsvToRgb(values[7], values[8], values[9])
		newVals2 = rgbToCmyk(newVals1[0], newVals1[1], newVals1[2])
		values[0] = newVals2[0]
		values[1] = newVals2[1]
		values[2] = newVals2[2]
		values[3] = newVals2[3]

		newVals1 = hsvToRgb(values[7], values[8], values[9])
		newVals2 = rgbToXyz(newVals1[0], newVals1[1], newVals1[2])
		newVals2 = xyzToLab(newVals2[0], newVals2[1], newVals2[2])
		values[4] = newVals2[0]
		values[5] = newVals2[1]
		values[6] = newVals2[2]
	}

	updateDisplays()
}

function generateGradientString(values, splits, minValue, maxValues, gradValueId, func=""){
	var values1
	values[gradValueId] = minValue
	maxValues[gradValueId] = (maxValues[gradValueId]-minValue)/(splits-1)
	var res = `linear-gradient(to right`
	for(var i = 0; i < splits; i++){
		res += `,rgb(`
		if(func == ""){
			values1 = values.slice(0)
		}
		if(func == "cmyktorgb"){
			values1 = cmykToRgb(...values)
		}
		if(func == "labtorgb"){
			values1 = xyzToRgb(...labToXyz(...values))
		}
		if(func == "hsvtorgb"){
			values1 = hsvToRgb(...values)
		}
		for(var k = 0; k < values1.length; k++){
			if(k != 0) res += `,`
			if(values1[k] < 0) values1[k] = 0
			if(values1[k] > 255) values1[k] = 255
			res += `${values1[k]}`
		}
		res += `)`
		values[gradValueId] += maxValues[gradValueId]
		
	}
	res += `)`
	return res
}

function sliderEvent(id){
	values[id] = Number(document.getElementById(`slider${id}`).value)
	if(id <= 3){
		updateValues(0)
	}
	if(id >= 4 && id <= 6){
		updateValues(1)
	}
	if(id >= 7){
		updateValues(2)
	}
}

function boxEvent(id){
	values[id] = Number(document.getElementById(`box${id}`).value)
	if(values[id] < 0 && ![4,5,6].includes(id)){
		values[id] = 0
	}
	if(values[id] > 100 && ![4,5,6,7].includes(id)){
		values[id] = 100
	}
	if(values[id] > 360 && id == 7){
		values[id] = 360
	}
	if(id <= 3){
		updateValues(0)
	}
	if(id >= 4 && id <= 6){
		updateValues(1)
	}
	if(id >= 7){
		updateValues(2)
	}
}

palette.onclick = function(e){
	var px = e.x-palette.getBoundingClientRect().left
	var py = e.y-palette.getBoundingClientRect().top
	var vals1 = rgbToCmyk(...paletteCols[Math.floor(px/20)*10+Math.floor(py/20)])
	values[0] = vals1[0]
	values[1] = vals1[1]
	values[2] = vals1[2]
	values[3] = vals1[3]
	updateValues(0)
}

function setLabSetting(val){
	labReferences = getLabValues(val)
	updateValues(0)
}