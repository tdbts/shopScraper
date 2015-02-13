var request = require('request'), 
	cheerio = require('cheerio'), 
	scraper = require('./scraper'),
	shopRiteDomData = require('./shopRiteDomData'),  
	Product = require('./Product'),
	CircularPageData = require('./CircularPageData'),  
	async = require('async');

var scrapeShopRite = scraper.extend({

	config: {
		storeName: "Shop Rite", 
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
		// console.log(pageNumbers);

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

	getDate: function (dateConfig, $) {
		
		if ($) {

			return $(dateConfig.element)
				.attr(dateConfig.attribute)
				.slice(dateConfig.indexes[0], dateConfig.indexes[1]);
		} 
	}, 

	getText: function (selector, textLocation) {
		return selector.find(textLocation).text();
	}, 

	getImageUrl: function (selector, imageElement, imageAttribute) {
		 return selector.find(imageElement).attr(imageAttribute);
	}, 

	scrapePage: function (pageNumber, callback) {
		
		var self = scrapeShopRite;

		request(self.config.baseURL + pageNumber, function (err, resp, body) {
			
			self.handleError(err, "An error occured making the URL request.");

			if (!err && resp.statusCode === 200) {

				var $ = cheerio.load(body); 
				var pageData = new CircularPageData();
				
				pageData.startDate = self.getDate(self.config.startDateLocation, $);
				pageData.endDate = self.getDate(self.config.endDateLocation, $);

				var productConfig = self.config.product;

				$(productConfig.containerLocation).map(function () {
					var name = shopRiteDomData.getProductText($(this), 'name'), 
						price = shopRiteDomData.getProductText($(this), 'price'), 
						description = shopRiteDomData.getProductText($(this), 'description'), 	
						image = self.getImageUrl($(this), productConfig.imageLocation.element, productConfig.imageLocation.attribute);

					if (name && price && image) {
						pageData.products.push(new Product(name, price, description, image));
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
			// console.log(JSON.stringify(results));
			// console.log(results.length);

			var finalResults = {
				startDate: '', 
				endDate: '', 
				products: []
			};

			results.map(function (page) {
				finalResults.startDate = finalResults.startDate || page.startDate;
				finalResults.endDate = finalResults.endDate || page.endDate;
				page.products.map(function (product) {
					finalResults.products.push(product);
				});
			});

			// DEVELOPMENT ONLY
			// console.log(finalResults);
			console.log("Found " + finalResults.products.length + " products in this week's circular!");
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

	}

});



module.exports = scrapeShopRite;
