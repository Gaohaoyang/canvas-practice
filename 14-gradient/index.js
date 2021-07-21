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

/***/ "./src/14-gradient/index.ts":
/*!**********************************!*\
  !*** ./src/14-gradient/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nvar canvas = document.querySelector('#mainCanvas');\n\nif (canvas) {\n  var ctx = canvas.getContext('2d');\n\n  if (ctx) {\n    ctx.beginPath();\n    var gradient = ctx.createLinearGradient(100, 100, 200, 200);\n    gradient.addColorStop(0, '#ff0000');\n    gradient.addColorStop(1, '#000000');\n    ctx.fillStyle = gradient;\n    ctx.fillRect(100, 100, 100, 100);\n    var gradient2 = ctx.createLinearGradient(200, 200, 300, 300);\n    gradient2.addColorStop(0, '#ff0000');\n    gradient2.addColorStop(0.6, '#008880');\n    gradient2.addColorStop(1, '#000000');\n    ctx.fillStyle = gradient2;\n    ctx.fillRect(200, 200, 100, 100);\n    var gradient3 = ctx.createRadialGradient(500, 200, 0, 500, 200, 100);\n    gradient3.addColorStop(0, '#000000');\n    gradient3.addColorStop(1, '#ff0000');\n    ctx.arc(500, 200, 100, 0, 2 * Math.PI);\n    ctx.fillStyle = gradient3;\n    ctx.fill();\n  }\n}\n\n\n\n//# sourceURL=webpack://canvas-practice/./src/14-gradient/index.ts?");

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
/******/ 	__webpack_modules__["./src/14-gradient/index.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;