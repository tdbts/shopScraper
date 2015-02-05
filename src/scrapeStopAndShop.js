var request = require('request'), 
	async = require('async'), 
	url = require('url'), 
	scraper = require('./scraper'), 
	_ = require('underscore');

var scrapeStopAndShop = scraper.extend({

	config: {
		urls: {
			urlForPromotionID: "http://stopandshop.shoplocal.com/StopandShop/BrowseByPage?storeid=2599015", 
			pagesDataLocation: "http://scapi.shoplocal.com/stopandshop/2012.2/json/getpromotionpages.aspx?campaignid=5e018ae35636a4e2&storeid=2599015&promotionid=", 
			baseForPagesURL: "http://scapi.shoplocal.com/stopandshop/2012.2/json/getpromotionpagelistings.aspx?campaignid=5e018ae35636a4e2&storeid=2599015&resultset=full&pageid=", 
		}, 
		parameters: {
			promotionID: null
		}, 
		dateIndexes: {
			startDate: [0, 10], 
			endDate: [0, 10]
		}
	}, 

	setConfigValue: function (key, value) {
		if (key) {
			return key = value;
		} 
	}, 

	getPromotionID: function (promotionIDurl, callback) {

		request({url: this.config.urls.urlForPromotionID, followRedirect: false}, function (err, resp) {
			
			if (!err && resp.statusCode >= 300 && resp.statusCode < 400) {

				// DEVELOPMENT ONLY
				// console.log(resp.statusCode);
				// console.log(resp.toJSON());
				var queryObj = url.parse(resp.headers.location, true).query;
				// DEVELOPMENT ONLY
				// console.log(queryObj);

				var promotionIDobj = _.pick(queryObj, 'promotionid');
				// DEVELOPMENT ONLY
				// console.log(promotionIDobj);

				callback(promotionIDobj);
			}
		});

	}, 

	getCircularPageData: function (circularPageDataURL, callback) {
		
		var self = this;

		request(circularPageDataURL, function (err, resp, body) {
			
			self.handleError(err, "There was an error making the URL request.");

			if (!err && resp.statusCode === 200) {

				// DEVELOPMENT ONLY
				// console.log(body)

				var json = JSON.parse(body), 
					circularPagesData = [];

				json.content.collection[0].data.map(function (page) {
					circularPagesData.push({
						pageID: page.pageid, 
						endDate: page.enddate, 
						image: page.imageurl 
					});
				});

				// DEVELOPMENT ONLY
				console.log("Found " + circularPagesData.length + " pages!");
				// console.log(circularPagesData);

				callback(circularPagesData);
			}
		});
	},

	getProducts: function (pageID, callback) {
		
		var self = scrapeStopAndShop;

		request(self.config.urls.baseForPagesURL + pageID, function (err, resp, body) {
			
			self.handleError(err);

			if (!err && resp.statusCode === 200) {

				// DEVELOPMENT ONLY	
				// console.log(body)
				var json = JSON.parse(body);

				var pageData = {
					startDate: '', 
					endDate: '', 
					products: []
				};

				// DEVELOPMENT ONLY
				// console.log(json.content.collection[0].data);
				var productData = json.content.collection[0].data;

				if (productData && productData.length > 0) {
					var dateIndexes = self.config.dateIndexes;
					pageData.startDate = productData[0].listingstart.slice(dateIndexes.startDate[0], dateIndexes.startDate[1]);
					pageData.endDate = productData[0].listingend.slice(dateIndexes.endDate[0], dateIndexes.endDate[1]);

					productData.map(function (product) {
						pageData.products.push({
							productName: product.title, 
							productDescription: product.description || "No description provided.", 
							price: product.price + " " + product.pricequalifier, 
							imageUrl: product.image 
						});
					});
				}

				// DEVELOPMENT ONLY
				// console.log(pageData);
				callback(null, pageData);
			}
		});
	},

	handleCircularPageResults: function (pagesArray, callback) {
		
		var pageIDs = [], 
			self = this;

		pagesArray.map(function (page) {
			return pageIDs.push(page.pageID);
		});

		// console.log(pageIDs);

		async.map(pageIDs, this.getProducts, function (err, results) {
			
			self.handleError(err, "There was an error mapping over the page IDs!");

			// DEVELOPMENT ONLY
			// console.log(results);
			console.log("Found " + results.length + " pages for this week's sales!");
			console.log(results.map(function (page) {
				return page.products.length;
			}));

			var allProducts = {
				startDate: '', 
				endDate: '', 
				products: []
			};

			results.map(function (pageData) {
				allProducts.startDate = allProducts.startDate || pageData.startDate;
				allProducts.endDate = allProducts.endDate || pageData.endDate;

				pageData.products.forEach(function (data) {
					allProducts.products.push(data);
				});
			});

			callback(allProducts);
		
		});

	},  

	scrape: function (callback) {
		
		var self = this, 
			config = this.config;

		this.getPromotionID(config.urls.urlForPromotionID, function (results) {
			
			self.setConfigValue(config.parameters.promotionID, results.promotionid);

			self.getCircularPageData(config.urls.pagesDataLocation + results.promotionid, function (results) {
				
				self.handleCircularPageResults(results, callback); 
			});
		});
		 
	}

});


module.exports = scrapeStopAndShop;