"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const toml_1 = __importDefault(require("@iarna/toml"));
const Extension_js_1 = require("./Extension.js");
// @ts-ignore
exports.default = new Extension_js_1.Extension(".toml", toml_1.default.parse, toml_1.default.stringify);
