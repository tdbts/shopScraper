var _ = require('underscore');

function UrlObject(host, pathname, query) {

	this.protocol = 'http:';
	this.host = host || '';
	this.pathname = pathname || '';
	this.query = query || null;
}

UrlObject.prototype.getConfigAndSetValues = function (configCache, objectOfKeys) {
	
	this.host = this.host || configCache.hostnames[objectOfKeys.hostnameLoc];
	this.pathname = this.pathname || configCache.pathnames[objectOfKeys.pathnameLoc];
	this.query = this.query || _.pick(configCache.parameters, objectOfKeys.parameters);

	return this;
};

module.exports = UrlObject;