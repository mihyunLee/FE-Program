"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ HomePage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar _s = $RefreshSig$();\nfunction Header(param) {\n    var title = param.title;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n        children: title ? title : \"Default title\"\n    }, void 0, false, {\n        fileName: \"D:\\\\study\\\\FE-Program\\\\Next\\\\start-next\\\\pages\\\\index.js\",\n        lineNumber: 4,\n        columnNumber: 10\n    }, this);\n}\n_c = Header;\nfunction HomePage() {\n    var _this = this;\n    var handleClick = function handleClick() {\n        setLikes(likes + 1);\n    };\n    _s();\n    var names = [\n        \"Ada Lovelace\",\n        \"Grace Hopper\",\n        \"Margaret Hamilton\"\n    ];\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0), likes = ref[0], setLikes = ref[1];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Header, {\n                title: \"Develop. Preview. Ship. \\uD83D\\uDE80\"\n            }, void 0, false, {\n                fileName: \"D:\\\\study\\\\FE-Program\\\\Next\\\\start-next\\\\pages\\\\index.js\",\n                lineNumber: 18,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                children: names.map(function(name) {\n                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                        children: name\n                    }, name, false, {\n                        fileName: \"D:\\\\study\\\\FE-Program\\\\Next\\\\start-next\\\\pages\\\\index.js\",\n                        lineNumber: 21,\n                        columnNumber: 11\n                    }, _this);\n                })\n            }, void 0, false, {\n                fileName: \"D:\\\\study\\\\FE-Program\\\\Next\\\\start-next\\\\pages\\\\index.js\",\n                lineNumber: 19,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: handleClick,\n                children: [\n                    \"Like (\",\n                    likes,\n                    \")\"\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\study\\\\FE-Program\\\\Next\\\\start-next\\\\pages\\\\index.js\",\n                lineNumber: 25,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\study\\\\FE-Program\\\\Next\\\\start-next\\\\pages\\\\index.js\",\n        lineNumber: 17,\n        columnNumber: 5\n    }, this);\n};\n_s(HomePage, \"rGEI62VsuwnwPY/75ViYiWAYY24=\");\n_c1 = HomePage;\nvar _c, _c1;\n$RefreshReg$(_c, \"Header\");\n$RefreshReg$(_c1, \"HomePage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQWlDOztBQUVqQyxTQUFTQyxNQUFNLENBQUMsS0FBUyxFQUFFO1FBQVgsS0FBTyxHQUFQLEtBQVMsQ0FBUEMsS0FBSztJQUNyQixxQkFBTyw4REFBQ0MsSUFBRTtrQkFBRUQsS0FBSyxHQUFHQSxLQUFLLEdBQUcsZUFBZTs7Ozs7WUFBTSxDQUFDO0NBQ25EO0FBRlFELEtBQUFBLE1BQU07QUFJQSxTQUFTRyxRQUFRLEdBQUc7O1FBS3hCQyxXQUFXLEdBQXBCLFNBQVNBLFdBQVcsR0FBRztRQUNyQkMsUUFBUSxDQUFDQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDckI7O0lBTkQsSUFBTUMsS0FBSyxHQUFHO1FBQUMsY0FBYztRQUFFLGNBQWM7UUFBRSxtQkFBbUI7S0FBQztJQUVuRSxJQUEwQlIsR0FBVyxHQUFYQSwrQ0FBUSxDQUFDLENBQUMsQ0FBQyxFQUE5Qk8sS0FBSyxHQUFjUCxHQUFXLEdBQXpCLEVBQUVNLFFBQVEsR0FBSU4sR0FBVyxHQUFmO0lBTXRCLHFCQUNFLDhEQUFDUyxLQUFHOzswQkFDRiw4REFBQ1IsTUFBTTtnQkFBQ0MsS0FBSyxFQUFDLHNDQUEyQjs7Ozs7b0JBQUc7MEJBQzVDLDhEQUFDUSxJQUFFOzBCQUNBRixLQUFLLENBQUNHLEdBQUcsQ0FBQyxTQUFDQyxJQUFJO3lDQUNkLDhEQUFDQyxJQUFFO2tDQUFhRCxJQUFJO3VCQUFYQSxJQUFJOzs7OzZCQUFhO2lCQUMzQixDQUFDOzs7OztvQkFDQzswQkFFTCw4REFBQ0UsUUFBTTtnQkFBQ0MsT0FBTyxFQUFFVixXQUFXOztvQkFBRSxRQUFNO29CQUFDRSxLQUFLO29CQUFDLEdBQUM7Ozs7OztvQkFBUzs7Ozs7O1lBQ2pELENBQ047Q0FDSDtHQXJCdUJILFFBQVE7QUFBUkEsTUFBQUEsUUFBUSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9pbmRleC5qcz9iZWU3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcblxyXG5mdW5jdGlvbiBIZWFkZXIoeyB0aXRsZSB9KSB7XHJcbiAgcmV0dXJuIDxoMT57dGl0bGUgPyB0aXRsZSA6IFwiRGVmYXVsdCB0aXRsZVwifTwvaDE+O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lUGFnZSgpIHtcclxuICBjb25zdCBuYW1lcyA9IFtcIkFkYSBMb3ZlbGFjZVwiLCBcIkdyYWNlIEhvcHBlclwiLCBcIk1hcmdhcmV0IEhhbWlsdG9uXCJdO1xyXG5cclxuICBjb25zdCBbbGlrZXMsIHNldExpa2VzXSA9IHVzZVN0YXRlKDApO1xyXG5cclxuICBmdW5jdGlvbiBoYW5kbGVDbGljaygpIHtcclxuICAgIHNldExpa2VzKGxpa2VzICsgMSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPEhlYWRlciB0aXRsZT1cIkRldmVsb3AuIFByZXZpZXcuIFNoaXAuIPCfmoBcIiAvPlxyXG4gICAgICA8dWw+XHJcbiAgICAgICAge25hbWVzLm1hcCgobmFtZSkgPT4gKFxyXG4gICAgICAgICAgPGxpIGtleT17bmFtZX0+e25hbWV9PC9saT5cclxuICAgICAgICApKX1cclxuICAgICAgPC91bD5cclxuXHJcbiAgICAgIDxidXR0b24gb25DbGljaz17aGFuZGxlQ2xpY2t9Pkxpa2UgKHtsaWtlc30pPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsIkhlYWRlciIsInRpdGxlIiwiaDEiLCJIb21lUGFnZSIsImhhbmRsZUNsaWNrIiwic2V0TGlrZXMiLCJsaWtlcyIsIm5hbWVzIiwiZGl2IiwidWwiLCJtYXAiLCJuYW1lIiwibGkiLCJidXR0b24iLCJvbkNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.js\n"));

/***/ })

});