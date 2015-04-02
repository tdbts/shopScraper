var cheerio = require('cheerio'), 
	CircularPageData = require('./CircularPageData'), 
	DomData = require('./DomData'), 
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
		var self = scrapePage,
			shopRiteDomData = new DomData(self.config.domData);
		
		if (!err && resp.statusCode === 200) {
		
			var $ = cheerio.load(body),
				pageData = new CircularPageData();
			// console.log("SHOP RITE DOM DATA: ", JSON.stringify(shopRiteDomData));
			pageData.startDate = shopRiteDomData.getDate($, 'start');
			pageData.endDate = shopRiteDomData.getDate($, 'end');

			shopRiteDomData.collectProducts($, pageData.products);

			pageData.storeName = self.config.storeName;

			// DEVELOPMENT ONLY
			// console.log(pageData.products[0]);
			return pageData;			
		}
	}, 

	scrape: function (pageNumber, callback) {
		
		var self = scrapePage;
		
		self.makeRequest(self.config.baseURL + self.config.circularNumber + pageNumber, self.handlePageData, callback);
	}

});

module.exports = scrapePage;