// @ts-ignore
import xml from "xml-js";
import {Extension} from "./Extension.js";

export default new Extension(
    ".xml",
    (value: string): Object => JSON.parse(xml.xml2json(
        value,
        {
            compact: true,
            spaces: 4
        }
    )),
    (value: Object): string => xml.json2xml(JSON.stringify(value), {compact: true, spaces: 4})
);