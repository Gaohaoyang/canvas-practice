/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/30-space-ship-boundary/index.ts":
/*!*********************************************!*\
  !*** ./src/30-space-ship-boundary/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common_stats__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/stats */ \"./src/common/stats.ts\");\n/* harmony import */ var _common_Ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/Ship */ \"./src/common/Ship.ts\");\n\n\nvar canvas = document.querySelector('#mainCanvas');\nvar aRotation = 80; // 飞船旋转角加速度\n\nvar aThrust = 50; // 推进加速度\n\nvar x0 = window.innerWidth / 2; // 初始位置\n\nvar y0 = window.innerHeight / 2;\nvar aRotationShip = 0; // 旋转角加速度\n\nvar vRotationShip = 0; // 旋转角速度\n\nvar aThrustShip = 0; // 推进加速度\n\nvar vThrustShip = 0; // 推进速度\n\nif (canvas) {\n  canvas.width = window.innerWidth;\n  canvas.height = window.innerHeight;\n  var top = 0;\n  var right = canvas.width;\n  var bottom = canvas.height;\n  var left = 0;\n  var ship = new _common_Ship__WEBPACK_IMPORTED_MODULE_1__.default();\n  ship.x = x0;\n  ship.y = y0;\n  document.addEventListener('keydown', function (e) {\n    console.log(e.key);\n\n    switch (e.key) {\n      case 'ArrowLeft':\n        aRotationShip = -aRotation;\n        break;\n\n      case 'ArrowRight':\n        aRotationShip = aRotation;\n        break;\n\n      case 'ArrowUp':\n        aThrustShip = aThrust;\n        ship.showFlame = true;\n        break;\n\n      case 'ArrowDown':\n        aThrustShip = -aThrust;\n        break;\n\n      default:\n        break;\n    }\n  });\n  document.addEventListener('keyup', function () {\n    aRotationShip = 0;\n    aThrustShip = 0;\n    ship.showFlame = false;\n  });\n  var context = canvas.getContext('2d');\n\n  if (context) {\n    var then = 0;\n\n    var drawFrame = function drawFrame(time) {\n      _common_stats__WEBPACK_IMPORTED_MODULE_0__.default.begin();\n      var timeInSeconds = time / 1000; // 将毫秒转为秒单位\n\n      var deltaTime = timeInSeconds - then;\n      then = timeInSeconds;\n      context.clearRect(0, 0, canvas.width, canvas.height);\n      vRotationShip += aRotationShip * deltaTime;\n      ship.rotation += vRotationShip * deltaTime * Math.PI / 180;\n      vThrustShip += aThrustShip * deltaTime;\n\n      if (vThrustShip <= 0) {\n        vThrustShip = 0;\n      }\n\n      var angle = ship.rotation;\n      ship.x += vThrustShip * deltaTime * Math.cos(angle);\n      ship.y += vThrustShip * deltaTime * Math.sin(angle);\n\n      if (ship.x - ship.width / 2 > right) {\n        ship.x = left - ship.width / 2;\n      } else if (ship.x + ship.width / 2 < left) {\n        ship.x = right + ship.width / 2;\n      }\n\n      if (ship.y - ship.height / 2 > bottom) {\n        ship.y = top - ship.height / 2;\n      } else if (ship.y + ship.height / 2 < top) {\n        ship.y = bottom + ship.height / 2;\n      }\n\n      ship.draw(context);\n      _common_stats__WEBPACK_IMPORTED_MODULE_0__.default.end();\n      window.requestAnimationFrame(drawFrame);\n    };\n\n    drawFrame(0);\n  }\n}\n\n//# sourceURL=webpack://canvas-practice/./src/30-space-ship-boundary/index.ts?");

/***/ }),

/***/ "./src/common/Ship.ts":
/*!****************************!*\
  !*** ./src/common/Ship.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/* eslint-disable no-param-reassign */\nvar Ship = /*#__PURE__*/function () {\n  function Ship() {\n    _classCallCheck(this, Ship);\n\n    _defineProperty(this, \"x\", 0);\n\n    _defineProperty(this, \"y\", 0);\n\n    _defineProperty(this, \"width\", 25);\n\n    _defineProperty(this, \"height\", 20);\n\n    _defineProperty(this, \"rotation\", 0);\n\n    _defineProperty(this, \"showFlame\", false);\n  }\n\n  _createClass(Ship, [{\n    key: \"draw\",\n    value:\n    /**\n     * draw\n     */\n    function draw(c) {\n      c.save();\n      c.translate(this.x, this.y);\n      c.rotate(this.rotation);\n      c.lineWidth = 1;\n      c.strokeStyle = '#ffffff';\n      c.beginPath();\n      c.moveTo(10, 0);\n      c.lineTo(-10, 10);\n      c.lineTo(-5, 0);\n      c.lineTo(-10, -10);\n      c.lineTo(10, 0);\n      c.stroke();\n\n      if (this.showFlame) {\n        c.beginPath();\n        c.moveTo(-7.5, -5);\n        c.lineTo(-15, 0);\n        c.lineTo(-7.5, 5);\n        c.stroke();\n      }\n\n      c.restore();\n    }\n  }]);\n\n  return Ship;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n//# sourceURL=webpack://canvas-practice/./src/common/Ship.ts?");

/***/ }),

/***/ "./src/common/stats.ts":
/*!*****************************!*\
  !*** ./src/common/stats.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var stats_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! stats.js */ \"./node_modules/_stats.js@0.17.0@stats.js/build/stats.min.js\");\n/* harmony import */ var stats_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(stats_js__WEBPACK_IMPORTED_MODULE_0__);\n\nvar stats = new (stats_js__WEBPACK_IMPORTED_MODULE_0___default())();\nstats.dom.style.left = 'auto';\nstats.dom.style.top = '10px';\nstats.dom.style.right = '10px';\ndocument.body.appendChild(stats.dom);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stats);\n\n//# sourceURL=webpack://canvas-practice/./src/common/stats.ts?");

/***/ }),

/***/ "./node_modules/_stats.js@0.17.0@stats.js/build/stats.min.js":
/*!*******************************************************************!*\
  !*** ./node_modules/_stats.js@0.17.0@stats.js/build/stats.min.js ***!
  \*******************************************************************/
/***/ (function(module) {

eval("// stats.js - http://github.com/mrdoob/stats.js\n(function(f,e){ true?module.exports=e():0})(this,function(){var f=function(){function e(a){c.appendChild(a.dom);return a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?\"block\":\"none\";l=a}var l=0,c=document.createElement(\"div\");c.style.cssText=\"position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000\";c.addEventListener(\"click\",function(a){a.preventDefault();\nu(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel(\"FPS\",\"#0ff\",\"#002\")),h=e(new f.Panel(\"MS\",\"#0f0\",\"#020\"));if(self.performance&&self.performance.memory)var t=e(new f.Panel(\"MB\",\"#f08\",\"#201\"));u(0);return{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();h.update(c-k,200);if(c>g+1E3&&(r.update(1E3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/\n1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}};f.Panel=function(e,f,l){var c=Infinity,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement(\"canvas\");q.width=r;q.height=h;q.style.cssText=\"width:80px;height:48px\";var b=q.getContext(\"2d\");b.font=\"bold \"+9*a+\"px Helvetica,Arial,sans-serif\";b.textBaseline=\"top\";b.fillStyle=l;b.fillRect(0,0,r,h);b.fillStyle=f;b.fillText(e,t,v);\nb.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(h,w){c=Math.min(c,h);k=Math.max(k,h);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=f;b.fillText(g(h)+\" \"+e+\" (\"+g(c)+\"-\"+g(k)+\")\",t,v);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}};return f});\n\n\n//# sourceURL=webpack://canvas-practice/./node_modules/_stats.js@0.17.0@stats.js/build/stats.min.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/30-space-ship-boundary/index.ts");
/******/ 	
/******/ })()
;