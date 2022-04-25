"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msBuild = void 0;
const ShUtils_1 = require("./ShUtils");
function msBuild() {
    (0, ShUtils_1.execInShell)("msbuild");
}
exports.msBuild = msBuild;
