import fs from "node:fs";
import path from "node:path";

import { Extension, Parse, Stringify } from "./Extension.js";

type Change = (value: Object) => void;

let extensions: { [key: string]: Extension } = {

};

extensions[".json"] = new Extension(".json", JSON.parse, (value: Object) => JSON.stringify(value, null, 2));

class DB {
    private path: string = "";
    private value: Object = {};

    private watcher?: fs.FSWatcher;
    private ext: Extension = extensions[".json"];

    public parse(value: string): Object {
        return this.ext.parse(value);
    }

    public stringify(value: Object): string {
        return this.ext.stringify(value);
    }

    public set src(value: string) {
        this.path = path.resolve(value);
    }

    public get src(): string {
        return this.path;
    }

    public set data(value: Object) {
        this.value = value;
        this.save();
    }

    public get data(): Object {
        return this.value;
    }

    static use(ext: Extension) {
        extensions[ext.ext] = ext;
    }

    constructor(src: string, value: Object = {}) {
        src = path.resolve(src);

        if (fs.existsSync(src) && fs.statSync(src).isFile()) {
            let ext: string = path.extname(src);

            if (extensions[ext] !== undefined) {
                this.ext = extensions[ext];

                let file = fs.readFileSync(src, "utf-8");

                this.value = { ...this.parse(file.toString()), ...value };
            } else throw new Error(`Unknown file type "${ext}"`);
        } else {
            this.value = value;
        }

        this.src = src;
    }

    public save(): void {
        fs.writeFileSync(this.src, this.stringify(this.data));
    }

    public set(callback: Change): void {
        let data: Object = this.data;
        callback.call(data, data);
        this.data = data;
    }

    public watch(): void {
        if (this.watcher === undefined) {
            this.watcher = fs.watch(this.src, (event, filename) => {
                if (event === "change") {
                    fs.readFile(this.src, "utf-8", (err, data) => {
                        if (!err) {
                            try {
                                this.value = this.ext.parse(data.toString());
                            } catch (err) { }
                        } else {
                            this.watch();
                        }
                    })
                } else {
                    this.watch();
                }
            })
        } else {
            this.watcher.close();
        }
    }
}

export default DB;