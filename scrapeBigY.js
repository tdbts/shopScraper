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

				json.map(function (containerObj) {
					
					circularData.startDate = containerObj.StartDate.slice(0, 10);
					circularData.endDate = containerObj.EndDate.slice(0, 10);

					containerObj.CS_Page.map(function (obj) {
						obj.SaleItems.map(function (item) {
							
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