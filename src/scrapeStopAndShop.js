var async = require('async'), 
	scraper = require('./scraper'),
	getPromotionID = require('./sp_getPromotionID'),
	getPagesMetadata = require('./sp_getPagesMetadata'),    
	getProducts = require('./sp_getProducts'), 
	CircularPageData = require('./CircularPageData'), 
	UrlCreator = require('./UrlCreator');

var scrapeStopAndShop = scraper.extend({

	config: {
		storeName: "Stop And Shop"
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

			resultHandler(err, results, callback);
		});
	}, 

	coordinatePageDataProcessing: function (err, pageDataArray, callback) {
		
		var self = scrapeStopAndShop;
		
		// DEVELOPMENT ONLY
		// console.log(pageDataArray);
		console.log("Found " + pageDataArray.length + " pages for this week's sales!");

		var allProducts = new CircularPageData();

		self.processPageDataObjects(pageDataArray, allProducts, self.getDate, self.collectAllProducts);

		allProducts.storeName = self.config.storeName;

		self.assignIDsToProducts(allProducts.products);

		self.logScrapeResults(allProducts.products);
		
		callback(err, allProducts);
	}, 

	scrape: function (data, callback) {
		
		var self = this, 
			stopAndShopURLs = new UrlCreator(data.urlConfigs, data.urlFragments),
			urlForPromotionID = stopAndShopURLs.getUrl('forPromotionID');

		async.waterfall([

			function (cb) {
				getPromotionID.scrape({url: urlForPromotionID, followRedirect: false}, cb);
			},

			function (results, cb) {
				
				var urlForPagesData;

				stopAndShopURLs.addFragment('parameters', {promotionid: results.promotionid});

				urlForPagesData = stopAndShopURLs.getUrl('forPagesData');

				getPagesMetadata.scrape(urlForPagesData, cb);
			
			},

			function (pagesMetadata, cb) {

				var pageIDs = pagesMetadata.getPageIDs();

				getProducts.extendConfig(data);

				self.asyncMapOverData(pageIDs, getProducts.scrape, self.coordinatePageDataProcessing, cb);
			
			}
		], 

		function (err, results) {
			callback(err, results);
		}); 
	}

});

module.exports = scrapeStopAndShop;