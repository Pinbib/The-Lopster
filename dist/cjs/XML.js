"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const xml_js_1 = __importDefault(require("xml-js"));
const Extension_js_1 = require("./Extension.js");
exports.default = new Extension_js_1.Extension(".xml", (value) => JSON.parse(xml_js_1.default.xml2json(value, {
    compact: true,
    spaces: 4
})), (value) => xml_js_1.default.json2xml(JSON.stringify(value), { compact: true, spaces: 4 }));
