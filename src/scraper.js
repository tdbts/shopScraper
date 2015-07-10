var moment = require('moment'), 
	requester = require('./requester'), 
	_ = require('underscore');

var scraper = requester.extend({ 	
	scrape: function () {}, 

	setConfigData: function (key, value) {
		if (!this.config) {
			this.config = {};
		}

		return this.config[key] = value;
	}, 

	getConfigData: function (key) {
		
		return this.config[key]; 
	}, 

	extendConfig: function (dataObject) {
		if (!this.config) {
			this.config = {};
		}

		return this.config = _.extend(this.config, dataObject);
	}, 

	getStoreName: function () {
		
		return this.getConfigData('storeName');
	}, 
	
	locateAndParsePageData: function (jsonSource) {
	
		var json = JSON.parse(jsonSource);

		return json.content.collection[0].data;
	}, 

	assignIDsToProducts: function (productsArray) {

		productsArray.forEach(function (item, index) {
			return item.shsc_id = index.toString();
		});	
	}, 

	logScrapeResults: function (productsArray) {
		
		console.log("Scraped " + productsArray.length + " products from this week's " + 
			this.getStoreName() + " circular!");
	}, 

	parseDate: function (givenDate) {
		if (givenDate.indexOf("-") !== -1) {
			givenDate = givenDate.replace(/-/g, '/'); 
		} 

		if (givenDate.indexOf("T") !== -1) {
			givenDate = givenDate.slice(0, givenDate.indexOf("T")); 
		} 

		givenDate = new Date(givenDate).toISOString(); 


		return moment(givenDate).format("dddd, MMMM Do YYYY");
	}
});

module.exports = scraper;