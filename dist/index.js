/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 569:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 249:
/***/ ((module) => {

module.exports = eval("require")("request");


/***/ }),

/***/ 918:
/***/ ((module) => {

module.exports = eval("require")("xml-js");


/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(569);
const parser = __nccwpck_require__(918);
const fs = __nccwpck_require__(147);
const request = __nccwpck_require__(249);
async function run() {
    try {
        const zip = core.getInput('zip');

        const profile = core.getInput('profile');
        const jsonData = JSON.parse(parser.xml2json(profile, { compact: true, spaces: 2 }));
        const zipProfile = jsonData.publishData.publishProfile.find(p => p._attributes.publishMethod == 'ZipDeploy');

        const attrs = zipProfile._attributes;
        const userName = attrs.userName;
        const password = attrs.userPWD;
        const url = `https://${attrs.publishUrl}/api/zipdeploy`;
        const authHeader = `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`;
        fs.createReadStream(zip).pipe(request.put(url, {
            headers: {
                Authorization: authHeader
            }
        }));
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
})();

module.exports = __webpack_exports__;
/******/ })()
;