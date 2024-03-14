// @ts-ignore
import xml from "xml-js";
import { Extension } from "./Extension.js";
export default new Extension(".xml", (value) => JSON.parse(xml.xml2json(value, {
    compact: true,
    spaces: 4
})), (value) => xml.json2xml(JSON.stringify(value), { compact: true, spaces: 4 }));
