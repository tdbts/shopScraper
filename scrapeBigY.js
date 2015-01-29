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

var request = require('request');

var scrapeBigY = {

	config: {
		circularDataLocation: "http://bigy.myrelationshop.com/rs/WeeklyAd/GetCurrentCircular?storeId=30&size=768"	
	}, 

	scrape: function (callback) {
		
		var self = this;

		request(this.config.circularDataLocation, function (err, resp, body) {
			
			self.handleError(err);

			if (!err && resp.statusCode === 200) {

				var json = JSON.parse(body);

				// DEVELOPMENT ONLY
				console.log(json);

				var circularData = {
					startDate: '', 
					endDate: '', 
					products: []
				};

				// In the f(x) below, I shouldn't hardcode the containerObj paramaters that 
				// the code maps over.  Rather, I should put these values in the config, and 
				// then refer to those as I need them.
				// Also, I don't need to map over the 'json'.  It looks like the Big Y api 
				// sends back an array with one container object.    
				json.map(function (containerObj) {
					
					circularData.startDate = containerObj.StartDate.slice(0, 10);
					circularData.endDate = containerObj.EndDate.slice(0, 10);

					containerObj.CS_Page.map(function (obj) {
						obj.SaleItems.map(function (item) {
							// The process below is inefficent.  
							// I should try to make a constructor f(x) Product that 
							// creates an object like the one below, and pass it the 
							// four values it needs (item.ProductName, etc...)			
							circularData.products.push({
								productName: item.ProductName, 
								productDescription: item.ProductDescription, 
								price: item.Price, 
								imageUrl: item.ImageUrl
							});

						});
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