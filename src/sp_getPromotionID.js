/* ************************************************
Stop & Shop - Promotion ID (used for the store's internal API) changes 
every so often.  This module allows the scraper to get the value for the 
Promotion ID.  

Futureproofing: 
- It would be more efficient to not need to get the Promotion ID every 
time the scrape is made.  Instead, the scraper should get the ID on the 
first scrape of any particular Stop & Shop store location, save the value, 
and retrieve and use this value on successive scrapes.  If the retrieved 
value does not work, then this module should be used to get the new 
Promotion ID value.  It may be prudent to save a history of the various 
scraped ID values.  */

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

			var queryObj = self.getQueryObject(resp.headers.location);
			
			var promotionIDobj = _.pick(queryObj, 'promotionid');
			
			return promotionIDobj;
		}		
	}, 	

	scrape: function (promotionIDurl, callback) {
		var self = this;

		this.makeRequest(promotionIDurl, self.parseRequestResults, callback);		
	}
});

module.exports = getPromotionID;