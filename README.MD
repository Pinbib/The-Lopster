# The-Lopster

A small library for manipulating json files and using them to save data.

## ES6

```js
import DB from "the-lopster";
```

## CommonJS

```js
const DB = require("the-lopster/cjs").default;
```

## new DB

```js
let db = new DB(src, value);
```

- src - is the path to your JSON file. (A mandatory parameter, but the file does not have to exist, but if it exists, it
  should contain
  `{}` as a minimum)

- value - this is a preset, the value of which will be set in the file, but if the file already contains the data, the
  preference will be given to the data entered in this parameter (optional parameter)

That is, if in the file:

```json
{
  "age": 25
}
```

And in the code:

```js
const db = new DB("path/to/file.js", {age: 20});
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
const db = new DB("path/to/file.json", {age: 20});

db.set(callback);
```

callback - This is a function:

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

Any data changes are automatically written to the file. If the "watch" function is enabled, when changing the file, the
variables from the file will be automatically pulled up.