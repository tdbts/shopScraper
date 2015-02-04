/* 

Will want to make a base Scraper object from which the scrapers for the various 
stores can inherit.  It would look something like this: 

// Scraper.js
module.exports = {
	config: {}, 
	scrape: function() {}, 
	handleError: function(err, message) {...}
};

*/

var request = require('request'), 
	Product = require('./Product');

var scrapeBigY = {

	config: {
		circularDataLocation: "http://bigy.myrelationshop.com/rs/WeeklyAd/GetCurrentCircular?size=768&storeId=",
		storeIDNumber: "30"  	
	}, 

	getDate: function (sourceObject, dateType) {

		var prop = dateType === 'start' ? 'StartDate' 
			: dateType === 'end' ? 'EndDate' : void 0;

		return sourceObject[prop].slice(0, 10); 
	}, 

	getContainerObj: function (source) {
		
		return JSON.parse(source).pop();
	}, 

	getProductData: function (source, ProductConstructor) {
		
		return new ProductConstructor(
			source.ProductName, 
			source.ProductDescription, 
			source.Price, 
			source.ImageUrl
		); 
	}, 

	getProducts: function (src, dest, productHandler) {
		
		src.CS_Page.map(function (obj) {
			obj.SaleItems.map(function (item) {

				dest.push(productHandler(item, Product));

			});
		});
	}, 
	
	scrape: function (callback) {
		
		var self = this, 
			config = this.config;

		request(config.circularDataLocation + config.storeIDNumber, function (err, resp, body) {
			
			self.handleError(err);

			if (!err && resp.statusCode === 200) {

				var containerObj = self.getContainerObj(body);

				// DEVELOPMENT ONLY
				// console.log(containerObj);

				var circularData = {
					startDate: self.getDate(containerObj, 'start'), 
					endDate: self.getDate(containerObj, 'end'), 
					products: []
				};

				self.getProducts(containerObj, circularData.products, self.getProductData);

				// DEVELOPMENT ONLY
				// console.log(circularData)

				self.logScrapeResults(circularData.products);

				callback(circularData);		
			}
		}); 
	}, 

	logScrapeResults:function (productsArray) {
		
		console.log("Scraped " + productsArray.length + " products!");
	}, 

	handleError: function (err, message) {
		
		if (err) {
			return new Error(message + "\n" + err);
		}
	}

};

module.exports = scrapeBigY;