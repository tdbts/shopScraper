var scraper = require('./scraper'),
	getCircularNumberOfPages = require('./sr_getCircularNumberOfPages'), 
	scrapePage = require('./sr_scrapePage'), 
	CircularPageData = require('./CircularPageData'),  
	async = require('async');

var scrapeShopRite = scraper.extend({

	config: {
		storeName: "Shop Rite", 
		// "PseudoStoreID" is same as data-clientanalyticslabel attribute of store hrefs!
		baseURL: "http://plan.shoprite.com/Circular/ShopRite-of-Norwich/BFDE400/Weekly/2/", 
		pageNumberLocation: 'span.pages'
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

		scrapePage.setBaseURL(this.config.baseURL);

		async.map(pagesArray, scrapePage.scrape, function (err, pagesDataArray) {

			var circularData = new CircularPageData();
			
			self.collectAllProducts(pagesDataArray, circularData, self.parseDate);

			circularData.storeName = self.config.storeName;

			console.log("Found " + circularData.products.length + " products in this week's " + self.config.storeName + " circular!");
			
			callback(err, circularData);
		});

	},

	scrape: function (callback) {
		
		var self = this;
	
		getCircularNumberOfPages.scrape(this.config.baseURL, function (err, pagesArray) {
			self.scrapeCircular(pagesArray, callback);
		});

	}

});


module.exports = scrapeShopRite;
