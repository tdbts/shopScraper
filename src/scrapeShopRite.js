var scraper = require('./scraper'),
	getCircularNumberOfPages = require('./sr_getCircularNumberOfPages'), 
	scrapePage = require('./sr_scrapePage'), 
	CircularPageData = require('./CircularPageData'),  
	async = require('async');

var scrapeShopRite = scraper.extend({

	config: {
		storeName: "Shop Rite" 
	}, 

	collectAllProducts: function (data, resultsObj, dateParser) {
		
		data.map(function (page) {
			resultsObj.startDate = resultsObj.startDate || dateParser(page.startDate);
			resultsObj.endDate = resultsObj.endDate || dateParser(page.endDate);
			
			page.products.map(function (product) {
				resultsObj.products.push(product);
			});
		});

	}, 

	scrapeCircular: function (pagesArray, callback) {

		var self = this;

		// Scrape the first two pages and compare the first product in each.  If the 
		// two products are the same, the pages are duplicates, so change the 
		// value for circularNumber to get the right url and retry.  
		async.map(["0", "1"], scrapePage.scrape, function (err, pagesDataArray) {

			if (!err) {
				var firstProduct = pagesDataArray[0].products[0], 
					secondProduct = pagesDataArray[1].products[0];

				if (firstProduct.productName === secondProduct.productName && 
					firstProduct.productDescription === secondProduct.productDescription && 
					firstProduct.price === secondProduct.price && 
					firstProduct.imageUrl === secondProduct.imageUrl) {
					
					console.log("DUPLICATE PAGE DETECTED -- altering circular number.");

					var currentCircularNumber = scrapePage.getConfigData('circularNumber');
					scrapePage.setConfigData('circularNumber', currentCircularNumber === "1/" ? "2/" : "1/");
				}

				async.map(pagesArray, scrapePage.scrape, function (err, pagesDataArray) {

					if (!err) {
						var circularData = new CircularPageData();
						
						self.collectAllProducts(pagesDataArray, circularData, self.parseDate);

						circularData.storeName = self.config.storeName; 

						self.assignIDsToProducts(circularData.products);
						
						console.log("Found " + circularData.products.length + " products in this week's " + self.config.storeName + " circular!");
						
						callback(err, circularData);
					}
				});						
			}
		});
	},

	scrape: function (data, callback) {
		
		var self = this, 
			scrapers = [this, getCircularNumberOfPages, scrapePage];

		scrapers.forEach(function (scraper) {
			scraper.extendConfig(data);
		});
	
		getCircularNumberOfPages.scrape(this.config.baseURL, function (err, pagesArray) {
			self.scrapeCircular(pagesArray, callback);
		});

	}

});


module.exports = scrapeShopRite;
