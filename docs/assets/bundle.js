!function(t){var e={};function s(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(1);customElements.define("draw-canvas",i.a)},function(t,e,s){"use strict";e.a=class extends HTMLElement{constructor(){super(),this._height=null,this._width=null,this.canvas=null,this.ctx=null,this.drawing=!1}set width(t){this.setAttribute("width",t)}set height(t){this.setAttribute("height",t)}static get observedAttributes(){return["height","width"]}attributeChangedCallback(t,e,s){switch(t){case"width":this._width=parseInt(s,10)||0,this.canvas&&(this.canvas.width=this._width);break;case"height":this._height=parseInt(s,10)||0,this.canvas&&(this.canvas.height=this._height)}}connectedCallback(){this.style.display="block",this.style.width=`${this._width}px`,this.style.height=`${this._height}px`;const t=document.createElement("canvas");t.height=this._height,t.width=this._width,this.appendChild(t),this.init()}init(){this.canvas=this.querySelector("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.addEventListener("mousedown",this.handleMouseDown.bind(this)),this.canvas.addEventListener("mousemove",this.handleMouseMove.bind(this)),this.canvas.addEventListener("mouseout",this.mouseUp.bind(this)),this.canvas.addEventListener("mouseup",this.mouseUp.bind(this))}handleMouseDown(t){const e=t.offsetX,s=t.offsetY;this.drawing=!0,this.ctx.beginPath(),this.ctx.moveTo(e,s)}handleMouseMove(t){if(this.drawing){const e=t.offsetX,s=t.offsetY;this.ctx.lineTo(e,s),this.ctx.stroke()}}mouseUp(){this.drawing=!1}}}]);
//# sourceMappingURL=bundle.js.map