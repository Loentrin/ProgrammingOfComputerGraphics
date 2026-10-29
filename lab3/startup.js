inputElement.addEventListener("change", handleFiles);

origImage.onload = (e) => {
    canvas.width = origImage.width
    canvas.height = origImage.height
    ctx.drawImage(origImage, 0, 0)
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    resultImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    
    img1.width = 400
    img1.height = Math.floor(400/origImage.width*origImage.height)
    ctx1.drawImage(origImage, 0, 0, img1.width, img1.height)

    drawHistogram(hist1, ctxHist1, buildHistogram(imageData))
   }