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

/***/ "./src/15-image/index.ts":
/*!*******************************!*\
  !*** ./src/15-image/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nvar canvas = document.querySelector('#mainCanvas');\n\nif (canvas) {\n  var ctx = canvas.getContext('2d');\n\n  if (ctx) {\n    var img = new Image();\n    img.src = 'https://gw.alicdn.com/imgextra/i2/O1CN01gR6ymq1dfV5RmYxYk_!!6000000003763-2-tps-658-411.png';\n    img.addEventListener('load', function () {\n      ctx.drawImage(img, 0, 0, 658, 329, 0, 0, 800, 400);\n    });\n  }\n}\n\n\n\n//# sourceURL=webpack://canvas-practice/./src/15-image/index.ts?");

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
/******/ 	__webpack_modules__["./src/15-image/index.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;