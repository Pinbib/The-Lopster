"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const Extension_js_1 = require("./Extension.js");
let extensions = {};
extensions[".json"] = new Extension_js_1.Extension(".json", JSON.parse, (value) => JSON.stringify(value, null, 2));
class Sherbet {
    path = "";
    value = {};
    watcher;
    ext = extensions[".json"];
    constructor(src, value = {}) {
        src = node_path_1.default.resolve(src);
        if (node_fs_1.default.existsSync(src) && node_fs_1.default.statSync(src).isFile()) {
            let ext = node_path_1.default.extname(src);
            if (extensions[ext] !== undefined) {
                this.ext = extensions[ext];
                let file = node_fs_1.default.readFileSync(src, "utf-8");
                this.value = { ...this.parse(file.toString()), ...value };
            }
            else
                throw new Error(`Unknown file type "${ext}"`);
        }
        else {
            this.value = value;
        }
        this.src = src;
        process.on("SIGINT", () => {
            this.save();
            process.exit();
        });
    }
    get src() {
        return this.path;
    }
    set src(value) {
        this.path = node_path_1.default.resolve(value);
    }
    get data() {
        return this.value;
    }
    set data(value) {
        this.value = value;
    }
    static use(ext) {
        extensions[ext.ext] = ext;
    }
    parse(value) {
        return this.ext.parse(value);
    }
    stringify(value) {
        return this.ext.stringify(value);
    }
    save() {
        node_fs_1.default.writeFileSync(this.src, this.stringify(this.data));
    }
    set(callback) {
        let data = this.data;
        callback.call(data, data);
        this.data = data;
    }
    watch() {
        if (this.watcher === undefined) {
            this.watcher = node_fs_1.default.watch(this.src, (event, filename) => {
                if (event === "change") {
                    node_fs_1.default.readFile(this.src, "utf-8", (err, data) => {
                        if (!err) {
                            try {
                                this.value = this.ext.parse(data.toString());
                            }
                            catch (err) {
                            }
                        }
                        else {
                            this.watch();
                        }
                    });
                }
                else {
                    this.watch();
                }
            });
            process.on("SIGINT", () => {
                this.save();
                process.exit();
            });
        }
        else {
            this.watcher.close();
        }
    }
}
exports.default = Sherbet;
