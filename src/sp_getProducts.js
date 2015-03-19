/* Stop & Shop - The store circulars for Stop & Shop are rendered on the server 
and divided up into about a dozen or so different pages.  This module collects the 
product data for an individual page of the circular. */

var scraper = require('./scraper'),  
	UrlCreator = require('./UrlCreator'), 
	PageParser = require('./PageParser');

var getProducts = scraper.extend({
	config: {
		storeName: "Stop and Shop", 
		pageid: null
	},

	handlePageData: function (err, resp, body) {
		var self = getProducts;

		self.handleError(err, "There was a problem getting products from page: " + self.config.pageid);

		if (!err && resp.statusCode === 200) {

			var page = new PageParser(body), 
				pageData = page.getPageData();

			return pageData;
		}
	},  

	scrape: function (pageID, callback) {
		var self = getProducts, 
			config = self.config, 
			stopAndShopURLs = new UrlCreator(config.urlConfigs, config.urlFragments);

		self.setConfigData('pageid', pageID);

		var pageURL = stopAndShopURLs.getUrl('forProductData', function (obj) {
			return obj.query.pageid = pageID;
		});

		self.makeRequest(pageURL, self.handlePageData, function (err, result) {
			callback(err, result);
		});
	}		

});

module.exports = getProducts;