/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/material-ripple-effects";
exports.ids = ["vendor-chunks/material-ripple-effects"];
exports.modules = {

/***/ "(ssr)/./node_modules/material-ripple-effects/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/material-ripple-effects/index.js ***!
  \*******************************************************/
/***/ ((module) => {

eval("module.exports = class Ripple {\r\n  constructor() {\r\n    this.x = 0;\r\n    this.y = 0;\r\n    this.z = 0;\r\n  }\r\n\r\n  findFurthestPoint(\r\n    clickPointX,\r\n    elementWidth,\r\n    offsetX,\r\n    clickPointY,\r\n    elementHeight,\r\n    offsetY,\r\n  ) {\r\n    this.x = clickPointX - offsetX > elementWidth / 2 ? 0 : elementWidth;\r\n    this.y = clickPointY - offsetY > elementHeight / 2 ? 0 : elementHeight;\r\n    this.z = Math.hypot(\r\n      this.x - (clickPointX - offsetX),\r\n      this.y - (clickPointY - offsetY),\r\n    );\r\n\r\n    return this.z;\r\n  }\r\n\r\n  appyStyles(element, color, rect, radius, event) {\r\n    element.classList.add('ripple');\r\n    element.style.backgroundColor =\r\n      color === 'dark' ? 'rgba(0,0,0, 0.2)' : 'rgba(255,255,255, 0.3)';\r\n    element.style.borderRadius = '50%';\r\n    element.style.pointerEvents = 'none';\r\n    element.style.position = 'absolute';\r\n    element.style.left = event.clientX - rect.left - radius + 'px';\r\n    element.style.top = event.clientY - rect.top - radius + 'px';\r\n    element.style.width = element.style.height = radius * 2 + 'px';\r\n  }\r\n\r\n  applyAnimation(element) {\r\n    element.animate(\r\n      [\r\n        {\r\n          transform: 'scale(0)',\r\n          opacity: 1,\r\n        },\r\n        {\r\n          transform: 'scale(1.5)',\r\n          opacity: 0,\r\n        },\r\n      ],\r\n      {\r\n        duration: 500,\r\n        easing: 'linear',\r\n      },\r\n    );\r\n  }\r\n\r\n  create(event, color) {\r\n    const element = event.currentTarget;\r\n\r\n    element.style.position = 'relative';\r\n    element.style.overflow = 'hidden';\r\n\r\n    const rect = element.getBoundingClientRect();\r\n\r\n    const radius = this.findFurthestPoint(\r\n      event.clientX,\r\n      element.offsetWidth,\r\n      rect.left,\r\n      event.clientY,\r\n      element.offsetHeight,\r\n      rect.top,\r\n    );\r\n\r\n    const circle = document.createElement('span');\r\n\r\n    this.appyStyles(circle, color, rect, radius, event);\r\n    this.applyAnimation(circle);\r\n\r\n    element.appendChild(circle);\r\n\r\n    setTimeout(() => circle.remove(), 500);\r\n  }\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWF0ZXJpYWwtcmlwcGxlLWVmZmVjdHMvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2poYWVibG9nLy4vbm9kZV9tb2R1bGVzL21hdGVyaWFsLXJpcHBsZS1lZmZlY3RzL2luZGV4LmpzPzc0MzMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBSaXBwbGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy54ID0gMDtcclxuICAgIHRoaXMueSA9IDA7XHJcbiAgICB0aGlzLnogPSAwO1xyXG4gIH1cclxuXHJcbiAgZmluZEZ1cnRoZXN0UG9pbnQoXHJcbiAgICBjbGlja1BvaW50WCxcclxuICAgIGVsZW1lbnRXaWR0aCxcclxuICAgIG9mZnNldFgsXHJcbiAgICBjbGlja1BvaW50WSxcclxuICAgIGVsZW1lbnRIZWlnaHQsXHJcbiAgICBvZmZzZXRZLFxyXG4gICkge1xyXG4gICAgdGhpcy54ID0gY2xpY2tQb2ludFggLSBvZmZzZXRYID4gZWxlbWVudFdpZHRoIC8gMiA/IDAgOiBlbGVtZW50V2lkdGg7XHJcbiAgICB0aGlzLnkgPSBjbGlja1BvaW50WSAtIG9mZnNldFkgPiBlbGVtZW50SGVpZ2h0IC8gMiA/IDAgOiBlbGVtZW50SGVpZ2h0O1xyXG4gICAgdGhpcy56ID0gTWF0aC5oeXBvdChcclxuICAgICAgdGhpcy54IC0gKGNsaWNrUG9pbnRYIC0gb2Zmc2V0WCksXHJcbiAgICAgIHRoaXMueSAtIChjbGlja1BvaW50WSAtIG9mZnNldFkpLFxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy56O1xyXG4gIH1cclxuXHJcbiAgYXBweVN0eWxlcyhlbGVtZW50LCBjb2xvciwgcmVjdCwgcmFkaXVzLCBldmVudCkge1xyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdyaXBwbGUnKTtcclxuICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID1cclxuICAgICAgY29sb3IgPT09ICdkYXJrJyA/ICdyZ2JhKDAsMCwwLCAwLjIpJyA6ICdyZ2JhKDI1NSwyNTUsMjU1LCAwLjMpJztcclxuICAgIGVsZW1lbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzUwJSc7XHJcbiAgICBlbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XHJcbiAgICBlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IGV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQgLSByYWRpdXMgKyAncHgnO1xyXG4gICAgZWxlbWVudC5zdHlsZS50b3AgPSBldmVudC5jbGllbnRZIC0gcmVjdC50b3AgLSByYWRpdXMgKyAncHgnO1xyXG4gICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gcmFkaXVzICogMiArICdweCc7XHJcbiAgfVxyXG5cclxuICBhcHBseUFuaW1hdGlvbihlbGVtZW50KSB7XHJcbiAgICBlbGVtZW50LmFuaW1hdGUoXHJcbiAgICAgIFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgwKScsXHJcbiAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMS41KScsXHJcbiAgICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIHtcclxuICAgICAgICBkdXJhdGlvbjogNTAwLFxyXG4gICAgICAgIGVhc2luZzogJ2xpbmVhcicsXHJcbiAgICAgIH0sXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKGV2ZW50LCBjb2xvcikge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcblxyXG4gICAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcbiAgICBlbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gICAgY29uc3QgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgY29uc3QgcmFkaXVzID0gdGhpcy5maW5kRnVydGhlc3RQb2ludChcclxuICAgICAgZXZlbnQuY2xpZW50WCxcclxuICAgICAgZWxlbWVudC5vZmZzZXRXaWR0aCxcclxuICAgICAgcmVjdC5sZWZ0LFxyXG4gICAgICBldmVudC5jbGllbnRZLFxyXG4gICAgICBlbGVtZW50Lm9mZnNldEhlaWdodCxcclxuICAgICAgcmVjdC50b3AsXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGNpcmNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHJcbiAgICB0aGlzLmFwcHlTdHlsZXMoY2lyY2xlLCBjb2xvciwgcmVjdCwgcmFkaXVzLCBldmVudCk7XHJcbiAgICB0aGlzLmFwcGx5QW5pbWF0aW9uKGNpcmNsZSk7XHJcblxyXG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChjaXJjbGUpO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4gY2lyY2xlLnJlbW92ZSgpLCA1MDApO1xyXG4gIH1cclxufTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/material-ripple-effects/index.js\n");

/***/ })

};
;