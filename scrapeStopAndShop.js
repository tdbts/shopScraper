var request = require('request'),  
	async = require('async');

function scrapeStopAndShopCircularPages(callback) {

	request("http://scapi.shoplocal.com/stopandshop/2012.2/json/getpromotionpages.aspx?campaignid=5e018ae35636a4e2&storeid=2599015&promotionid=111191", function (err, resp, body) {
		
		if (err) {
			return new Error("There was an error making the URL request.\n" + err);
		}

		if (!err && resp.statusCode === 200) {

			// console.log(body);

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
			// console.log(result);

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

			// console.log(json.content.collection.data);

			if (json.content.collection.data && json.content.collection.data.length > 0) {

				json.content.collection.data.map(function (product) {
					result.push({
						ProductName: product.title, 
						ProductDescription: product.description || "No Description Provided", 
						Price: product.price + " " + product.pricequalifier, 
						ImageUrl: product.image
					});
				});
			}


			//console.log(result);
			callback(null, result);

		}			

	});

}

function handleCircularPageResults(resultsArray, callback) {

	var pageIDs = [];

	resultsArray.map(function (page) {
		return pageIDs.push(page.pageID);
	});

	// console.log(pageIDs);

	async.map(pageIDs, getProducts, function (err, results) {
		
		if (err) {
			return new Error("There was an error mapping over the page IDs!");
		}

		// console.log(results);
		console.log("Found " + results.length + " pages for this week's sales!");
		console.log(results.map(function (page) {
			return page.length;
		}));

		var allProducts = results.reduce(function (prev, curr) {
			prev = prev || [];

			return prev.concat(curr);
		});

		// console.log(allProducts);
		// console.log("Found " + allProducts.length + " products on sale this week!");
			callback(allProducts);
	});
}

function scrapeStopAndShop(callback) {

	scrapeStopAndShopCircularPages(function (resultsArray) {
		
		handleCircularPageResults(resultsArray, callback);
	});

}

// scrapeStopAndShop(function (allProducts) {
// 	console.log(allProducts);
// 	console.log("Found " + allProducts.length + " products on sale this week!");

// });


module.exports = scrapeStopAndShop;