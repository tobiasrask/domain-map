# domain-map
Provides domain prefixed ES6 Maps. Can be used as registry for other components.

### Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save domain-map

### How to use?

Normal usage with ES2015 modules:

```js
import DomainMap from 'domain-map'
let registry = new DomainMap();

// Usage with domain prefix
registry.set('myDomain', 'someKey', 'value1');
registry.set('myDomain', 'otherKey', 'value2');

registry.get('myDomain', 'someKey');
// Returns 'value1'

registry.get('myDomain', 'randomKey', false);
// Returns 'false'

registry.getDomainKeysList('myDomain');
// Returns ["someKey", "otherKey"]

let items = registry.getDomain('myDomain');
items.forEach((key, value) => {
  // Iterate
});

// Clear whole domain
registry.clearDomain('myDomain');

// Since key values are maps, you can actually save anything:
registry.set('properties', 'objectAsValue', {abc: false});
registry.set('properties', 'exampleFunction', (value) => { return value + 1; });

```

In some cases you wan't to store data for key which is actually an object.
Normal ES6 Map object will return value for object only if key is exactly the same you used when storing data:

```js
// Normal maps
let map = new Map();

let myObjectKey = {entityId: 1};
let mySecondKey = {entityId: 1};

map.set(myObjectKey, {name: "Alice"});
map.get(myObjectKey);
// Will return {name: "Alice"}

map.get(mySecondKey);
// Will return null, since objects are not same

```

Domain map allows you to use "weak object key comparison":

```js
import DomainMap from 'domain-map'

let registry = new DomainMap({strictKeyMode: false});

let myObjectKey = {entityId: 1};
let mySecondKey = {entityId: 1};

registry.set('myDomain', myObjectKey, {name: 'Alice'});
registry.get('myDomain', mySecondKey, false);
// Will return {name: 'Alice'}

```


[npm]: https://www.npmjs.org/package/domain-map


