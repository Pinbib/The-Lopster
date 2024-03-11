// @ts-ignore
import toml from "@ltd/j-toml";
import { Extension } from "./Extension.js";
// @ts-ignore
export default new Extension(".toml", toml.parse, (value) => toml.stringify(value).join("\n"));
