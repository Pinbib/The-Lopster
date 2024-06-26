import fs from "node:fs";
import path from "node:path";
import { Extension } from "./Extension.js";
let extensions = {};
extensions[".json"] = new Extension(".json", JSON.parse, (value) => JSON.stringify(value, null, 2));
class Sherbet {
    path = "";
    value = {};
    watcher;
    ext = extensions[".json"];
    constructor(src, value = {}) {
        src = path.resolve(src);
        if (fs.existsSync(src) && fs.statSync(src).isFile()) {
            let ext = path.extname(src);
            if (extensions[ext] !== undefined) {
                this.ext = extensions[ext];
                let file = fs.readFileSync(src, "utf-8");
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
        this.path = path.resolve(value);
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
        fs.writeFileSync(this.src, this.stringify(this.data));
    }
    set(callback) {
        let data = this.data;
        callback.call(data, data);
        this.data = data;
    }
    watch() {
        if (this.watcher === undefined) {
            this.watcher = fs.watch(this.src, (event, filename) => {
                if (event === "change") {
                    fs.readFile(this.src, "utf-8", (err, data) => {
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
export default Sherbet;
