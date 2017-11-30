import Collection from "./collection"

/**
* Registry class to store any kind of information in domains.
*/
class DomainMap {

  /**
  * Construct registry
  *
  * @param variables with following keys:
  *   - boolean strictKeyMode, defaults to true
  */
  constructor(variables = {}) {
    this._data = {};
    this._strictKeyMode = variables.hasOwnProperty('strictKeyMode') &&
      !variables.strictKeyMode ? false : true;
  }

  /**
  * Set key to registery
  *
  * @param domain
  * @param key
  * @param value
  */
  set(domain, key, value) {
    if (!this._data.hasOwnProperty(domain))
      this._data[domain] = new Collection({strictKeyMode: this._strictKeyMode});
    this._data[domain].set(key, value);
  }

  /**
  * Get key
  *
  * @param domain
  * @param key
  * @param defaultValue
  *   Defaults to false
  */
  get(domain, key, defaultValue = false) {
    if (!this._data.hasOwnProperty(domain))
      return defaultValue;
    return this._data[domain].get(key, defaultValue);
  }

  /**
  * Delete key from domain.
  *
  * @param domain
  * @param key
  */
  delete(domain, key) {
    if (!this._data.hasOwnProperty(domain)) 
      return;
    this._data[domain].delete(key);
  }

  /**
  * Clear domain
  *
  * @param domain name
  */
  clearDomain(domain) {
    if (!this._data.hasOwnProperty(domain)) 
      return;
    this._data[domain].clearMap();
  }

  /**
  * Get domain key list.
  *
  * @param domain
  * @param defaultValue
  * @return domain key list
  */
  getDomainKeysList(domain, defaultValue = null) {
    return this._data.hasOwnProperty(domain) ?
      this._data[domain].getKeysList(): defaultValue;
  }

  /**
  * Get whole domain collection
  *
  * @param domain
  * @param defaultValue
  * @return domain collection or null
  */
  getDomain(domain, defaultValue = null) {
    return this._data.hasOwnProperty(domain) ?
      this._data[domain] : defaultValue;
  }

  /**
  * Static method to create collection.
  *
  * @param variables
  * @return collection
  */
  static createCollection(variables = {}) {
    return new Collection(variables);
  }
}

export default DomainMap