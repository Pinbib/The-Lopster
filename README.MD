# The-Lopster

A small library for manipulating json files and using them to save data.

## ES6

```js
import DB from "the-lopster";
```

## CommonJS

```js
const DB = require("the-lopster").default;
```

## new DB

```js
let db = new DB.DB(src, value);
```

- `src` - is the path to your JSON file. (A mandatory parameter, but the file does not have to exist, but if it exists,
  it
  should contain
  `{}` as a minimum)

- `value` - this is a preset, the value of which will be set in the file, but if the file already contains the data, the
  preference will be given to the data entered in this parameter (optional parameter)

That is, if in the file:

```json
{
  "age": 25
}
```

And in the code:

```js
const db = new DB.DB("path/to/file.js", {age: 20});
```

Then the file will be overwritten:

```json
{
  "age": 20
}
```

## DB.data

This is a field in which the values from the file are stored, through it you can get the values of the file and also
change them, but it is not recommended to change them.

## DB.set

Through this method, you can change the value of the file. <strong style="color: red">Use exactly this method to change
data.</strong>

```js
const db = new DB.DB("path/to/file.json", {age: 20});

db.set(callback);
```

`callback` - This is a function:

```js
db.set(function () {
	this.age = 25;
})
```

Or:

```js
db.set((data) => {
	data.age = 25;
})
```

## DB.watch

This function enables synchronization with the file in the group will automatically change `this.data` if there were any
variables in the file. Calling again will disable sync.

### :)

Any data changes are automatically written to the file. If the `watch` function is enabled, when changing the file, the
variables from the file will be automatically pulled up.

## DB.use

If you need to use other data storage methods, you can use extensions based on the DB.Extension class.
At the moment, there is support for such files as `JSON` (default), `INI`, `YAML`, `TOML`, `XML`.

To use the extension there is a function `.use`

Example:

```js
import DB from "the-lopster";

DB.use(DB.XML);
```

## DB.Extension

This is an extension class that accepts three parameters `ext`, `parse`, `stringify`.

- `ext` - file extension with a dot at the beginning.
- `parse` - a function that takes `string` and returns an `Object`
- `stringify` - a function that takes `Object` and returns an `string`

```ts
import DB from "the-lopster";

function parse(value: string): Object {
}

function stringify(value: Object): string {
}

let EXT = new DB.Extension(".ext", parse, stringify);
```

Using:

```js
DB.use(EXT);
```

## DB.Sherbet

This is a slightly truncated analogue of `DB.DB`, it does not save data by itself, for this you need to call
method `DB.Sherbet.save`.
Also, when closed due to the combination of `CTRL+C`, when method `DB.Sherbet.watch` works, data will be saved.
It reads data when an instance is created and when the program is closed, and all the rest of the time the data is
stored in the RAM, which is why it is called Sherbet.
Everything else works as in `DB.DB`.