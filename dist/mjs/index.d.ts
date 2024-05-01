import DB from "./DB.js";
import * as Extension from "./Extension.js";
import Sherbet from "./Sherbet.js";
declare const _default: {
    Sherbet: typeof Sherbet;
    JSON: Extension.Extension;
    YAML: Extension.Extension;
    TOML: Extension.Extension;
    XML: Extension.Extension;
    INI: Extension.Extension;
    Extension: typeof Extension.Extension;
    DB: typeof DB;
};
export default _default;
