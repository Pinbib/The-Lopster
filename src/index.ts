import DB from "./DB.js";
import * as Extension from "./Extension.js";

import JSON from "./JSON.js";
import YAML from "./_YAML.js";
import TOML from "./TOML.js";

export default { DB, ...Extension, JSON, YAML, TOML };