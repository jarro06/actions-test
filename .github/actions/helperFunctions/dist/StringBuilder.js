"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringBuilder = void 0;
class StringBuilder {
    constructor() {
        this._lines = [];
    }
    write(line = "") {
        this._lines.push(line);
    }
    writeln(line = "") {
        this._lines.push(line);
        this._lines.push("\n");
    }
    toString() {
        return this._lines.join("");
    }
}
exports.StringBuilder = StringBuilder;
