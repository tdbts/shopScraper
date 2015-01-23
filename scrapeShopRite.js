var request = require('request'), 
	cheerio = require('cheerio'), 
	async = require('async');

// function scrapeShopRite(callback) {
	
// 	request("http://plan.shoprite.com/Circular/ShopRite-of-Norwich/BFDE400/Weekly/2", function (err, resp, body) {
		
// 		if (err) {
// 			return new Error("There was an error making the URL request.\n" + err);
// 		}

// 		if (!err && resp.statusCode === 200) {

// 			var $ = cheerio.load(body);

// 			var result = {
// 				StartDate: '', 
// 				EndDate: '', 
// 				Products: []
// 			};

// 			result.StartDate = $('div#CircularValidDates').attr('data-start').slice(0, 8);
// 			result.EndDate = $('div#CircularValidDates').attr('data-end').slice(0, 8);

// 			$('.tooltip').map(function () {

// 				var name = $(this).find('p.itemTitle').text(), 
// 					price = $(this).find('p.itemPrice').text(), 
// 					image = $(this).find('img.itemImage').attr('src');

// 				if (image && name && price) {
// 					result.Products.push({
// 						name: name, 
// 						price: price, 
// 						image: image 
// 					});
// 				}	
// 			});

// 			console.log(result);

// 		}
// 	});	
// }



function getShopRitePageNumbers(callback ) {

	request("http://plan.shoprite.com/Circular/ShopRite-of-Norwich/BFDE400/Weekly/2", function (err, resp, body) {
		
		if (err) {
			return new Error("There was a fuckin' error, dude.\n" + err);
		}

		if (!err && resp.statusCode === 200) {

			var $ = cheerio.load(body);

			var pageNumbers = [];

			$('span.pages').map(function (index, span) {
				pageNumbers.push(Number($(span).text()));
			});

			console.log(pageNumbers);

			var numberOfPages = pageNumbers.reduce(function (prev, curr) {
				return curr > prev ? curr : prev;
			});

			console.log("The number of pages in this week's circular is " + numberOfPages);
		}

		var pagesArray = (function(max) {
			
			var results = [];
			
			for (var i = 1; i <= max; i++) {
				results.push(i);
			}

			return results;
		
		})(numberOfPages);

		console.log("Pages array is: " + pagesArray);

		async.map(pagesArray, scrapeShopRite, function (err, results) {
			
			if (err) {
				return new Error("There was an error mapping over the page numbers!");
			}

			console.log(JSON.stringify(results));
			// console.log(results.length);
			
			var finalResults = {
				StartDate: '', 
				EndDate: '', 
				Products: []
			};

			results.map(function (page) {
				finalResults.StartDate = finalResults.StartDate || page.StartDate;
				finalResults.EndDate = finalResults.EndDate || page.EndDate;
				page.Products.map(function (product) {
					finalResults.Products.push(product);
				});
			});

			console.log(finalResults); 
			console.log("Found " + finalResults.Products.length + " products in this week's circular!");
			callback(finalResults);
		});

	});
}

function scrapeShopRite(pageNumber, callback) {
	
	request("http://plan.shoprite.com/Circular/ShopRite-of-Norwich/BFDE400/Weekly/2/" + pageNumber, function (err, resp, body) {
		
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
					description = $(this).find('p.itemBrand').text(), 
					image = $(this).find('img.itemImage').attr('src');

				if (image && name && price) {
					result.Products.push({
						ProductName: name, 
						ProductDescription: description || "No description provided.", 
						Price: price, 
						ImageUrl: image 
					});
				}	
			});

			//console.log(result);
			callback(null, result);

		}
	});	
}

//getShopRitePageNumbers();

module.exports = getShopRitePageNumbers;