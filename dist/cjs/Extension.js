"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extension = void 0;
class Extension {
    ext;
    parse;
    stringify;
    constructor(ext, parse, stringify) {
        this.ext = ext;
        this.parse = parse;
        this.stringify = stringify;
    }
}
exports.Extension = Extension;
