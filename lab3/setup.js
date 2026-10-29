var inputElement = document.getElementById("imginput");
var canvas = document.createElement("canvas")
var ctx = canvas.getContext("2d")
var img1 = document.getElementById("visibleImg1")
var ctx1 = img1.getContext("2d")
img1.width = 400
img1.height = 200
var img2 = document.getElementById("visibleImg2")
var ctx2 = img2.getContext("2d")
img2.width = 400
img2.height = 200

var hist1 = document.getElementById("histogram1")
var ctxHist1 = hist1.getContext("2d")
hist1.width = 300
hist1.height = 200

var hist2 = document.getElementById("histogram2")
var ctxHist2 = hist2.getContext("2d")
hist2.width = 300
hist2.height = 200

var hist3 = document.getElementById("histogram3")
var ctxHist3 = hist3.getContext("2d")
hist3.width = 300
hist3.height = 200

var imgTemp = document.createElement("canvas")
var ctxTemp = imgTemp.getContext("2d")
var origImage = document.createElement("img")
var imageData, resultImageData
var filter = 1
var medianRadius = 3
var loadedImg = false

document.getElementById("fil1").checked = true
document.getElementById("fil2").checked = false
document.getElementById("fil3").checked = false
document.getElementById("fil4").checked = false
document.getElementById("eq1").checked = true
document.getElementById("eq2").checked = false
document.getElementById("radvalue").value = 2
document.getElementById("lcvalue1").value = 0
document.getElementById("lcvalue2").value = 255
document.getElementById("clahe").checked = true
document.getElementById("clahemax").value = 3
document.getElementById("clahesize").value = 100