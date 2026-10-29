function buildHistogram(data, separateVals=-1){
  var vals = []
  var curVal, maxVal
  valSum = 0
  maxVal = 0
  for(var i = 0; i < 256; i++){
    vals.push(0)
  }
  for(var i = 0; i < data.data.length; i+=4){
    if(separateVals == -1) curVal = Math.max(data.data[i],data.data[i+1],data.data[i+2])
    else curVal = data.data[i+separateVals]
    vals[curVal]++
  }

  return vals
}

function equaliseHistogram(data){

  var vals
  var equalisedVals = []

  var minNonZero = 0
  var valSum = 0
  var maxVal = 0


  vals = buildHistogram(data)

  for(var i = 0; i < 256; i++){
    if(vals[i] != 0){
      minNonZero = vals[i]
      break
    }
  }

  for(var i = 0; i < 256; i++){
    valSum += vals[i]
    equalisedVals.push(Math.round(256*(valSum-minNonZero)/(data.width*data.height-minNonZero)))
    if(equalisedVals[i] > maxVal){
      maxVal = equalisedVals[i]
    }
  }

  return equalisedVals
}

function drawHistogram(canv, ctx, vals, triple=-1){
  var maxVal = 0
  for(var i = 0; i < 256; i++){
    if(vals[i] > maxVal){
      maxVal = vals[i]
    }
  }

  ctx.lineWidth = 2
  ctx.strokeStyle = "blue"

  if(triple <= 0) ctx.clearRect(0, 0, canv.width, canv.height)

  if(triple == -1){
    for(var i = 0; i < 256; i++){
      if(vals[i] > 0){
        ctx.beginPath()
        ctx.moveTo(i*canv.width/256, canv.height)
        ctx.lineTo(i*canv.width/256, canv.height*(1-vals[i]/maxVal))
        ctx.stroke()
      }
  }
}
  else{
    for(var i = 0; i < 256; i++){
      ctx.strokeStyle = ["red","green","blue"][triple]
      if(vals[i] > 0){
        ctx.beginPath()
        ctx.moveTo(i*canv.width/256, canv.height-canv.height/3*triple)
        ctx.lineTo(i*canv.width/256, canv.height-canv.height/3*triple-canv.height*vals[i]/maxVal/3.2)
        ctx.stroke()
      }
  }
}
}

function runClaheEqualise(){
  var windsize = Number(document.getElementById("clahesize").value)

  var wind = new ImageData(windsize, windsize)
  var windCopy = new ImageData(windsize, windsize)
  var j3, j4, eq, newVals, clipLimit
  clipLimit = Number(document.getElementById("clahemax").value)
  var tempImageData = new ImageData(imageData.width, imageData.height)
  var tempImageData2 = new ImageData(imageData.width, imageData.height)

    for(var i = 0; i < imageData.height; i+=5){
      for(var k = 0; k < imageData.width; k+=5){
        for(var j1 = 0; j1 < windsize && i+j1 < imageData.height; j1++){
          for(var j2 = 0; j2 < windsize && k+j2 < imageData.width; j2++){
            j3 = i+j1
            j4 = k+j2
            wind.data[(j1*windsize+j2)*4] = imageData.data[(j3*imageData.width+j4)*4]
            wind.data[(j1*windsize+j2)*4+1] = imageData.data[(j3*imageData.width+j4)*4+1]
            wind.data[(j1*windsize+j2)*4+2] = imageData.data[(j3*imageData.width+j4)*4+2]

            windCopy.data[(j1*windsize+j2)*4] = wind.data[(j1*windsize+j2)*4]
            windCopy.data[(j1*windsize+j2)*4+1] = wind.data[(j1*windsize+j2)*4+1]
            windCopy.data[(j1*windsize+j2)*4+2] = wind.data[(j1*windsize+j2)*4+2]
          }
        }

        eq = equaliseHistogram(wind)

        if(document.getElementById("eq1").checked){
          for(var j1 = 0; j1 < windsize && i+j1 < imageData.height; j1++){
          for(var j2 = 0; j2 < windsize && k+j2 < imageData.width; j2++){
            j3 = i+j1
            j4 = k+j2
            newVals = [wind.data[(j1*windsize+j2)*4], wind.data[(j1*windsize+j2)*4+1], wind.data[(j1*windsize+j2)*4+2]]
            newVals[0] = eq[Math.round(newVals[0])]
            newVals[1] = eq[Math.round(newVals[1])]
            newVals[2] = eq[Math.round(newVals[2])]
            if(newVals[0] > windCopy.data[(j1*windsize+j2)*4]*clipLimit){
              newVals[0] = windCopy.data[(j1*windsize+j2)*4]*clipLimit
            }
            if(newVals[1] > windCopy.data[(j1*windsize+j2)*4+1]*clipLimit){
              newVals[1] = windCopy.data[(j1*windsize+j2)*4+1]*clipLimit
            }
            if(newVals[2] > windCopy.data[(j1*windsize+j2)*4+2]*clipLimit){
              newVals[2] = windCopy.data[(j1*windsize+j2)*4+2]*clipLimit
            }
            tempImageData.data[(j3*imageData.width+j4)*4] = Math.round(newVals[0])
            tempImageData.data[(j3*imageData.width+j4)*4+1] = Math.round(newVals[1])
            tempImageData.data[(j3*imageData.width+j4)*4+2] = Math.round(newVals[2])
          }
        }
        }
        else{
            for(var j1 = 0; j1 < windsize && i+j1 < imageData.height; j1++){
          for(var j2 = 0; j2 < windsize && k+j2 < imageData.width; j2++){
            j3 = i+j1
            j4 = k+j2
            newVals = rgbToHsv(wind.data[(j1*windsize+j2)*4], wind.data[(j1*windsize+j2)*4+1], wind.data[(j1*windsize+j2)*4+2])
            newVals[2] *= 2.55
        newVals[2] = eq[Math.round(newVals[2])]
        newVals[2] /= 2.55
      
            newVals = hsvToRgb(newVals[0], newVals[1], newVals[2])
            if(newVals[0] > windCopy.data[(j1*windsize+j2)*4]*clipLimit){
              newVals[0] = windCopy.data[(j1*windsize+j2)*4]*clipLimit
            }
            if(newVals[1] > windCopy.data[(j1*windsize+j2)*4+1]*clipLimit){
              newVals[1] = windCopy.data[(j1*windsize+j2)*4+1]*clipLimit
            }
            if(newVals[2] > windCopy.data[(j1*windsize+j2)*4+2]*clipLimit){
              newVals[2] = windCopy.data[(j1*windsize+j2)*4+2]*clipLimit
            }
            tempImageData.data[(j3*imageData.width+j4)*4] = Math.round(newVals[0])
            tempImageData.data[(j3*imageData.width+j4)*4+1] = Math.round(newVals[1])
            tempImageData.data[(j3*imageData.width+j4)*4+2] = Math.round(newVals[2])
          }
        }

        
        }
      }
  }

  for(var i = 0; i < imageData.height*4; i+=4){
    for(var k = 0; k < imageData.width*4; k+=4){
      resultImageData.data[i*imageData.width+k] = tempImageData.data[i*imageData.width+k]
      resultImageData.data[i*imageData.width+k+1] = tempImageData.data[i*imageData.width+k+1]
      resultImageData.data[i*imageData.width+k+2] = tempImageData.data[i*imageData.width+k+2]
    }
  }



    if(document.getElementById("eq1").checked){
      drawHistogram(hist1, ctxHist1, buildHistogram(imageData, 0), 0)
    drawHistogram(hist1, ctxHist1, buildHistogram(imageData, 1), 1)
    drawHistogram(hist1, ctxHist1, buildHistogram(imageData, 2), 2)

    drawHistogram(hist2, ctxHist2, buildHistogram(resultImageData, 0), 0)
    drawHistogram(hist2, ctxHist2, buildHistogram(resultImageData, 1), 1)
    drawHistogram(hist2, ctxHist2, buildHistogram(resultImageData, 2), 2)
    }
    else{
      drawHistogram(hist1, ctxHist1, buildHistogram(imageData))
    drawHistogram(hist2, ctxHist2, buildHistogram(resultImageData))
    }

    updateResultImage()
}

function runEqualise(){
  if(document.getElementById("clahe").checked){
    runClaheEqualise()
    return
  }
  var eq = equaliseHistogram(imageData)
  if(document.getElementById("eq1").checked){
    for(var i = 0; i < imageData.data.length; i+=4){
        newVals = [imageData.data[i], imageData.data[i+1], imageData.data[i+2]]
        newVals[0] = eq[Math.round(newVals[0])]
        newVals[1] = eq[Math.round(newVals[1])]
        newVals[2] = eq[Math.round(newVals[2])]
      
      resultImageData.data[i] = Math.round(newVals[0])
      resultImageData.data[i+1] = Math.round(newVals[1])
      resultImageData.data[i+2] = Math.round(newVals[2])
    }
    drawHistogram(hist1, ctxHist1, buildHistogram(imageData, 0), 0)
    drawHistogram(hist1, ctxHist1, buildHistogram(imageData, 1), 1)
    drawHistogram(hist1, ctxHist1, buildHistogram(imageData, 2), 2)

    drawHistogram(hist2, ctxHist2, buildHistogram(resultImageData, 0), 0)
    drawHistogram(hist2, ctxHist2, buildHistogram(resultImageData, 1), 1)
    drawHistogram(hist2, ctxHist2, buildHistogram(resultImageData, 2), 2)
  }
  else{
    for(var i = 0; i < imageData.data.length; i+=4){
        newVals = rgbToHsv(imageData.data[i], imageData.data[i+1], imageData.data[i+2])
        newVals[2] *= 2.55
        newVals[2] = eq[Math.round(newVals[2])]
        newVals[2] /= 2.55
      
      newVals = hsvToRgb(newVals[0], newVals[1], newVals[2])
      
      resultImageData.data[i] = Math.round(newVals[0])
      resultImageData.data[i+1] = Math.round(newVals[1])
      resultImageData.data[i+2] = Math.round(newVals[2])
    }
    drawHistogram(hist1, ctxHist1, buildHistogram(imageData))
    drawHistogram(hist2, ctxHist2, buildHistogram(resultImageData))
  }
  updateResultImage()
  
}