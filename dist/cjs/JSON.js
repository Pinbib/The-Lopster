"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Extension_js_1 = require("./Extension.js");
exports.default = new Extension_js_1.Extension(".json", JSON.parse, (value) => JSON.stringify(value, null, 2));
