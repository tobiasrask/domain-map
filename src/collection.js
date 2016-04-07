/**
* Collection class to store list of keyed items.
* We extend basic ES6 Map with support to handle "weak object keys".
*/
class Collection {

  /**
  * Construct registry
  *
  * @param variables with following keys:
  *   - boolean strictKeyMode, defaults to true
  */
  constructor(variables = {}) {
    this._data = new Map();
    this._strictKeyMode = variables.hasOwnProperty('strictKeyMode') &&
      !variables.strictKeyMode ? false : true;
  }

  /**
  * Set key to collection
  *
  * @param key
  * @param value
  */
  set(key, value) {
    let mapKey = this.buildFormattedKey(key);
    this._data.set(this.buildFormattedKey(mapKey), value);
  }

  /**
  * Get key
  * 
  * @param key
  * @param defaultValue
  *   Defaults to false
  */
  get(key, defaultValue = false) {
    let mapKey = this.buildFormattedKey(key);
    return (this._data.has(mapKey)) ?
      this._data.get(mapKey) : defaultValue;
  }

  /**
  * Check if key exists.
  *
  * @param key
  * @return boolean key exits
  */
  has(key) {
    return this._data.has(this.buildFormattedKey(key));
  }

  /**
  * Delete key from collection.
  *
  * @param key
  */
  delete(key) {
    this._data.delete(this.buildFormattedKey(key));
  }

  /**
  * Iterate over map key values
  *
  * @param callback.
  */
  forEach(callback) {
    // In case of strict mode, let's use normal map behaviour
    if (this._strictKeyMode)
      return this._data.forEach(callback);

    // If this is not strict mode, keys are stringified...
    this._data.forEach((value, stringifiedKey) => {
      callback(value, JSON.parse(stringifiedKey));
    })
  }

  /**
  * Get keys list.
  *
  * @return array of keys
  */
  getKeysList() {
    let keys = [];
    for (var key of this._data.keys()) {
      if (this._strictKeyMode)
        keys.push(key);
      else 
        keys.push(JSON.parse(key));
    }
    return keys;
  }

  /**
  * Alias for @size.
  *
  * @return size
  */
  getSize() {
    return this._data.size;
  }

  /**
  * Collection size.
  *
  * @return size
  */
  size() {
    return this._data.size;
  }

  /**
  * Clear collection data.
  */
  clearMap() {
    this._data.clear();
  }

  /**
  * Get map
  *
  * @return domain map
  */
  getMap() {
    return this._data;
  }

  /**
  * Method returns formatted key used with registry map. Format depends on
  * "key mode" assigned when constructing registry. If key mode is strict,
  * map will allways be keyed directly with objects. This means that only same
  * object will return same item. For example following keys are not same:
  *
  * let key1 = {value: "abc"},
  *     key2 = {value: "abc"}
  *
  * With strict mode disabled we are considering all objects with same content
  * as same key.
  *
  * @param key
  *   Given key
  * @return keyValue
  */
  buildFormattedKey(key) {
    return (typeof key === 'object' && !this._strictKeyMode) ?
      JSON.stringify(key) : key;
  }
}

export default Collection