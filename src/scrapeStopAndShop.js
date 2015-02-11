var request = require('request'), 
	async = require('async'), 
	url = require('url'), 
	scraper = require('./scraper'),  
	Product = require('./Product'),  
	UrlCreator = require('./UrlCreator'), 
	_ = require('underscore');

var urlConfigs = {
	forPromotionID: ['webpage', 'forPromotionID', ['storeid']], 
	forPagesData: ['api', 'forPageData', ['campaignid', 'storeid', 'promotionid']], 
	forProductData: ['api', 'forProductData', ['campaignid', 'storeid', 'resultset', 'pageid']], 
};

var urlFragments = {
	host: {
		webpage: 'stopandshop.shoplocal.com', 
		api: 'scapi.shoplocal.com'
	}, 
	pathname: {
		forPromotionID: '/StopandShop/BrowseByPage', 
		forPageData: '/stopandshop/2012.2/json/getpromotionpages.aspx', 
		forProductData: '/stopandshop/2012.2/json/getpromotionpagelistings.aspx'
	}, 
	parameters: {
		campaignid: '5e018ae35636a4e2', 
		storeid: '2599015', 
		resultset: 'full', 
		pageid: null, 
		promotionid: null
	}
};

var stopAndShopURLs = new UrlCreator(urlConfigs, urlFragments);


var scrapeStopAndShop = scraper.extend({

	config: {
		storeName: "Stop And Shop", 
		dataProcessors: {
			jsonSource: null, 
			dataParser: function () {
				return scrapeStopAndShop.locateAndParsePageData.apply(scrapeStopAndShop, arguments);
			}, 
			dateGetter: function () {
				return scrapeStopAndShop.getDateFromPage.apply(scrapeStopAndShop, arguments);
			}, 
			dateParser: function () {
				return scrapeStopAndShop.parseDate.apply(scrapeStopAndShop, arguments);
			}, 
			productCollector: function () {
				return scrapeStopAndShop.collectPageProductObjects.apply(scrapeStopAndShop, arguments);
			}
		}
	}, 

	getQueryObject: function (objLocation) {
		
		return url.parse(objLocation, true).query;
	}, 

	getPromotionID: function (promotionIDurl, callback) {

		var self = this;

		request(promotionIDurl, function (err, resp) {
			
			self.handleError(err, "An error occured getting this " + self.config.storeName + " location's  promotion ID number.");

			if (!err && resp.statusCode >= 300 && resp.statusCode < 400) {

				// DEVELOPMENT ONLY
				// console.log(resp.statusCode);
				// console.log(resp.toJSON());

				var queryObj = self.getQueryObject(resp.headers.location);
				
				// DEVELOPMENT ONLY
				// console.log(queryObj);

				var promotionIDobj = _.pick(queryObj, 'promotionid');
				// DEVELOPMENT ONLY
				// console.log(promotionIDobj);

				callback(promotionIDobj);
			}
		});

	},

	PageMetadataObject: function (pageID, endDate, image) {
		this.pageID = pageID; 
		this.endDate = endDate; 
		this.image = image;
	}, 

	getPageMetadata: function (dataSource, dataParser, MetadataObjConstructor) {
		
		var pageMetadataSource = dataParser(dataSource), 
			circularPagesData = [];

		pageMetadataSource.map(function (page) {
			circularPagesData.push(new MetadataObjConstructor(page.pageid, page.enddate, page.imageurl));
		});

		return circularPagesData; 
	}, 

	getCircularPageData: function (circularPageDataURL, callback) {
		
		var self = this;

		request(circularPageDataURL, function (err, resp, body) {
			
			self.handleError(err, "There was an error getting the circular page metadata.");

			if (!err && resp.statusCode === 200) {

				// DEVELOPMENT ONLY
				// console.log(body)

				var circularPagesData = self.getPageMetadata(body, self.config.dataProcessors.dataParser, self.PageMetadataObject);

				// DEVELOPMENT ONLY
				// console.log("Found " + circularPagesData.length + " pages!");
				// console.log(circularPagesData);

				callback(circularPagesData);
			}
		});
	},

	locateAndParsePageData: function (jsonSource) {
		
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

	getDateFromPage: function (productDataArray, type) {

		var prop = type === 'start' ? "listingstart" 
			: type === 'end' ? "listingend" : void 0;

		return productDataArray.shift()[prop];

	}, 

	CircularPageData: function (startDate, endDate, products) {
		this.startDate = startDate || '';
		this.endDate = endDate || '';
		this.products = products || [];
	}, 

	gatherPageData: function (config, PageDataConstructor) {
		
		var pageData = new PageDataConstructor(),
			productData = config.dataParser(config.jsonSource);

		if (productData && productData.length > 0) {

			pageData.startDate = config.dateParser(config.dateGetter(productData, 'start'));
			pageData.endDate = config.dateParser(config.dateGetter(productData, 'end'));

			config.productCollector(productData, pageData.products, Product);
		}

		return pageData;
	}, 

	getProductsFromPage: function (pageID, callback) {
		
		var self = scrapeStopAndShop;

		var pageURL = stopAndShopURLs.getUrl('forProductData', function (obj) {
			return obj.query.pageid = pageID;
		});

		request(pageURL, function (err, resp, body) {
			
			self.handleError(err, "There was a problem getting products from page: " + pageID);

			if (!err && resp.statusCode === 200) {

				var config = self.config.dataProcessors;
				config.jsonSource = body;

				var pageData = self.gatherPageData(config, self.CircularPageData);

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

	asyncMapOverData: function (arr, func, resultHandler, callback) {
		
		var self = this;

		return async.map(arr, func, function (err, results) {
			
			self.handleError(err, "There was an error asynchronously mapping over the data!");

			resultHandler(results, callback);
		});
	}, 

	coordinatePageDataProcessing: function (pageDataArray, callback) {
		
		var self = scrapeStopAndShop;
		
		// DEVELOPMENT ONLY
		// console.log(pageDataArray);
		console.log("Found " + pageDataArray.length + " pages for this week's sales!");

		var allProducts = new scrapeStopAndShop.CircularPageData();

		self.processPageDataObjects(pageDataArray, allProducts, self.getDate, self.collectAllProducts);

		self.logScrapeResults(allProducts.products);

		callback(allProducts);
	}, 

	handleCircularPageData: function (pagesArray, callback) {
		
		var pageIDs = []; 

		this.getPageIDs(pagesArray, pageIDs, "pageID");

		this.asyncMapOverData(pageIDs, this.getProductsFromPage, this.coordinatePageDataProcessing, callback);

	},  

	scrape: function (callback) {
		
		var self = this, 
			urlForPromotionID = stopAndShopURLs.getUrl('forPromotionID');

		this.getPromotionID({url: urlForPromotionID, followRedirect: false}, function (results) {
			
			var urlForPagesData;

			stopAndShopURLs.addFragment('parameters', {promotionid: results.promotionid});

			urlForPagesData = stopAndShopURLs.getUrl('forPagesData');
			
			self.getCircularPageData(urlForPagesData, function (results) {
				
				self.handleCircularPageData(results, callback); 
			});
		});
		 
	}

});

module.exports = scrapeStopAndShop;