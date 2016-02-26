/**
* General tests for system
*/
import DomainMap from "./../src/domain-map";
import assert from "assert";

describe('Registry API', () => {

  describe('Testing registry API', () => {
    it('It should support domain prefix and key value store', (done) => {
      let registry = new DomainMap();

      let domainA = 'myDomainA';
      let domainB = 'myDomainB';

      let testKeyA = 'myKey';
      let testValueA = 'myValue';
      
      let testKeyB = 'mySecondKey';
      let testValueB = 'mySecondValue';

      let defaultValue = 'myDefaultValue';

      // Test empty registry with default values
      if (registry.get(domainA, testKeyA) !== false)
        return done(new Error("Registry returned content while it should be empty"));

      if (registry.get(domainA, testKeyA, defaultValue) !== defaultValue)
        return done(new Error("Registry didn't return default value for missing key"));

      if (registry.get(domainB, testKeyA) !== false)
        return done(new Error("Registry returned content while it should be empty"));

      if (registry.get(domainB, testKeyA, defaultValue) !== defaultValue)
        return done(new Error("Registry didn't return default value for missing key"));


      // Test with values and default values
      registry.set(domainA, testKeyA, testValueA);
      registry.set(domainA, testKeyB, testValueB);

      if (registry.get(domainA, testKeyA) !== testValueA)
        return done(new Error("Registry didn't return right test value"));

      if (registry.get(domainA, testKeyA, defaultValue) !== testValueA)
        return done(new Error("Registry didn't return right test value"));

      if (registry.get(domainA, testKeyB) !== testValueB)
        return done(new Error("Registry didn't return right test value"));

      if (registry.get(domainA, testKeyB, defaultValue) !== testValueB)
        return done(new Error("Registry didn't return right test value"));

      // Test different domain with same key
      if (registry.get(domainB, testKeyA) !== false)
        return done(new Error("Registry returned content while it should be empty"));

      if (registry.get(domainB, testKeyA, defaultValue) !== defaultValue)
        return done(new Error("Registry didn't return default value for missing key"));


      // Test deleting same keys from different domain
      registry.delete(domainB, testKeyA);

      if (registry.get(domainA, testKeyA) !== testValueA)
        return done(new Error("Registry didn't return right test value"));

      if (registry.get(domainA, testKeyA, defaultValue) !== testValueA)
        return done(new Error("Registry didn't return right test value"));


      // Test clearing different domain
      registry.clearDomain(domainB);

      if (registry.get(domainA, testKeyA) !== testValueA)
        return done(new Error("Registry didn't return right test value"));

      if (registry.get(domainA, testKeyA, defaultValue) !== testValueA)
        return done(new Error("Registry didn't return right test value"));

      if (registry.get(domainA, testKeyB) !== testValueB)
        return done(new Error("Registry didn't return right test value"));

      if (registry.get(domainA, testKeyB, defaultValue) !== testValueB)
        return done(new Error("Registry didn't return right test value"));


      // Test removing itms
      registry.delete(domainA, testKeyA);

      if (registry.get(domainA, testKeyA) !== false)
        return done(new Error("Registry returned content while it should be empty"));

      if (registry.get(domainA, testKeyA, defaultValue) !== defaultValue)
        return done(new Error("Registry didn't return default value for missing key"));

      if (registry.get(domainA, testKeyB) !== testValueB)
        return done(new Error("Registry didn't return right test value"));

      if (registry.get(domainA, testKeyB, defaultValue) !== testValueB)
        return done(new Error("Registry didn't return right test value"));

      registry.delete(domainA, testKeyB);

      if (registry.get(domainA, testKeyB) !== false)
        return done(new Error("Registry returned content while it should be empty"));

      if (registry.get(domainA, testKeyB, defaultValue) !== defaultValue)
        return done(new Error("Registry didn't return default value for missing key"));


      // Test re-enter same values
      registry.set(domainA, testKeyA, testValueA);
      registry.set(domainA, testKeyB, testValueB);

      if (registry.get(domainA, testKeyA) !== testValueA)
        return done(new Error("Registry didn't return right test value"));

      if (registry.get(domainA, testKeyA, defaultValue) !== testValueA)
        return done(new Error("Registry didn't return right test value"));

      if (registry.get(domainA, testKeyB) !== testValueB)
        return done(new Error("Registry didn't return right test value"));

      if (registry.get(domainA, testKeyB, defaultValue) !== testValueB)
        return done(new Error("Registry didn't return right test value"));


      // Test purging whole domain
      registry.clearDomain(domainA);

      if (registry.get(domainA, testKeyA) !== false)
        return done(new Error("Registry returned content while it should be empty"));

      if (registry.get(domainA, testKeyA, defaultValue) !== defaultValue)
        return done(new Error("Registry didn't return default value for missing key"));

      if (registry.get(domainA, testKeyB) !== false)
        return done(new Error("Registry returned content while it should be empty"));

      if (registry.get(domainA, testKeyB, defaultValue) !== defaultValue)
        return done(new Error("Registry didn't return default value for missing key"));

      done();
    })
  });
});
