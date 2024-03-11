"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const yaml_1 = __importDefault(require("yaml"));
const Extension_js_1 = require("./Extension.js");
exports.default = new Extension_js_1.Extension(".yaml", yaml_1.default.parse, (value) => yaml_1.default.stringify(value, null, 2));
