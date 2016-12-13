# domain-map
[domain-map](https://www.npmjs.org/package/domain-map) provides domain prefixed ES6 Maps, and can be used as map for other components.

### Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save domain-map

### How to use?

Normal usage with ES2015 modules:

```js
import DomainMap from 'domain-map'
let map = new DomainMap();

// Set value for key with domain prefix
map.set('myDomain', 'someKey', 'value1');
map.set('myDomain', 'otherKey', 'value2');

// Get value for domain key
map.get('myDomain', 'someKey');
// Returns 'value1'

// You can provide default value, which will be used if key doesn't exists
map.get('myDomain', 'randomKey', false);
// Returns 'false'

// Get list of keys
map.getDomainKeysList('myDomain');
// Returns ["someKey", "otherKey"]

// Or whole domain
let items = map.getDomain('myDomain');
items.forEach((key, value) => {
  // Iterate
});

// Clear whole domain
map.clearDomain('myDomain');

// Since key values are maps, you can actually save anything:
map.set('properties', 'objectAsValue', { abc: false });
map.set('properties', 'exampleFunction', value => { return value + 1; });

```

In some cases you might want to store data for a key which is actually an object.
Normal ES6 Map object will do this, but it will return value for your key only if the key object is exactly the same you provided when storing data:

```js
// Normal maps
let map = new Map();

let myObjectKey = { entityId: 1 };
let mySecondKey = { entityId: 1 };

map.set(myObjectKey, { name: "Alice" });
map.get(myObjectKey);
// Will return { name: "Alice" }

map.get(mySecondKey);
// Will return null, since the keys "myObjectKey" and "mySecondKey" are not same.

```

Domain map allows you to use "deep object key comparison". Two objects are same if their values equals:

```js
import DomainMap from 'domain-map'

let map = new DomainMap({strictKeyMode: false});

let myObjectKey = { entityId: 1 };
let mySecondKey = { entityId: 1 };

map.set('myDomain', myObjectKey, { name: 'Alice' });
map.get('myDomain', mySecondKey, false);
// Will return { name: 'Alice' }

```

If you need just Map object with *deep object key comparison*, you can have one with static createCollection() method:

```js
let collection = DomainMap.createCollection({strictKeyMode: false});
```

### Test
Run tests using [npm](https://www.npmjs.com/):

    $ npm run test

[npm]: https://www.npmjs.org/package/domain-map


