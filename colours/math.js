function cmykToRgb(c, m, y, k){
	return [255*(1-c/100)*(1-k/100), 255*(1-m/100)*(1-k/100), 255*(1-y/100)*(1-k/100)]
}

function rgbToCmyk(r, g, b){
	if(r == 0 && g == 0 && b == 0) return [0,0,0,100]
	var k = 1-Math.max(r, Math.max(g, b))/255
	return [100*(1-r/255-k)/(1-k), 100*(1-g/255-k)/(1-k), 100*(1-b/255-k)/(1-k), 100*k]
}

function rgbToHsv(r, g, b){
	var h, s, v
	r /= 255
	g /= 255
	b /= 255
	var min1 = Math.min(Math.min(r, g), b)
	var max1 = Math.max(Math.max(r, g), b)
	var delta = max1-min1
	v = max1

	if(delta == 0){
		return [0, 0, v*100]
	}

	s = delta/max1

	var dr = ((max1-r)/6 + delta/2)/delta
	var dg = ((max1-g)/6 + delta/2)/delta
	var db = ((max1-b)/6 + delta/2)/delta

	if(r == max1) h = db-dg
	if(g == max1) h = 1/3+dr-db
	if(b == max1) h = 2/3+dg-dr

	if(h < 0) h += 1
	if(h > 1) h -= 1
	return [h*360, s*100, v*100]
}

function rgbToXyz(r, g, b){
	r /= 255
	g /= 255
	b /= 255

	if (r > 0.04045) r = ((r+0.055)/1.055)**2.4
	else r /= 12.92
	
	if (g > 0.04045) g = ((g+0.055)/1.055)**2.4
	else g /= 12.92

	if (b > 0.04045) b = ((b+0.055)/1.055)**2.4
	else b /= 12.92

	r *= 100
	g *= 100
	b *= 100

	return[r*0.4124+g*0.3576+b*0.1805, r*0.2126+g*0.7152+b*0.0722, r*0.0193+g*0.1192+b*0.9505]
}

function hsvToRgb(h, s, v){
	var vi, v1, v2, v3
	h /= 360
	s /= 100
	v /= 100
	if(s == 0){
		return[255*v, 255*v, 255*v]
	}
	
	h *= 6
	if(h == 6) h = 0      //H must be < 1
   	vi = Math.floor(h)
   	v *= 255
   	v1 = v*(1-s)
   	v2 = v*(1-s*(h-vi))
   	v3 = v*(1-s*(1-h+vi))
   	

   	if(vi == 0) return [v, v3, v1]
   	if(vi == 1) return [v2, v, v1]
   	if(vi == 2) return [v1, v, v3]
   	if(vi == 3) return [v1, v2, v]
   	if(vi == 4) return [v3, v1, v]
   	return [v, v1, v2]
}

function xyzToRgb(x, y, z){
	var r, g, b

	x /= 100
	y /= 100
	z /= 100

	r = x*3.2406 + y*-1.5372 + z*-0.4986
	g = x*-0.9689 + y*1.8758 + z*0.0415
	b = x*0.0557 + y*-0.2040 + z*1.0570

	if (r > 0.0031308) r = 1.055*(r**(1/2.4))-0.055
	else r *= 12.92

	if (g > 0.0031308) g = 1.055*(g**(1/2.4))-0.055
	else g *= 12.92

	if (b > 0.0031308) b = 1.055*(b**(1/2.4))-0.055
	else b *= 12.92

	return[r*255, g*255, b*255]
}

function xyzToLab(x, y, z){
	x /= labReferences[0]
	y /= labReferences[1]
	z /= labReferences[2]

	if (x > 0.008856) x = x**(1/3)
	else x = (7.787*x) + (16/116)
	
	if (y > 0.008856) y = y**(1/3)
	else y = (7.787*y) + (16/116)

	if (z > 0.008856) z = z**(1/3)
	else z = (7.787*z) + (16/116)

	return [116*y-16, 500*(x-y), 200*(y-z)]
}

function labToXyz(l, a, b){
	var x, y, z
	y = (l+16)/116
	x = a/500+y
	z = y-b/200

	if (y*y*y > 0.008856) y=y*y*y
	else y = (y-16/116)/7.787
	
	if (x*x*x > 0.008856) x=x*x*x
	else x = (x-16/116)/7.787

	if (z*z*z > 0.008856) z=z*z*z
	else z = (z-16/116)/7.787

	return [x*labReferences[0], y*labReferences[1], z*labReferences[2]]
}

function getLabValues(val){
	if(val == "d65") return [94.811, 100, 107.304]
	if(val == "d50") return [96.720, 100, 81.427]
	if(val == "e") return [100, 100, 100]
}

//CIE 1964

function compArrays(a1, a2){
	//console.log(a1, a2)
	for(var i = 0; i < a1.length; i++){
		if(Math.abs(a1[i]-a2[i]) > 0.5) return false
	}
	return true
}