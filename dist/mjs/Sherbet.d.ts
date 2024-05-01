import { Extension } from "./Extension.js";
type Change = (value: Object) => void;
declare class Sherbet {
    private path;
    private value;
    private watcher?;
    private ext;
    constructor(src: string, value?: Object);
    get src(): string;
    set src(value: string);
    get data(): Object;
    set data(value: Object);
    static use(ext: Extension): void;
    parse(value: string): Object;
    stringify(value: Object): string;
    save(): void;
    set(callback: Change): void;
    watch(): void;
}
export default Sherbet;
