"use strict";

var init = function() {
  document.querySelector('body').addEventListener('dblclick', function() {
    var drawCanvas = document.querySelector('draw-canvas');
    drawCanvas.strokeWeight = 10;
    drawCanvas.clear();
  });
};

window.addEventListener('load', init);
