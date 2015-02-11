var url = require('url'), 
	applyConstructor = require('./applyConstructor'), 
	CacheDataLocator = require('./CacheDataLocator'), 
	UrlObject = require('./UrlObject');

function UrlCreator(configs, fragments) {
	this.configs = configs;
	this.fragments = fragments;	
}

UrlCreator.prototype.addConfig = function (name, configArray) {
	return this.configs[name] = configArray;
};

UrlCreator.prototype.addFragment = function (urlRole, configObj) {
	if (this.fragments[urlRole]) {
		for (var key in configObj) {
			this.fragments[urlRole][key] = configObj[key];
		}
		return;
	}
};

UrlCreator.prototype.getUrl = function (urlConfigKey, modifier) {
	var dataLocator = applyConstructor(CacheDataLocator, this.configs[urlConfigKey]), 
		urlObj = new UrlObject().getConfigAndSetValues(this.fragments, dataLocator);
	
	if (modifier) {
		modifier(urlObj);
	}

	return url.format(urlObj);
};

module.exports = UrlCreator;

