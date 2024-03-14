// @ts-ignore
import ini from "ini";
import {Extension} from "./Extension.js";

export default new Extension(".ini", ini.parse, (value: Object) => ini.stringify(value));