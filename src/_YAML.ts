// @ts-ignore
import yaml from "yaml";
import {Extension} from "./Extension.js";

export default new Extension(".yaml", yaml.parse, (value: Object): string => yaml.stringify(value, null, 2));