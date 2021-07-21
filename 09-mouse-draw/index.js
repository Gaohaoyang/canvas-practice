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

/***/ "./src/09-mouse-draw/index.ts":
/*!************************************!*\
  !*** ./src/09-mouse-draw/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nvar canvas = document.querySelector('#mainCanvas');\n\nif (canvas) {\n  var context = canvas.getContext('2d');\n\n  if (context) {\n    var offsetLeft = canvas.offsetLeft,\n        offsetTop = canvas.offsetTop;\n    var x;\n    var y;\n\n    var mouseMoveHandler = function mouseMoveHandler(e) {\n      x = e.pageX;\n      y = e.pageY;\n      x -= offsetLeft;\n      y -= offsetTop;\n      context.lineTo(x, y);\n      context.lineCap = 'round';\n      context.lineJoin = 'round';\n      context.stroke();\n    };\n\n    canvas.addEventListener('mousedown', function (e) {\n      context.beginPath();\n      context.moveTo(e.pageX - offsetLeft, e.pageY - offsetTop);\n      canvas.addEventListener('mousemove', mouseMoveHandler);\n    });\n    canvas.addEventListener('mouseup', function () {\n      canvas.removeEventListener('mousemove', mouseMoveHandler);\n    });\n  }\n}\n\n\n\n//# sourceURL=webpack://canvas-practice/./src/09-mouse-draw/index.ts?");

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
/******/ 	__webpack_modules__["./src/09-mouse-draw/index.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;