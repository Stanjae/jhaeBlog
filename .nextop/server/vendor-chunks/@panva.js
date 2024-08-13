"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@panva";
exports.ids = ["vendor-chunks/@panva"];
exports.modules = {

/***/ "(rsc)/./node_modules/@panva/hkdf/dist/node/esm/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/@panva/hkdf/dist/node/esm/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ hkdf),\n/* harmony export */   hkdf: () => (/* binding */ hkdf)\n/* harmony export */ });\n/* harmony import */ var _runtime_hkdf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./runtime/hkdf.js */ \"(rsc)/./node_modules/@panva/hkdf/dist/node/esm/runtime/hkdf.js\");\n\nfunction normalizeDigest(digest) {\n    switch (digest) {\n        case 'sha256':\n        case 'sha384':\n        case 'sha512':\n        case 'sha1':\n            return digest;\n        default:\n            throw new TypeError('unsupported \"digest\" value');\n    }\n}\nfunction normalizeUint8Array(input, label) {\n    if (typeof input === 'string')\n        return new TextEncoder().encode(input);\n    if (!(input instanceof Uint8Array))\n        throw new TypeError(`\"${label}\"\" must be an instance of Uint8Array or a string`);\n    return input;\n}\nfunction normalizeIkm(input) {\n    const ikm = normalizeUint8Array(input, 'ikm');\n    if (!ikm.byteLength)\n        throw new TypeError(`\"ikm\" must be at least one byte in length`);\n    return ikm;\n}\nfunction normalizeInfo(input) {\n    const info = normalizeUint8Array(input, 'info');\n    if (info.byteLength > 1024) {\n        throw TypeError('\"info\" must not contain more than 1024 bytes');\n    }\n    return info;\n}\nfunction normalizeKeylen(input, digest) {\n    if (typeof input !== 'number' || !Number.isInteger(input) || input < 1) {\n        throw new TypeError('\"keylen\" must be a positive integer');\n    }\n    const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;\n    if (input > 255 * hashlen) {\n        throw new TypeError('\"keylen\" too large');\n    }\n    return input;\n}\nasync function hkdf(digest, ikm, salt, info, keylen) {\n    return (0,_runtime_hkdf_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(normalizeDigest(digest), normalizeIkm(ikm), normalizeUint8Array(salt, 'salt'), normalizeInfo(info), normalizeKeylen(keylen, digest));\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvQHBhbnZhL2hrZGYvZGlzdC9ub2RlL2VzbS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLE1BQU07QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsNERBQU07QUFDakI7QUFDaUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qaGFlYmxvZy8uL25vZGVfbW9kdWxlcy9AcGFudmEvaGtkZi9kaXN0L25vZGUvZXNtL2luZGV4LmpzP2I4NzciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRlcml2ZSBmcm9tICcuL3J1bnRpbWUvaGtkZi5qcyc7XG5mdW5jdGlvbiBub3JtYWxpemVEaWdlc3QoZGlnZXN0KSB7XG4gICAgc3dpdGNoIChkaWdlc3QpIHtcbiAgICAgICAgY2FzZSAnc2hhMjU2JzpcbiAgICAgICAgY2FzZSAnc2hhMzg0JzpcbiAgICAgICAgY2FzZSAnc2hhNTEyJzpcbiAgICAgICAgY2FzZSAnc2hhMSc6XG4gICAgICAgICAgICByZXR1cm4gZGlnZXN0O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndW5zdXBwb3J0ZWQgXCJkaWdlc3RcIiB2YWx1ZScpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG5vcm1hbGl6ZVVpbnQ4QXJyYXkoaW5wdXQsIGxhYmVsKSB7XG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpXG4gICAgICAgIHJldHVybiBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoaW5wdXQpO1xuICAgIGlmICghKGlucHV0IGluc3RhbmNlb2YgVWludDhBcnJheSkpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFwiJHtsYWJlbH1cIlwiIG11c3QgYmUgYW4gaW5zdGFuY2Ugb2YgVWludDhBcnJheSBvciBhIHN0cmluZ2ApO1xuICAgIHJldHVybiBpbnB1dDtcbn1cbmZ1bmN0aW9uIG5vcm1hbGl6ZUlrbShpbnB1dCkge1xuICAgIGNvbnN0IGlrbSA9IG5vcm1hbGl6ZVVpbnQ4QXJyYXkoaW5wdXQsICdpa20nKTtcbiAgICBpZiAoIWlrbS5ieXRlTGVuZ3RoKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBcImlrbVwiIG11c3QgYmUgYXQgbGVhc3Qgb25lIGJ5dGUgaW4gbGVuZ3RoYCk7XG4gICAgcmV0dXJuIGlrbTtcbn1cbmZ1bmN0aW9uIG5vcm1hbGl6ZUluZm8oaW5wdXQpIHtcbiAgICBjb25zdCBpbmZvID0gbm9ybWFsaXplVWludDhBcnJheShpbnB1dCwgJ2luZm8nKTtcbiAgICBpZiAoaW5mby5ieXRlTGVuZ3RoID4gMTAyNCkge1xuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ1wiaW5mb1wiIG11c3Qgbm90IGNvbnRhaW4gbW9yZSB0aGFuIDEwMjQgYnl0ZXMnKTtcbiAgICB9XG4gICAgcmV0dXJuIGluZm87XG59XG5mdW5jdGlvbiBub3JtYWxpemVLZXlsZW4oaW5wdXQsIGRpZ2VzdCkge1xuICAgIGlmICh0eXBlb2YgaW5wdXQgIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKGlucHV0KSB8fCBpbnB1dCA8IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJrZXlsZW5cIiBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlcicpO1xuICAgIH1cbiAgICBjb25zdCBoYXNobGVuID0gcGFyc2VJbnQoZGlnZXN0LnN1YnN0cigzKSwgMTApID4+IDMgfHwgMjA7XG4gICAgaWYgKGlucHV0ID4gMjU1ICogaGFzaGxlbikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImtleWxlblwiIHRvbyBsYXJnZScpO1xuICAgIH1cbiAgICByZXR1cm4gaW5wdXQ7XG59XG5hc3luYyBmdW5jdGlvbiBoa2RmKGRpZ2VzdCwgaWttLCBzYWx0LCBpbmZvLCBrZXlsZW4pIHtcbiAgICByZXR1cm4gZGVyaXZlKG5vcm1hbGl6ZURpZ2VzdChkaWdlc3QpLCBub3JtYWxpemVJa20oaWttKSwgbm9ybWFsaXplVWludDhBcnJheShzYWx0LCAnc2FsdCcpLCBub3JtYWxpemVJbmZvKGluZm8pLCBub3JtYWxpemVLZXlsZW4oa2V5bGVuLCBkaWdlc3QpKTtcbn1cbmV4cG9ydCB7IGhrZGYsIGhrZGYgYXMgZGVmYXVsdCB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/@panva/hkdf/dist/node/esm/index.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/@panva/hkdf/dist/node/esm/runtime/fallback.js":
/*!********************************************************************!*\
  !*** ./node_modules/@panva/hkdf/dist/node/esm/runtime/fallback.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ \"crypto\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((digest, ikm, salt, info, keylen) => {\n    const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;\n    const prk = (0,crypto__WEBPACK_IMPORTED_MODULE_0__.createHmac)(digest, salt.byteLength ? salt : new Uint8Array(hashlen))\n        .update(ikm)\n        .digest();\n    const N = Math.ceil(keylen / hashlen);\n    const T = new Uint8Array(hashlen * N + info.byteLength + 1);\n    let prev = 0;\n    let start = 0;\n    for (let c = 1; c <= N; c++) {\n        T.set(info, start);\n        T[start + info.byteLength] = c;\n        T.set((0,crypto__WEBPACK_IMPORTED_MODULE_0__.createHmac)(digest, prk)\n            .update(T.subarray(prev, start + info.byteLength + 1))\n            .digest(), start);\n        prev = start;\n        start += hashlen;\n    }\n    return T.slice(0, keylen);\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvQHBhbnZhL2hrZGYvZGlzdC9ub2RlL2VzbS9ydW50aW1lL2ZhbGxiYWNrLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQW9DO0FBQ3BDLGlFQUFlO0FBQ2Y7QUFDQSxnQkFBZ0Isa0RBQVU7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLGNBQWMsa0RBQVU7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vamhhZWJsb2cvLi9ub2RlX21vZHVsZXMvQHBhbnZhL2hrZGYvZGlzdC9ub2RlL2VzbS9ydW50aW1lL2ZhbGxiYWNrLmpzPzc4OGEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlSG1hYyB9IGZyb20gJ2NyeXB0byc7XG5leHBvcnQgZGVmYXVsdCAoZGlnZXN0LCBpa20sIHNhbHQsIGluZm8sIGtleWxlbikgPT4ge1xuICAgIGNvbnN0IGhhc2hsZW4gPSBwYXJzZUludChkaWdlc3Quc3Vic3RyKDMpLCAxMCkgPj4gMyB8fCAyMDtcbiAgICBjb25zdCBwcmsgPSBjcmVhdGVIbWFjKGRpZ2VzdCwgc2FsdC5ieXRlTGVuZ3RoID8gc2FsdCA6IG5ldyBVaW50OEFycmF5KGhhc2hsZW4pKVxuICAgICAgICAudXBkYXRlKGlrbSlcbiAgICAgICAgLmRpZ2VzdCgpO1xuICAgIGNvbnN0IE4gPSBNYXRoLmNlaWwoa2V5bGVuIC8gaGFzaGxlbik7XG4gICAgY29uc3QgVCA9IG5ldyBVaW50OEFycmF5KGhhc2hsZW4gKiBOICsgaW5mby5ieXRlTGVuZ3RoICsgMSk7XG4gICAgbGV0IHByZXYgPSAwO1xuICAgIGxldCBzdGFydCA9IDA7XG4gICAgZm9yIChsZXQgYyA9IDE7IGMgPD0gTjsgYysrKSB7XG4gICAgICAgIFQuc2V0KGluZm8sIHN0YXJ0KTtcbiAgICAgICAgVFtzdGFydCArIGluZm8uYnl0ZUxlbmd0aF0gPSBjO1xuICAgICAgICBULnNldChjcmVhdGVIbWFjKGRpZ2VzdCwgcHJrKVxuICAgICAgICAgICAgLnVwZGF0ZShULnN1YmFycmF5KHByZXYsIHN0YXJ0ICsgaW5mby5ieXRlTGVuZ3RoICsgMSkpXG4gICAgICAgICAgICAuZGlnZXN0KCksIHN0YXJ0KTtcbiAgICAgICAgcHJldiA9IHN0YXJ0O1xuICAgICAgICBzdGFydCArPSBoYXNobGVuO1xuICAgIH1cbiAgICByZXR1cm4gVC5zbGljZSgwLCBrZXlsZW4pO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/@panva/hkdf/dist/node/esm/runtime/fallback.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/@panva/hkdf/dist/node/esm/runtime/hkdf.js":
/*!****************************************************************!*\
  !*** ./node_modules/@panva/hkdf/dist/node/esm/runtime/hkdf.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var _fallback_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fallback.js */ \"(rsc)/./node_modules/@panva/hkdf/dist/node/esm/runtime/fallback.js\");\n\n\nlet hkdf;\nif (typeof crypto__WEBPACK_IMPORTED_MODULE_0__.hkdf === 'function' && !process.versions.electron) {\n    hkdf = async (...args) => new Promise((resolve, reject) => {\n        crypto__WEBPACK_IMPORTED_MODULE_0__.hkdf(...args, (err, arrayBuffer) => {\n            if (err)\n                reject(err);\n            else\n                resolve(new Uint8Array(arrayBuffer));\n        });\n    });\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (digest, ikm, salt, info, keylen) => (hkdf || _fallback_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(digest, ikm, salt, info, keylen));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvQHBhbnZhL2hrZGYvZGlzdC9ub2RlL2VzbS9ydW50aW1lL2hrZGYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWlDO0FBQ0k7QUFDckM7QUFDQSxXQUFXLHdDQUFXO0FBQ3RCO0FBQ0EsUUFBUSx3Q0FBVztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQSxpRUFBZSxvREFBb0Qsb0RBQVEsa0NBQWtDLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qaGFlYmxvZy8uL25vZGVfbW9kdWxlcy9AcGFudmEvaGtkZi9kaXN0L25vZGUvZXNtL3J1bnRpbWUvaGtkZi5qcz9lOGZiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNyeXB0byBmcm9tICdjcnlwdG8nO1xuaW1wb3J0IGZhbGxiYWNrIGZyb20gJy4vZmFsbGJhY2suanMnO1xubGV0IGhrZGY7XG5pZiAodHlwZW9mIGNyeXB0by5oa2RmID09PSAnZnVuY3Rpb24nICYmICFwcm9jZXNzLnZlcnNpb25zLmVsZWN0cm9uKSB7XG4gICAgaGtkZiA9IGFzeW5jICguLi5hcmdzKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNyeXB0by5oa2RmKC4uLmFyZ3MsIChlcnIsIGFycmF5QnVmZmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlc29sdmUobmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgZGVmYXVsdCBhc3luYyAoZGlnZXN0LCBpa20sIHNhbHQsIGluZm8sIGtleWxlbikgPT4gKGhrZGYgfHwgZmFsbGJhY2spKGRpZ2VzdCwgaWttLCBzYWx0LCBpbmZvLCBrZXlsZW4pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/@panva/hkdf/dist/node/esm/runtime/hkdf.js\n");

/***/ })

};
;