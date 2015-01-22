var request = require('request'), 
	cheerio = require('cheerio'), 
	async = require('async');

function scrapeStopAndShop(callback) {

	request("http://scapi.shoplocal.com/stopandshop/2012.2/json/getpromotionpages.aspx?campaignid=5e018ae35636a4e2&storeid=2599015&promotionid=111191", function (err, resp, body) {
		
		if (err) {
			return new Error("There was an error making the URL request.\n" + err);
		}

		if (!err && resp.statusCode === 200) {

			var $ = cheerio.load(body);

			console.log(body);

			var json = JSON.parse(body);

			var result = [];

			json.content.collection[0].data.map(function (page) {
				result.push({
					pageID: page.pageid, 
					endDate: page.enddate, 
					image: page.imageurl 
				});
			});

			console.log("Found " + result.length + " pages!");
			console.log(result);

			callback(result);
		}
	});
}

function getProducts(pageID, callback) {

	request("http://scapi.shoplocal.com/stopandshop/2012.2/json/getpromotionpagelistings.aspx?campaignid=5e018ae35636a4e2&storeid=2599015&pageid=" + pageID, function (err, resp, body) {
		
		if (err) {
			return new Error("There was an error making the URL request.\n" + err);
		}

		if (!err && resp.statusCode === 200) {

			//console.log(body);
			var json = JSON.parse(body);

			var result = [];

			console.log(json.content.collection.data);

			if (json.content.collection.data && json.content.collection.data.length > 0) {

				json.content.collection.data.map(function (product) {
					result.push({
						productName: product.title, 
						productDescription: product.description || "No Description Provided", 
						productPrice: product.price + " " + product.pricequalifier, 
						productImage: product.image
					});
				});
			}


			//console.log(result);
			callback(null, result);

		}			

	});

}


scrapeStopAndShop(function (resultsArray) {

	var pageIDs = [], 
        allPageContent = [];	


	resultsArray.map(function (page) {
		return pageIDs.push(page.pageID);
	});

	console.log(pageIDs);


	async.map(pageIDs, getProducts, function (err, results) {
		
		if (err) {
			return new Error("There was an error mapping over the page IDs!");
		}

		//allPageContent.push(results);
		console.log("Results are: ");
		console.log(results);
		console.log(results.length);
		console.log(results.map(function (page) {
			return page.length;
		}));
	});

});
