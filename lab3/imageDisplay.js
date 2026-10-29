function handleFiles() {
  var file = this.files[0];

  origImage.file = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    origImage.src = e.target.result;
    loadedImg = true
   };

   reader.readAsDataURL(file);
}

function updateResultImage(){
    imgTemp.width = origImage.width
    imgTemp.height = origImage.height
    ctxTemp.putImageData(resultImageData, 0, 0)
    img2.width = 400
    img2.height = Math.floor(400/origImage.width*origImage.height)
    ctx2.drawImage(imgTemp, 0, 0, 400, Math.floor(400/origImage.width*origImage.height))
}