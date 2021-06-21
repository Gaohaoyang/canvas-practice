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

/***/ "./src/01-touch-event/index.ts":
/*!*************************************!*\
  !*** ./src/01-touch-event/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/util */ \"./src/common/util.ts\");\n\nvar canvas = document.querySelector('#mainCanvas');\nconsole.log(canvas);\n\nif (canvas) {\n  var touch = (0,_common_util__WEBPACK_IMPORTED_MODULE_0__.captureTouch)(canvas);\n  console.log(touch);\n\n  if (touch.isTouch) {\n    console.log(touch);\n  }\n}\n\nconsole.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');\n\n//# sourceURL=webpack://canvas-practice/./src/01-touch-event/index.ts?");

/***/ }),

/***/ "./src/common/util.ts":
/*!****************************!*\
  !*** ./src/common/util.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"captureTouch\": () => (/* binding */ captureTouch),\n/* harmony export */   \"captureMouse\": () => (/* binding */ captureMouse)\n/* harmony export */ });\nvar captureTouch = function captureTouch(element) {\n  console.log('captureTouch');\n  var touch = {\n    x: null,\n    y: null,\n    isTouch: false\n  };\n  element.addEventListener('touchstart', function () {\n    touch.isTouch = true;\n  });\n  element.addEventListener('touchend', function () {\n    touch.isTouch = false;\n    touch.x = null;\n    touch.y = null;\n  });\n  element.addEventListener('touchmove', function (e) {\n    console.log('captureTouch touchmove');\n    var _e$touches$ = e.touches[0],\n        pageX = _e$touches$.pageX,\n        pageY = _e$touches$.pageY;\n    touch.x = pageX;\n    touch.y = pageY;\n  });\n  return touch;\n};\n\nvar captureMouse = function captureMouse() {};\n\n\n\n//# sourceURL=webpack://canvas-practice/./src/common/util.ts?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/01-touch-event/index.ts");
/******/ 	
/******/ })()
;