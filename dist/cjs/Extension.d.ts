type Parse = (value: string) => Object;
type Stringify = (value: Object) => string;
declare class Extension {
    ext: string;
    parse: Parse;
    stringify: Stringify;
    constructor(ext: string, parse: Parse, stringify: Stringify);
}
export { Parse, Stringify, Extension };
