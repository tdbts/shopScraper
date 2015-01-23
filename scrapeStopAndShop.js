var request = require('request'),  
	async = require('async');

function scrapeStopAndShopCircularPages(callback) {

	// The information for the various pages is also available in the landing page html 
	// within the pageElementsArray variable.  If updates cause this url to fail, it may 
	// be better to grab this information from that array instead. 
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

	request("http://scapi.shoplocal.com/stopandshop/2012.2/json/getpromotionpagelistings.aspx?campaignid=5e018ae35636a4e2&storeid=2599015&resultset=full&pageid=" + pageID, function (err, resp, body) {
		
		if (err) {
			return new Error("There was an error making the URL request.\n" + err);
		}

		if (!err && resp.statusCode === 200) {

			//console.log(body);
			var json = JSON.parse(body);

			var result = {
				startDate: '', 
				endDate: '', 
				products: []
			};

			//console.log(json.content.collection[0].data);

			if (json.content.collection[0].data && json.content.collection[0].data.length > 0) {

				result.startDate = json.content.collection[0].data[0].listingstart.slice(0, 10);
				result.endDate = json.content.collection[0].data[0].listingend.slice(0, 10);

				json.content.collection[0].data.map(function (product) {
					result.products.push({
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

function handleCircularPageResults(pagesArray, callback) {

	var pageIDs = [];

	pagesArray.map(function (page) {
		return pageIDs.push(page.pageID);
	});

	// console.log(pageIDs);

	async.map(pageIDs, getProducts, function (err, results) {
		
		if (err) {
			return new Error("There was an error mapping over the page IDs!");
		}

		console.log(results);
		console.log("Found " + results.length + " pages for this week's sales!");
		console.log(results.map(function (page) {
			return page.products.length;
		}));

		var allProducts = {
			startDate: '', 
			endDate: '', 
			products: []
		};


		// results.reduce(function (prev, curr) {
		// 	allProducts.startDate = prev.startDate;
		// 	allProducts.endDate = prev.endDate;

		// 	return 
		// });

		results.map(function (pageData) {
			allProducts.startDate = allProducts.startDate || pageData.startDate;
			allProducts.endDate = allProducts.endDate || pageData.endDate;

			pageData.products.forEach(function (data) {
				allProducts.products.push(data);
			});
		});

		// console.log(allProducts);
		// console.log("Found " + allProducts.length + " products on sale this week!");
		callback(allProducts);
	});
}

function scrapeStopAndShop(callback) {

	scrapeStopAndShopCircularPages(function (results) {
		
		handleCircularPageResults(results, callback);
	});

}

// scrapeStopAndShop(function (allProducts) {
// 	console.log(allProducts);
// 	console.log("Found " + allProducts.products.length + " products on sale this week!");

// });


module.exports = scrapeStopAndShop;

