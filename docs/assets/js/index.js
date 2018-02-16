"use strict";

var drawCanvas;

var init = function() {
  document.querySelector('body').addEventListener('dblclick', function() {
    drawCanvas = document.querySelector('draw-canvas');
    document.querySelector('.clear-button').addEventListener('click', clearCanvas);
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
  });
};

var strokeWeight = function(val) {
  var currentWeight = parseInt(drawCanvas.getAttribute('stroke-weight')) || 1;
  drawCanvas.strokeWeight = currentWeight + val;
  console.log(currentWeight);
};

var clearCanvas = function() {
  drawCanvas.clear();
};

var changeColor = function(color) {
  drawCanvas.strokeColor = color;
};

window.addEventListener('load', init);
