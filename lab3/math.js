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

function bilinearInterpolation(x1, y1, x2, y2, v1, v2, v3, v4, x, y){
  return (v1*(x2-x)*(y2-y)+v3*(x2-x)*(y-y1)) / ((x2-x1)*(y2-y1)) + (v2*(x-x1)*(y2-y)+v4*(x-x1)*(y-y1))/((x2-x1)*(y2-y1))
}