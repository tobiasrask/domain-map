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
  constructor(variables) {
    if (variables === undefined) variables = {};
    // Init
    this._data = {};

    // Strict mode
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
  * @param default_value
  *   Defaults to false
  */
  get(domain, key, default_value) {
    if (default_value === undefined) default_value = false;
    if (!this._data.hasOwnProperty(domain))
      return default_value;
    return this._data[domain].get(key, default_value);
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
  getDomainKeysList(domain, defaultValue) {
    if (defaultValue == undefined) defaultValue = null;
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
  getDomain(domain, defaultValue) {
    if (defaultValue == undefined) defaultValue = null;
    return this._data.hasOwnProperty(domain) ?
      this._data[domain] : defaultValue;
  }

  /**
  * Static method to create collection.
  *
  * @param variables
  * @return collection
  */
  static CreateCollection(variables) {
    if (variables === undefined) variables = {};
    return new Collection(variables);
  }
}

export default DomainMap