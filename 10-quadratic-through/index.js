/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/10-quadratic-through/index.ts":
/*!*******************************************!*\
  !*** ./src/10-quadratic-through/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nvar canvas = document.querySelector('#mainCanvas');\n\nif (canvas) {\n  var context = canvas.getContext('2d');\n  var offsetLeft = canvas.offsetLeft,\n      offsetTop = canvas.offsetTop;\n  var x0 = 300;\n  var y0 = 100;\n  var x1 = 600;\n  var y1 = 300;\n\n  if (context) {\n    canvas.addEventListener('mousemove', function (e) {\n      context.clearRect(0, 0, canvas.width, canvas.height);\n      var x = e.pageX - offsetLeft;\n      var y = e.pageY - offsetTop;\n      var cpx = x * 2 - (x0 + x1) / 2;\n      var cpy = y * 2 - (y0 + y1) / 2;\n      context.beginPath();\n      context.moveTo(x0, y0);\n      context.quadraticCurveTo(cpx, cpy, x1, y1);\n      context.stroke();\n    });\n  }\n}\n\n\n\n//# sourceURL=webpack://canvas-practice/./src/10-quadratic-through/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/10-quadratic-through/index.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;