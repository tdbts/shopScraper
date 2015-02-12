var moment = require('moment'), 
	requester = require('./requester');  

var scraper = requester.extend({ 	
	scrape: function () {}, 

	getStoreName: function () {
		
		return this.config.storeName;
	}, 
	
	locateAndParsePageData: function (jsonSource) {
	
		var json = JSON.parse(jsonSource);

		return json.content.collection[0].data;
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