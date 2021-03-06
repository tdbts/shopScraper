var scraper = require('./scraper'),
	getCircularNumberOfPages = require('./sr_getCircularNumberOfPages'), 
	scrapePage = require('./sr_scrapePage'), 
	CircularPageData = require('./CircularPageData'),  
	async = require('async'), 
	findComparisonObjects = require('./findComparisonObjects');

var scrapeShopRite = scraper.extend({

	config: {
		storeName: "Shop Rite" 
	}, 

	collectAllProducts: function (data, resultsObj, dateParser) {
		
		data.map(function (page) {
			if (page) {
				resultsObj.startDate = resultsObj.startDate || dateParser(page.startDate);
				resultsObj.endDate = resultsObj.endDate || dateParser(page.endDate);
				
				page.products.map(function (product) {
					resultsObj.products.push(product);
				});
			}
		});

	},

	checkForDuplicatePages: function (comparisonObjects) {
		var firstProduct = comparisonObjects[0].products[0], 
			secondProduct = comparisonObjects[1].products[0];

		if (firstProduct.productName === secondProduct.productName && 
			firstProduct.productDescription === secondProduct.productDescription && 
			firstProduct.price === secondProduct.price && 
			firstProduct.imageUrl === secondProduct.imageUrl) {
			
			console.log("DUPLICATE PAGE DETECTED -- altering circular number.");

			var circularNumberAlternatives = {
				'1/': '2/', 
				'2/': '', 
				'': '1/'
			}; 

			var currentCircularNumber = scrapePage.getConfigData('circularNumber'), 
				newCircularNumber;

			for (var circularNumber in circularNumberAlternatives) {
				if (currentCircularNumber === circularNumber) {
					newCircularNumber = circularNumberAlternatives[circularNumber];
				}
			}

			scrapePage.setConfigData('circularNumber', newCircularNumber);
		}		
	}, 

	scrapeCircular: function (pagesArray, callback) {

		var self = this;

		async.reduce(pagesArray, [], findComparisonObjects, function (comparisonObjects) {

			self.checkForDuplicatePages(comparisonObjects);

			var pageScrapes = pagesArray.map(function (pageNumber) {
				return function (callback) { 
					console.log("SHOPRITE SCRAPER: SCRAPING PAGE " + pageNumber);
					scrapePage.scrape(pageNumber, callback);
				};
			});

			process.nextTick(function () {
				
				async.parallel(pageScrapes, function (err, pagesDataArray) {
					if (!err) {

						process.nextTick(function () {
							var circularData = new CircularPageData();
							
							self.collectAllProducts(pagesDataArray, circularData, self.parseDate);

							circularData.storeName = self.config.storeName; 

							self.assignIDsToProducts(circularData.products);
							
							// DEVELOPMENT ONLY -- Shop Rite BUG FIX
							console.log("Found " + circularData.products.length + " products in this week's " + self.config.storeName + " circular!");
							console.log("ERR: ", err);
							callback(err, circularData);
							
						});
					}				
				});		
				
			});

		});
	},

	scrape: function (data, callback) {
		
		var self = this, 
			configData = data.configData[0], 
			preferences = data.preferences[0], 
			scrapers = [this, getCircularNumberOfPages, scrapePage];

		configData.baseURL = configData.baseURL + preferences.circularPath + "/Weekly/";
		
		scrapers.forEach(function (scraper) {
			scraper.extendConfig(configData);
		});
		// BUG FIX
		console.log("SCRAPING PAGE: ", this.config.baseURL + this.config.circularNumber);
		getCircularNumberOfPages.scrape(this.config.baseURL + this.config.circularNumber, function (err, pagesArray) {
			self.scrapeCircular(pagesArray, callback);
		});

	}

});


module.exports = scrapeShopRite;
