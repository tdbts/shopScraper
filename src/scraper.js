var _ = require('underscore');

module.exports = { 
	config: {},
	
	extend: function (child) {
		return _.extend({}, this, child);	
	}, 
	
	scrape: function () {}, 

	getStoreName: function () {
		
		return this.config.storeName;
	}, 
	
	logScrapeResults: function (productsArray) {
		console.log("Scraped " + productsArray.length + " products from this week's " + 
			this.getStoreName() + " circular!");
	}, 

	parseDate: function (parser, parserProp, givenDate) {
		
		return parser(givenDate)[parserProp];
	}, 
	
	handleError: function (err, message) {
		if (err) {
			return new Error(message + "\n" + err);
		}
	}
};