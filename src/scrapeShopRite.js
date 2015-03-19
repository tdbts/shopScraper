var scraper = require('./scraper'),
	getCircularNumberOfPages = require('./sr_getCircularNumberOfPages'), 
	scrapePage = require('./sr_scrapePage'), 
	CircularPageData = require('./CircularPageData'),  
	async = require('async');

var scrapeShopRite = scraper.extend({

	config: {
		storeName: "Shop Rite" 
	}, 

	collectAllProducts: function (data, resultsObj, dateParser) {
		
		data.map(function (page) {
			resultsObj.startDate = resultsObj.startDate || dateParser(page.startDate);
			resultsObj.endDate = resultsObj.endDate || dateParser(page.endDate);
			
			page.products.map(function (product) {
				resultsObj.products.push(product);
			});
		});

	}, 

	scrapeCircular: function (pagesArray, callback) {

		var self = this;

		// DEPRECATED NOW THAT WE EXTEND SCRAPER CONFIGS WITH SERVER DATA
		// scrapePage.setBaseURL(this.config.baseURL);

		async.map(pagesArray, scrapePage.scrape, function (err, pagesDataArray) {

			var circularData = new CircularPageData();
			
			self.collectAllProducts(pagesDataArray, circularData, self.parseDate);

			circularData.storeName = self.config.storeName; 

			self.assignIDsToProducts(circularData.products);
			
			console.log("Found " + circularData.products.length + " products in this week's " + self.config.storeName + " circular!");
			
			callback(err, circularData);
		});

	},

	scrape: function (data, callback) {
		
		var self = this;

		// this.extendConfig(data);
		[this, getCircularNumberOfPages, scrapePage].forEach(function (scraper) {
			scraper.extendConfig(data);
		});
	
		getCircularNumberOfPages.scrape(this.config.baseURL, function (err, pagesArray) {
			self.scrapeCircular(pagesArray, callback);
		});

	}

});


module.exports = scrapeShopRite;
