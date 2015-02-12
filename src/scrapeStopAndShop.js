var async = require('async'), 
	scraper = require('./scraper'),
	getPromotionID = require('./sp_getPromotionID'),
	getPagesMetadata = require('./sp_getPagesMetadata'),    
	getProducts = require('./sp_getProducts'), 
	CircularPageData = require('./CircularPageData'), 
	stopAndShopURLs = require('./stopAndShopURLs');

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

			resultHandler(results, callback);
		});
	}, 

	coordinatePageDataProcessing: function (pageDataArray, callback) {
		
		var self = scrapeStopAndShop;
		
		// DEVELOPMENT ONLY
		// console.log(pageDataArray);
		console.log("Found " + pageDataArray.length + " pages for this week's sales!");

		var allProducts = new CircularPageData();

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