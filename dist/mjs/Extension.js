class Extension {
    ext;
    parse;
    stringify;
    constructor(ext, parse, stringify) {
        this.ext = ext;
        this.parse = parse;
        this.stringify = stringify;
    }
}
export { Extension };
