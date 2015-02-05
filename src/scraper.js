var _ = require('underscore'), 
	moment = require('moment');

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

	parseDate: function (givenDate) {
		
		return moment(givenDate).format("dddd, MMMM Do YYYY");
	}, 
	
	handleError: function (err, message) {
		if (err) {
			return new Error(message + "\n" + err);
		}
	}
};