var request = require('request'), 
	async = require('async'), 
	url = require('url'), 
	scraper = require('./scraper'), 
	Product = require('./Product'), 
	_ = require('underscore');

var scrapeStopAndShop = scraper.extend({

	config: {
		storeName: "Stop And Shop", 
		urls: {
			urlForPromotionID: "http://stopandshop.shoplocal.com/StopandShop/BrowseByPage?storeid=2599015", 
			pagesDataLocation: "http://scapi.shoplocal.com/stopandshop/2012.2/json/getpromotionpages.aspx?campaignid=5e018ae35636a4e2&storeid=2599015&promotionid=", 
			baseForPagesURL: "http://scapi.shoplocal.com/stopandshop/2012.2/json/getpromotionpagelistings.aspx?campaignid=5e018ae35636a4e2&storeid=2599015&resultset=full&pageid=", 
		}, 
		parameters: {
			promotionID: null
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

	parsePageProductData: function (jsonSource) {
		
		var json = JSON.parse(jsonSource);

		return json.content.collection.shift().data;
	}, 

	collectPageProductObjects: function (src, dest, ProductConstructor) {
		
		return src.map(function (product) {
			
			dest.push(new ProductConstructor(
				product.title, 
				product.description, 
				product.price + " " + product.pricequalifier, 
				product.image
			));
		});
	}, 
	// FOR FRIDAY, FEBRUARY 6TH - CHANGE 'gatherProductData' so that it takes a configuration 
	// object with the four properties below, with an additional to be defined 'dateGetter' 
	// which will perform the productData.shift().listingstart... functionality.
	gatherPageData: function (jsonSource, dataParser, dateParser, productCollector) {
		
		var pageData = {
			startDate: '', 
			endDate: '', 
			products: []
		};

		var productData = dataParser(jsonSource);

		if (productData && productData.length > 0) {

			pageData.startDate = dateParser(productData.shift().listingstart);
			pageData.endDate = dateParser(productData.shift().listingend);

			productCollector(productData, pageData.products, Product);
		}

		return pageData;
	}, 

	getProductsFromPage: function (pageID, callback) {
		
		var self = scrapeStopAndShop;

		request(self.config.urls.baseForPagesURL + pageID, function (err, resp, body) {
			
			self.handleError(err);

			if (!err && resp.statusCode === 200) {

				var pageData = self.gatherPageData(body, self.parsePageProductData, self.parseDate, self.collectPageProductObjects);

				// DEVELOPMENT ONLY
				// console.log(pageData);
				callback(null, pageData);
			}
		});
	},

	getPageIDs: function (sourceArray, dest, key) {
		
		sourceArray.map(function (page) {

			return dest.push(page[key]);
		});
	}, 

	collectAllProducts: function (src, dest) {
		
		src.forEach(function (data) {
			dest.push(data);
		});
	}, 

	getDate: function (src, dest, type) {

		var prop = type === 'start' ? "startDate" 
			: type === 'end' ? "endDate" : void 0;

		return dest[prop] = dest[prop] || src[prop];
	}, 

	processPageDataObjects: function (pageDataArray, dest, dateProcessor, collector) {
		
		return pageDataArray.map(function (pageData) {
			
			dateProcessor(pageData, dest, 'start');
			dateProcessor(pageData, dest, 'end');

			collector(pageData.products, dest.products);
		});
	}, 

	handleCircularPageResults: function (pagesArray, callback) {
		
		var pageIDs = [], 
			self = this;

		// pagesArray.map(function (page) {
		// 	return pageIDs.push(page.pageID);
		// });
		this.getPageIDs(pagesArray, pageIDs, "pageID");

		// console.log(pageIDs);

		async.map(pageIDs, this.getProductsFromPage, function (err, results) {
			
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

			self.processPageDataObjects(results, allProducts, self.getDate, self.collectAllProducts);

			callback(allProducts);
		
		});

	},  

	scrape: function (callback) {
		
		var self = this, 
			config = this.config;

		this.getPromotionID(config.urls.urlForPromotionID, function (results) {
			
			config.parameters.promotionID = results.promotionid;

			self.getCircularPageData(config.urls.pagesDataLocation + results.promotionid, function (results) {
				
				self.handleCircularPageResults(results, callback); 
			});
		});
		 
	}

});

module.exports = scrapeStopAndShop;