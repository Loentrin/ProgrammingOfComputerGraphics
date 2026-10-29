function setupFilters(){
    filter = 1
    if(document.getElementById("fil2").checked) filter = 2 
    if(document.getElementById("fil3").checked) filter = 3 
    if(document.getElementById("fil4").checked) filter = 4
    medianRadius = Number(document.getElementById("radvalue").value) 

    if(!loadedImg) return;

    runFilter()
    updateResultImage()
}

function runFilter(){
  var wind = []
  var id, i2, k2
  var tempImageData = new ImageData(imageData.width, imageData.height)
  for(var i = 0; i < imageData.data.length; i+=4){
      wind = []
        for(var i1 = -medianRadius; i1 <= medianRadius; i1++){
            i2 = i + i1*4
            if(Math.floor((i/4)/imageData.width) != Math.floor((i2/4)/imageData.width) || i2 >= imageData.data.length){
              i2 = i;
            }
            
            wind.push([imageData.data[i2], imageData.data[i2+1], imageData.data[i2+2]])
        }
        wind.sort(function(a, b){
          if(Math.max(...a) == Math.max(...b)) return a[0]+a[1]+a[2] > b[0]+b[1]+b[2]
          return Math.max(...a) > Math.max(...b)
        })
        var med = 0
        if(filter == 1) med = Math.floor(wind.length/2)
        if(filter == 3) med = wind.length-1
        if(filter == 4){
          tempImageData.data[i] = (wind[0][0]+wind[wind.length-1][0])/2
          tempImageData.data[i+1] = (wind[0][1]+wind[wind.length-1][1])/2
          tempImageData.data[i+2] = (wind[0][2]+wind[wind.length-1][2])/2
        }
        else{
          tempImageData.data[i] = wind[med][0]
          tempImageData.data[i+1] = wind[med][1]
          tempImageData.data[i+2] = wind[med][2]
        }
        
        tempImageData.data[i+3] = 255
  }

  for(var i = 0; i != imageData.data.length-1; i+=imageData.width*4){
      if(i >= imageData.data.length) i -= imageData.data.length-1
        wind = []
        for(var i1 = -medianRadius; i1 <= medianRadius; i1++){
            i2 = i + i1*imageData.width*4
            if((i/4)%imageData.width != (i2/4)%imageData.width || i2 >= imageData.data.length){
              i2 = i;
            }
            wind.push([tempImageData.data[i2], tempImageData.data[i2+1],tempImageData.data[i2+2]])
        }
        wind.sort(function(a, b){
          if(Math.max(...a) == Math.max(...b)) return a[0]+a[1]+a[2] > b[0]+b[1]+b[2]
          return Math.max(...a) > Math.max(...b)
        })
        var med = 0
        if(filter == 1) med = Math.floor(wind.length/2)
        if(filter == 3) med = wind.length-1
        if(filter == 4){
          resultImageData.data[i] = (wind[0][0]+wind[wind.length-1][0])/2
          resultImageData.data[i+1] = (wind[0][1]+wind[wind.length-1][1])/2
          resultImageData.data[i+2] = (wind[0][2]+wind[wind.length-1][2])/2
        }
        else{
          resultImageData.data[i] = wind[med][0]
          resultImageData.data[i+1] = wind[med][1]
          resultImageData.data[i+2] = wind[med][2]
        }
        resultImageData.data[i+3] = 255
    }
}

function lincont(){
  var newVals = []
  var minVal = 100
  var maxVal = 0
  var curVal

  for(var i = 0; i < imageData.data.length; i+=4){
          curVal = Math.max(imageData.data[i], imageData.data[i+1], imageData.data[i+2])
          if(curVal < minVal) minVal = curVal
          if(curVal > maxVal) maxVal = curVal
      }

    for(var i = 0; i < imageData.data.length; i+=4){
        newVals = rgbToHsv(imageData.data[i], imageData.data[i+1], imageData.data[i+2])
        newVals[2] *= 2.55
        newVals[2] = (newVals[2]-minVal)*(Number(document.getElementById("lcvalue2").value)-Number(document.getElementById("lcvalue1").value))/(maxVal-minVal)+Number(document.getElementById("lcvalue1").value)
        newVals[2] /= 2.55
      
      newVals = hsvToRgb(newVals[0], newVals[1], newVals[2])
      
      resultImageData.data[i] = Math.round(newVals[0])
      resultImageData.data[i+1] = Math.round(newVals[1])
      resultImageData.data[i+2] = Math.round(newVals[2])
    }
    drawHistogram(hist3, ctxHist3, buildHistogram(resultImageData))
  updateResultImage()
}