import { Extension } from "./Extension.js";
type Change = (value: Object) => void;
declare class DB {
    private path;
    private value;
    private watcher?;
    private ext;
    parse(value: string): Object;
    stringify(value: Object): string;
    set src(value: string);
    get src(): string;
    set data(value: Object);
    get data(): Object;
    static use(ext: Extension): void;
    constructor(src: string, value?: Object);
    save(): void;
    set(callback: Change): void;
    watch(): void;
}
export default DB;
