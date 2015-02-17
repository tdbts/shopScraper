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

	scrape: function (pageNumber, callback) {
		
		var self = scrapePage;

		self.makeRequest(self.config.baseURL + pageNumber, self.handlePageData, callback);
	}

});

module.exports = scrapePage;