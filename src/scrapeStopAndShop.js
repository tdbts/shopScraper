var request = require('request'), 
	async = require('async'), 
	scraper = require('./scraper'),
	getPromotionID = require('./sp_getPromotionID'),
	getPagesMetadata = require('./sp_getPagesMetadata'),    
	Product = require('./Product'),  
	PageParser = require('./PageParser'),
	getProducts = require('./sp_getProducts'), 
	stopAndShopURLs = require('./stopAndShopURLs');

var scrapeStopAndShop = scraper.extend({

	config: {
		storeName: "Stop And Shop"
	}, 

	locateAndParsePageData: function (jsonSource) {
		
		var json = JSON.parse(jsonSource);

		return json.content.collection.shift().data;
	}, 

	collectPageProductObjects: function (src, dest, ProductConstructor) {
		
		return src.map(function (product) {
			
			dest.push(new ProductConstructor(
				product.title, 
				product.description, 
				product.price + " " + product.pricequalifier, 
				product.image
			));
		});
	}, 

	getDateFromPage: function (productDataArray, type) {

		var prop = type === 'start' ? "listingstart" 
			: type === 'end' ? "listingend" : void 0;

		return productDataArray.shift()[prop];

	}, 

	CircularPageData: function (startDate, endDate, products) {
		this.startDate = startDate || '';
		this.endDate = endDate || '';
		this.products = products || [];
	}, 

	gatherPageData: function (config, PageDataConstructor) {
		
		var pageData = new PageDataConstructor(),
			productData = config.dataParser(config.jsonSource);

		if (productData && productData.length > 0) {

			pageData.startDate = config.dateParser(config.dateGetter(productData, 'start'));
			pageData.endDate = config.dateParser(config.dateGetter(productData, 'end'));

			config.productCollector(productData, pageData.products, Product);
		}

		return pageData;
	}, 

	collectAllProducts: function (src, dest) {
		
		src.forEach(function (data) {
			dest.push(data);
		});
	}, 

	getDate: function (src, dest, type) {

		var prop = type === 'start' ? "startDate" 
			: type === 'end' ? "endDate" : void 0;

		return dest[prop] = dest[prop] || src[prop];
	}, 

	processPageDataObjects: function (pageDataArray, dest, dateProcessor, collector) {
		
		return pageDataArray.map(function (pageData) {
			
			dateProcessor(pageData, dest, 'start');
			dateProcessor(pageData, dest, 'end');

			collector(pageData.products, dest.products);
		});
	}, 

	asyncMapOverData: function (arr, func, resultHandler, callback) {
		
		var self = this;

		return async.map(arr, func, function (err, results) {
			
			self.handleError(err, "There was an error asynchronously mapping over the data!");

			resultHandler(results, callback);
		});
	}, 

	coordinatePageDataProcessing: function (pageDataArray, callback) {
		
		var self = scrapeStopAndShop;
		
		// DEVELOPMENT ONLY
		// console.log(pageDataArray);
		console.log("Found " + pageDataArray.length + " pages for this week's sales!");

		var allProducts = new scrapeStopAndShop.CircularPageData();

		self.processPageDataObjects(pageDataArray, allProducts, self.getDate, self.collectAllProducts);

		self.logScrapeResults(allProducts.products);

		callback(allProducts);
	}, 

	scrape: function (callback) {
		
		var self = this, 
			urlForPromotionID = stopAndShopURLs.getUrl('forPromotionID');

		getPromotionID.scrape({url: urlForPromotionID, followRedirect: false}, function (results) {
			
			var urlForPagesData;

			stopAndShopURLs.addFragment('parameters', {promotionid: results.promotionid});

			urlForPagesData = stopAndShopURLs.getUrl('forPagesData');
			
			getPagesMetadata.scrape(urlForPagesData, function (pagesMetadata) {
				
				var pageIDs = pagesMetadata.getPageIDs();

				self.asyncMapOverData(pageIDs, getProducts.scrape, self.coordinatePageDataProcessing, callback); 
			});
		});
		 
	}

});

module.exports = scrapeStopAndShop;