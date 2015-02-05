var request = require('request'), 
	scraper = require('./scraper'), 
	Product = require('./Product');

var scrapeBigY = scraper.extend({

	config: {
		storeName: "Big Y", 
		circularDataLocation: "http://bigy.myrelationshop.com/rs/WeeklyAd/GetCurrentCircular?size=768&storeId=",
		storeIDNumber: "30"  	
	}, 

	getDate: function (sourceObject, dateType) {

		var prop = dateType === 'start' ? 'StartDate' 
			: dateType === 'end' ? 'EndDate' : void 0;

		return this.parseDate(sourceObject[prop]); 
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

	urlRequest: function (requester, url, callback) {
		 
		 requester(url, function (err, resp, body) {
		 	
		 	callback(err, resp, body);
		 });

	}, 

	handleRequestResults: function (err, resp, body) {
		
		var self = this;
		
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

			return circularData;	
		}
	}, 
	
	scrape: function (callback) {
		
		var self = this, 
			config = this.config;

		self.urlRequest(request, config.circularDataLocation + config.storeIDNumber, function (err, resp, body) {
			
			var circularData = self.handleRequestResults(err, resp, body);

			callback(circularData);
		});
	}, 

});

module.exports = scrapeBigY;