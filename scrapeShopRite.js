var request = require('request'), 
	cheerio = require('cheerio'), 
	async = require('async');

var scrapeShopRite = {

	config: {
		baseURL: "http://plan.shoprite.com/Circular/ShopRite-of-Norwich/BFDE400/Weekly/2/", 
		pageNumberLocation: 'span.pages', 
		startDateLocation: {
			element: 'div#CircularValidDates', 
			attribute: 'data-start', 
			indexes: [0, 8]
		}, 
		endDateLocation: {
			element: 'div#CircularValidDates', 
			attribute: 'data-end', 
			indexes: [0, 8]
		}, 
		product: {
			containerLocation: '.tooltip', 
			nameLocation: 'p.itemTitle', 
			descriptionLocation: 'p.itemBrand', 
			priceLocation: 'p.itemPrice', 
			imageLocation: {
				element: 'img.itemImage', 
				attribute: 'src'
			}
		}
	}, 

	getCircularNumberOfPages: function (body) {
		
		var $ = cheerio.load(body); 
		var pageNumbers = [];

		$(this.config.pageNumberLocation).map(function (index, span) {
			pageNumbers.push(Number($(span).text()));
		});

		// DEVELOPMENT ONLY
		console.log(pageNumbers);

		var numberOfPages = pageNumbers.reduce(function (prev, curr) {
			return curr > prev ? curr : prev;
		});

		// DEVELOPMENT ONLY
		console.log("The number of pages in this week's circular is " + numberOfPages);

		return numberOfPages;
	}, 

	createPagesArray: function (maxPage) {
		
		var pages = []; 

		for (var i = 1; i <= maxPage; i++) {
			pages.push(i);
		}

		return pages;
	}, 

	scrapePage: function (pageNumber, callback) {
		
		var self = scrapeShopRite;

		request(self.config.baseURL + pageNumber, function (err, resp, body) {
			
			self.handleError(err, "An error occured making the URL request.");

			if (!err && resp.statusCode === 200) {

				var $ = cheerio.load(body); 
				var pageData = {
					StartDate: '', 
					EndDate: '', 
					Products: []
				};

				var startDateConfig = self.config.startDateLocation, 
					endDateConfig = self.config.endDateLocation;

				pageData.StartDate = $(startDateConfig.element)
					.attr(startDateConfig.attribute)
					.slice(startDateConfig.indexes[0], startDateConfig.indexes[1]);

				pageData.EndDate = $(endDateConfig.element)
					.attr(endDateConfig.attribute)
					.slice(endDateConfig.indexes[0], endDateConfig.indexes[1]);
				
				var productConfig = self.config.product;

				$(productConfig.containerLocation).map(function () {
					
					var name = $(this).find(productConfig.nameLocation).text(), 
						price = $(this).find(productConfig.priceLocation).text(), 
						description = $(this).find(productConfig.descriptionLocation).text(), 
						image = $(this).find(productConfig.imageLocation.element)
							.attr(productConfig.imageLocation.attribute);	
					
					if (image && name && price) {
						pageData.Products.push({
							ProductName: name, 
							ProductDescription: description || "No description provided.", 
							Price: price, 
							ImageUrl: image
						});
					}

				});

				// DEVELOPMENT ONLY
				// console.log(pageData);
				callback(null, pageData);

			}

		});

	}, 

	scrapeCircular: function (pagesArray, callback) {
		
		var self = this;

		async.map(pagesArray, self.scrapePage, function (err, results) {
			
			self.handleError("There was an error mapping over the page numbers!");

			// DEVELOPMENT ONLY
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

			// DEVELOPMENT ONLY
			console.log(finalResults);
			console.log("Found " + finalResults.Products.length + " products in this week's circular!");
			callback(finalResults);

		});

	},

	scrape: function (callback) {
		
		var self = this;
	
		request(this.config.baseURL, function (err, resp, body) {
			
			self.handleError(err, "An error occurred making the URL request.");

			var numberOfPages = self.getCircularNumberOfPages(body);
			var pagesArray = self.createPagesArray(numberOfPages);

			self.scrapeCircular(pagesArray, callback);

		});

	},  

	handleError: function (err, message) {
		
		if (err) {
			return new Error(message + "\n" + err);
		}

	}
};



module.exports = scrapeShopRite;

//scrapeShopRite.scrape(console.log);