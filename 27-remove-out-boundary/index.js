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

/***/ "./src/27-remove-out-boundary/index.ts":
/*!*********************************************!*\
  !*** ./src/27-remove-out-boundary/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common_stats__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/stats */ \"./src/common/stats.ts\");\n/* harmony import */ var _common_Ball__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/Ball */ \"./src/common/Ball.ts\");\n/* eslint-disable no-param-reassign */\n\n\nvar canvas = document.querySelector('#mainCanvas');\nvar ballNum = 100;\nvar maxSpeedX = 80;\nvar maxSpeedY = 80;\nvar colors = ['#81D4FA', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1'];\nvar balls = [];\nvar remainBallsNum = ballNum;\n\nif (canvas) {\n  canvas.width = window.innerWidth;\n  canvas.height = window.innerHeight;\n  var context = canvas.getContext('2d');\n\n  if (context) {\n    for (var i = 0; i < ballNum; i += 1) {\n      var ball = new _common_Ball__WEBPACK_IMPORTED_MODULE_1__.default(20, colors[i % colors.length]);\n      ball.x = Math.random() * canvas.width;\n      ball.y = Math.random() * canvas.height;\n      ball.vx = (Math.random() * 2 - 1) * maxSpeedX;\n      ball.vy = (Math.random() * 2 - 1) * maxSpeedY;\n      balls.push(ball);\n    }\n\n    var then = 0;\n\n    var drawFrame = function drawFrame(time) {\n      _common_stats__WEBPACK_IMPORTED_MODULE_0__.default.begin();\n      var timeInSeconds = time / 1000; // 将毫秒转为秒单位\n\n      var deltaTime = timeInSeconds - then;\n      then = timeInSeconds;\n      context.clearRect(0, 0, canvas.width, canvas.height);\n\n      for (var _i = balls.length - 1; _i > -1; _i -= 1) {\n        balls[_i].x += balls[_i].vx * deltaTime;\n        balls[_i].y += balls[_i].vy * deltaTime;\n\n        balls[_i].draw(context);\n\n        if (balls[_i].x - balls[_i].radius > canvas.width || balls[_i].x + balls[_i].radius < 0 || balls[_i].y - balls[_i].radius > canvas.height || balls[_i].y + balls[_i].radius < 0) {\n          balls.splice(_i, 1);\n        }\n      }\n\n      if (remainBallsNum !== balls.length) {\n        remainBallsNum = balls.length;\n        console.log(\"remain balls: \".concat(remainBallsNum));\n      }\n\n      _common_stats__WEBPACK_IMPORTED_MODULE_0__.default.end();\n      window.requestAnimationFrame(drawFrame);\n    };\n\n    drawFrame(0);\n  }\n}\n\n//# sourceURL=webpack://canvas-practice/./src/27-remove-out-boundary/index.ts?");

/***/ }),

/***/ "./src/common/Ball.ts":
/*!****************************!*\
  !*** ./src/common/Ball.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Ball = /*#__PURE__*/function () {\n  function Ball() {\n    var radius = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 40;\n    var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#795548';\n\n    _classCallCheck(this, Ball);\n\n    this.radius = radius;\n    this.color = color;\n    this.x = 0;\n    this.y = 0;\n    this.vx = 0;\n    this.vy = 0;\n    this.lineWidth = 1;\n  }\n  /**\n   * draw\n   */\n\n\n  _createClass(Ball, [{\n    key: \"draw\",\n    value: function draw(context) {\n      context.save();\n      context.translate(this.x, this.y);\n      context.lineWidth = this.lineWidth;\n      context.fillStyle = this.color;\n      context.beginPath();\n      context.arc(0, 0, this.radius, 0, Math.PI * 2, true);\n      context.closePath();\n      context.fill();\n\n      if (this.lineWidth > 0) {\n        context.stroke();\n      }\n\n      context.restore();\n    }\n  }]);\n\n  return Ball;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ball);\n\n//# sourceURL=webpack://canvas-practice/./src/common/Ball.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/27-remove-out-boundary/index.ts");
/******/ 	
/******/ })()
;