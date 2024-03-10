type Parse = (value: string) => Object;
type Stringify = (value: Object) => string;

class Extension {
    public ext: string;
    public parse: Parse;
    public stringify: Stringify;

    constructor(ext: string, parse: Parse, stringify: Stringify) {
        this.ext = ext;
        this.parse = parse;
        this.stringify = stringify;
    }
}

export { Parse, Stringify, Extension };