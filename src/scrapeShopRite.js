var cheerio = require('cheerio'), 
	scraper = require('./scraper'),
	shopRiteDomData = require('./shopRiteDomData'),
	getCircularNumberOfPages = require('./sr_getCircularNumberOfPages'), 
	CircularPageData = require('./CircularPageData'),  
	async = require('async');

var scrapeShopRite = scraper.extend({

	config: {
		storeName: "Shop Rite", 
		baseURL: "http://plan.shoprite.com/Circular/ShopRite-of-Norwich/BFDE400/Weekly/2/", 
		pageNumberLocation: 'span.pages'
	}, 

	handlePageData: function (err, resp, body) {

		if (!err && resp.statusCode === 200) {
		
			var $ = cheerio.load(body),
				pageData = new CircularPageData();
			
			pageData.startDate = shopRiteDomData.getDate($, 'start');
			pageData.endDate = shopRiteDomData.getDate($, 'end');

			shopRiteDomData.collectProducts($, pageData.products);

			// DEVELOPMENT ONLY
			// console.log(pageData);
			return pageData;			
		}
	}, 

	scrapePage: function (pageNumber, callback) {
		
		var self = scrapeShopRite;

		self.makeRequest(self.config.baseURL + pageNumber, self.handlePageData, callback);

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

		async.map(pagesArray, self.scrapePage, function (err, pagesDataArray) {
			
			var error = self.handleError("There was an error mapping over the page numbers!");

			// DEVELOPMENT ONLY
			// console.log(JSON.stringify(results));
			// console.log(results.length);

			var circularData = new CircularPageData();

			self.collectAllProducts(pagesDataArray, circularData, self.parseDate);

			// DEVELOPMENT ONLY
			// console.log(circularData);
			console.log("Found " + circularData.products.length + " products in this week's " + self.config.storeName + " circular!");
			callback(error, circularData);

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
