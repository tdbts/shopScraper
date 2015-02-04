var _ = require('underscore');

module.exports = { 
	config: {},
	
	extend: function (child) {
		return _.extend({}, this, child);	
	}, 
	
	scrape: function () {}, 
	
	logScrapeResults: function (productsArray) {
		console.log("Scraped " + productsArray.length + " products from this week's " 
			+ this.config.storeName + " circular!");
	}, 
	
	handleError: function (err, message) {
		if (err) {
			return new Error(message + "\n" + err);
		}
	}
}