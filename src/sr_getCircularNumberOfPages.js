var cheerio = require('cheerio'), 
	scraper = require('./scraper'), 
	DomData = require('./DomData');

var getCircularNumberOfPages = scraper.extend({
	config: {
		storeName: "Shop Rite"
	}, 

	circularPageTotal: function (body, pageNumberLocation) {
		
		var $ = cheerio.load(body), 
			pageNumbers = [];

		$(pageNumberLocation).map(function (index, span) {
			pageNumbers.push(Number($(span).text()));
		});

		// DEVELOPMENT ONLY
		// console.log(pageNumbers);

		var numberOfPages = pageNumbers.reduce(function (prev, curr) {
			return curr > prev ? curr : prev;
		});

		// DEVELOPMENT ONLY
		console.log("There are " + numberOfPages + " pages in this week's " + this.config.storeName + " circular!");

		return numberOfPages;		
	}, 

	createPagesArray: function (maxPage) {
		
		var pages = []; 

		for (var i = 1; i <= maxPage; i++) {
			pages.push(i);
		}

		return pages;
	}, 

	handleResponse: function (err, resp, body) {
		var self = getCircularNumberOfPages,
			shopRiteDomData = new DomData(self.config.domData);
		
		var numberOfPages = self.circularPageTotal(body, shopRiteDomData.config.pageNumberLocation), 
			pagesArray = self.createPagesArray(numberOfPages);

		return pagesArray;		
	}, 

	scrape: function (url, callback) {
		var self = this;
		
		self.makeRequest(url, self.handleResponse, callback);
	}

});

module.exports = getCircularNumberOfPages;