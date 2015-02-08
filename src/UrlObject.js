var _ = require('underscore');

function UrlObject(host, pathname, query) {

	this.protocol = 'http:';
	this.host = host || '';
	this.pathname = pathname || '';
	this.query = query || null;
}  

UrlObject.prototype.setValue = function (prop, value) {
	return this[prop] = this[prop] || value;
};

UrlObject.prototype.setCacheKeys = function (objectOfKeys) {
	return this.cacheKeys = objectOfKeys;
};

UrlObject.prototype.setProperty = function (prop, configCache) {
	return this.setValue(prop, configCache[prop][this.cacheKeys[prop]]);
};

UrlObject.prototype.getConfigAndSetValues = function (configCache, objectOfKeys) {
	this.setCacheKeys(objectOfKeys);

	this.setProperty('host', configCache);
	this.setProperty('pathname', configCache);
	this.setValue('query', _.pick(configCache['parameters'], objectOfKeys['parameters']));

	return this;
};

module.exports = UrlObject;	