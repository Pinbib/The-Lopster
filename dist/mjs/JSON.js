import { Extension } from "./Extension.js";
export default new Extension(".json", JSON.parse, (value) => JSON.stringify(value, null, 2));
