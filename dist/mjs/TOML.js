// @ts-ignore
import toml from "@iarna/toml";
import { Extension } from "./Extension.js";
// @ts-ignore
export default new Extension(".toml", toml.parse, toml.stringify);
