var url = require('url'), 
	scraper = require('./scraper'), 
	_ = require('underscore');

var getPromotionID = scraper.extend({
	config: {
		storeName: "Stop and Shop", 
	}, 

	getQueryObject: function (urlToParse) {
		return url.parse(urlToParse, true).query;
	},

	parseRequestResults: function (err, resp) {
		var self = getPromotionID;

		self.handleError(err, "An error occured getting this " + self.config.storeName + " location's  promotion ID number.");

		if (!err && resp.statusCode >= 300 && resp.statusCode < 400) {

			// DEVELOPMENT ONLY
			// console.log(resp.statusCode);
			// console.log(resp.toJSON());

			var queryObj = self.getQueryObject(resp.headers.location);
			
			// DEVELOPMENT ONLY
			// console.log(queryObj);

			var promotionIDobj = _.pick(queryObj, 'promotionid');
			// DEVELOPMENT ONLY
			// console.log(promotionIDobj);

			return promotionIDobj;
		}		
	}, 	

	scrape: function (promotionIDurl, callback) {
		var self = this;

		this.makeRequest(promotionIDurl, self.parseRequestResults, callback);		
	}
});

module.exports = getPromotionID;