var moment = require('moment'), 
	requester = require('./requester');  

var scraper = requester.extend({ 	
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
	}
});

module.exports = scraper;