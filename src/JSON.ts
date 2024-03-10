import { Extension } from "./Extension.js";

export default new Extension(".json", JSON.parse, (value: Object) => JSON.stringify(value, null, 2));