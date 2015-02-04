/* 

Will want to make a base Scraper object from which the scrapers for the various 
stores can inherit.  It would look something like this: 

// Scraper.js
module.exports = {
	config: {}, 
	scrape: function() {}, 
	handleError: function(err, message) {...}
};

*/

var request = require('request'), 
	Product = require('./Product');

var scrapeBigY = {

	config: {
		circularDataLocation: "http://bigy.myrelationshop.com/rs/WeeklyAd/GetCurrentCircular?storeId=30&size=768"	
	}, 

	getDate: function (sourceObject, dateType) {

		var prop = dateType === 'start' ? 'StartDate' 
			: dateType === 'end' ? 'EndDate' : void 0;

		return sourceObject[prop].slice(0, 10); 
	}, 
	
	scrape: function (callback) {
		
		var self = this;

		request(this.config.circularDataLocation, function (err, resp, body) {
			
			self.handleError(err);

			if (!err && resp.statusCode === 200) {

				var json = JSON.parse(body);

				// DEVELOPMENT ONLY
				// console.log(json);

				var circularData = {
					startDate: '', 
					endDate: '', 
					products: []
				};

				// In the f(x) below, I shouldn't hardcode the containerObj parameters that 
				// the code maps over.  Rather, I should put these values in the config, and 
				// then refer to those as I need them.   
				var containerObj = json.pop();
					
				circularData.startDate = self.getDate(containerObj, 'start');
				circularData.endDate = self.getDate(containerObj, 'end');

				containerObj.CS_Page.map(function (obj) {
					obj.SaleItems.map(function (item) {

						circularData.products.push(new Product(
							item.ProductName, 
							item.ProductDescription, 
							item.Price, 
							item.ImageUrl
						));
					});
				});


				// DEVELOPMENT ONLY
				// console.log(circularData)

				console.log("Scraped " + circularData.products.length + " products!");
				
				callback(circularData);		
			}
		}) 
	}, 

	handleError: function (err, message) {
		
		if (err) {
			return new Error(message + "\n" + err);
		}
	}

};

module.exports = scrapeBigY;