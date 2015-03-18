var cheerio = require('cheerio'), 
	CircularPageData = require('./CircularPageData'), 
	shopRiteDomData = require('./shopRiteDomData'), 
	scraper = require('./scraper');

var scrapePage = scraper.extend({
	
	config: {
		storeName: "Shop Rite", 
		baseURL: null
	}, 

	setBaseURL: function (url) {
		return this.config.baseURL = url;
	}, 

	handlePageData: function (err, resp, body) {
		var self = scrapePage;

		if (!err && resp.statusCode === 200) {
		
			var $ = cheerio.load(body),
				pageData = new CircularPageData();
			
			pageData.startDate = shopRiteDomData.getDate($, 'start');
			pageData.endDate = shopRiteDomData.getDate($, 'end');

			shopRiteDomData.collectProducts($, pageData.products);

			pageData.storeName = self.config.storeName;

			// DEVELOPMENT ONLY
			console.log(pageData.products[0]);
			return pageData;			
		}
	}, 

	scrape: function (pageNumber, callback) {
		
		var self = scrapePage;
		var url = self.config.baseURL + pageNumber;
		console.log(url);
		self.makeRequest(self.config.baseURL + pageNumber, self.handlePageData, callback);
	}

});

module.exports = scrapePage;