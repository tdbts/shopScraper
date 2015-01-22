var request = require('request'), 
	cheerio = require('cheerio');

function scrapeShopRite(callback) {
	
	request("http://plan.shoprite.com/Circular/ShopRite-of-Norwich/BFDE400/Weekly/2", function (err, resp, body) {
		
		if (err) {
			return new Error("There was an error making the URL request.\n" + err);
		}

		if (!err && resp.statusCode === 200) {

			var $ = cheerio.load(body);

			var result = {
				StartDate: '', 
				EndDate: '', 
				Products: []
			};

			result.StartDate = $('div#CircularValidDates').attr('data-start').slice(0, 8);
			result.EndDate = $('div#CircularValidDates').attr('data-end').slice(0, 8);

			$('.tooltip').map(function () {

				var name = $(this).find('p.itemTitle').text(), 
					price = $(this).find('p.itemPrice').text(), 
					description = $(this).find('p.itemBrand').text() || "No description found", 
					image = $(this).find('img.itemImage').attr('src');

				if (image && name && price) {
					result.Products.push({
						ProductName: name, 
						ProductDescription: description, 
						Price: price, 
						ImageUrl: image 
					});
				}	
			});

			console.log("Scraped " + result.Products.length + " products!")
			//console.log(result);
			callback(result);

		}
	});	
}

module.exports = scrapeShopRite;