"use strict";

var drawCanvas;

var strokeWeight = function(val) {
  var currentWeight = parseInt(drawCanvas.getAttribute('stroke-weight')) || 1;
  drawCanvas.strokeWeight = currentWeight + val;
};

var clearCanvas = function() {
  drawCanvas.clear();
};

var changeColor = function(color) {
  drawCanvas.strokeColor = color;
  drawCanvas.fillColor = color;
};

var toggleBucketTool = function(){
  if(drawCanvas.isFilling){
    drawCanvas.isFilling = false;
  }else{
    drawCanvas.isFilling = true;
  }
}

var init = function() {
  drawCanvas = document.querySelector('draw-canvas');
  document.querySelector('.clear-button').addEventListener('click', clearCanvas);
  document.querySelector('.color-bucket-button').addEventListener('click', toggleBucketTool);
  document.querySelector('.increase-stroke').addEventListener('click', function() {
    strokeWeight(1);
  });
  document.querySelector('.decrease-stroke').addEventListener('click', function() {
    strokeWeight(-1);
  });
  document.querySelector('.red-button').addEventListener('click', function() {
    changeColor('#f00');
  });
  document.querySelector('.green-button').addEventListener('click', function() {
    changeColor('#0f0');
  });
  document.querySelector('.blue-button').addEventListener('click', function() {
    changeColor('#00f');
  });
  document.querySelector('.black-button').addEventListener('click', function() {
    changeColor('#000');
  });
};

window.addEventListener('load', init);
