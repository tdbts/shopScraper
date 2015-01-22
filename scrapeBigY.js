var request = require('request'), 
	cheerio = require('cheerio');

function scrapeBigY(callback) {

	request("http://bigy.myrelationshop.com/rs/WeeklyAd/GetCurrentCircular?storeId=30&size=768", function (err, resp, body) {
		
		if (err) {
			return new Error("There was an error making the URL request.\n" + err);
		}

		if (!err && resp.statusCode === 200) {
			
			var $ = cheerio.load(body);

			var json = JSON.parse(body);

			console.log(json);

			var result = {
				StartDate: '', 
				EndDate: '', 
				Products: []
			};

			json.map(function (containerObj) {
				containerObj.CS_Page.map(function (obj) {
					obj.SaleItems.map(function (item) {
						
						result.StartDate = containerObj.StartDate.slice(0, 10);
						result.EndDate = containerObj.EndDate.slice(0, 10);
						result.Products.push({
							ProductName: item.ProductName, 
							ProductDescription: item.ProductDescription, 
							Price: item.Price, 
							ImageUrl: item.ImageUrl
						});
					
					});
				});	

			});

			//console.log(result);
			console.log("Scraped " + result.Products.length + " products!");
			
			callback(result);

		}
	});
	
}

module.exports = scrapeBigY;

	


