"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const ini_1 = __importDefault(require("ini"));
const Extension_js_1 = require("./Extension.js");
exports.default = new Extension_js_1.Extension(".ini", ini_1.default.parse, (value) => ini_1.default.stringify(value));
