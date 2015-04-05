var scraper = require('./scraper'), 
	Product = require('./Product'), 
	CircularPageData = require('./CircularPageData');

var scrapeBigY = scraper.extend({

	config: {
		storeName: "Big Y"	
	}, 

	getDate: function (sourceObject, dateType) {

		var prop = dateType === 'start' ? 'StartDate' 
			: dateType === 'end' ? 'EndDate' : void 0;

		return this.parseDate(sourceObject[prop]); 
	}, 

	locateAndParsePageData: function (jsonSource) {
		
		return JSON.parse(jsonSource).pop();
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

	handleRequestResults: function (err, resp, body) {
		
		var self = scrapeBigY;
		
		self.handleError(err, "There was an error making the request to the " + self.config.storeName + " api!");

		if (!err && resp.statusCode === 200) {

			var containerObj = self.locateAndParsePageData(body);

			// DEVELOPMENT ONLY
			// console.log(containerObj);

			var startDate = self.getDate(containerObj, 'start'), 
				endDate = self.getDate(containerObj, 'end'), 
				circularData = new CircularPageData(startDate, endDate);

			self.getProducts(containerObj, circularData.products, self.getProductData);

			// DEVELOPMENT ONLY
			// console.log(circularData)
			
			circularData.storeName = self.config.storeName;

			self.assignIDsToProducts(circularData.products);
			
			self.logScrapeResults(circularData.products);

			return circularData;	
		}
	}, 
	
	scrape: function (data, callback) {
		var self = this, 
			config = this.config;

		this.extendConfig(data.configData.pop());

		config.storeID = data.preferences.pop().storeID;

		// DEVELOPMENT ONLY -- BIG Y BUG FIX
		// console.log("Big Y URL: ", config.circularDataURL + config.storeID);
		this.makeRequest(config.circularDataURL + config.storeID, self.handleRequestResults, callback);
	}, 

});

module.exports = scrapeBigY;