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

/***/ "./src/16-image-pixel/index.ts":
/*!*************************************!*\
  !*** ./src/16-image-pixel/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nvar canvas = document.querySelector('#mainCanvas');\n\nif (canvas) {\n  var ctx = canvas.getContext('2d');\n\n  if (ctx) {\n    var img = new Image();\n    img.src = '../assets/1.png';\n    img.addEventListener('load', function () {\n      ctx.drawImage(img, 0, 0, 658, 329, 0, 0, canvas.width, canvas.height);\n      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);\n      var pixels = imageData.data;\n\n      for (var i = 0; i < pixels.length; i += 4) {\n        pixels[i + 1] = 0;\n      }\n\n      ctx.putImageData(imageData, 0, 0);\n    });\n  }\n}\n\n\n\n//# sourceURL=webpack://canvas-practice/./src/16-image-pixel/index.ts?");

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
/******/ 	__webpack_modules__["./src/16-image-pixel/index.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;