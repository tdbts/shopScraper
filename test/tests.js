// tests.js 
var chai = require('chai'),
	sinon = require('sinon'), 
	nock = require('nock'), 
	expect = chai.expect,
	should = chai.should(); 

// Testing '../views/Viewbase.js'
describe('Viewbase constructor', function () {
	
	var View = require('../views/Viewbase'); 
	var testTemplate = "template";
	var testData = "data";
	
	var testResponse = {
			
		render: function (template, data) {
			
			if (template && data) {
				return true;
			}
		}
	};

	var v = new View(testResponse, testTemplate);
	
	it("Should should create an object with response, template, extend and render properties.", function () {
		
		expect(v.response).to.exist;
		expect(v.template).to.exist;
		expect(v.extend).to.exist;
		expect(v.render).to.exist;


	});

	it("Should have two methods, 'extend' and 'render.'", function () {
		
		expect(v.extend).to.be.a('function');
		expect(v.render).to.be.a('function');
	});

	it("Should render a template when the render method is called.", function () {
		
		expect(v.render(testData)).to.be.true;
	});

	it("Should be extensible.", function () {
		
		var child = v.extend({
			template: "new template", 
			foo: "bar", 
			ping: function () {}
		});

		expect(child.prototype.foo).to.exist.and.equal("bar");
		expect(child.prototype.ping).to.exist.and.be.a('function');
		expect(child.response).to.not.exist;
		expect(child.prototype.template).to.exist.and.equal("new template");
		expect(child.prototype.extend).to.exist.and.be.a('function');
		expect(child.prototype.render).to.exist.and.be.a('function');
	});

});

// Testing '../src/Product.js'
describe("Product constructor", function () {
	
	var Product = require('../src/Product.js');
	
	it("Should create a new Product instance.", function () {
		
		var apple = new Product("Macintosh Apples", "Yummy and scrumptious", "12 for $1", '../img/appleImage.jpg');

		expect(apple.productName).to.equal("Macintosh Apples");
		expect(apple.productDescription).to.equal("Yummy and scrumptious");
		expect(apple.price).to.equal("12 for $1");
		expect(apple.imageUrl).to.equal('../img/appleImage.jpg');
		
	});

	it("Should fall back to default description value if one is not found.", function () {
		
		var chips = new Product("Lay's Potato Chips", "", "$2.99", '../img/laysPotatoChips.jpg');

		expect(chips.productDescription).to.equal("No Description Provided");
		expect(chips.price).to.equal("$2.99");
	});

});

// Testing '../src/requester.js'
describe("Requester Object", function () {
	
	var requester = require('../src/requester');

	it("Should be extensible.", function () {
		
		var childObj = {
			prop1: "value1", 
			prop2: function () {
				return "value2";
			}, 
			scrape: function () {
				return "Scrape successful!";
			}
		};

		var extension = requester.extend(childObj);

		expect(extension).to.have.a.property('prop1');
		expect(extension.prop2).to.be.a('function');
		expect(extension.scrape()).to.equal("Scrape successful!");

	});	

	it("Should make a request.", function () {
		
		var processorSpy = sinon.spy(), 
			urlNock = nock('http://www.twitter.com')
				.get('/')
				.reply(200, "Wus good, man!");

		var fakeHandler = function (err, resp) {

			if (!err && resp.statusCode === 200) {
				return resp.body;
			}
		};

		requester.makeRequest('http://www.twitter.com', fakeHandler, function (err, result) {
			return expect(result).to.equal("Wus good, man!");
		});
	
	});

	it("Should handle errors.", function () {
		
		expect(requester.handleError("Test Error", "Scraper returned an error: ")).to.throw;
	});	

	it("Should return the request module in order to create new request-oriented methods.", function () {
		
		var result = requester.getRequester(), 
			request = require('request');

		expect(result).to.equal(request);
	
	});

});

// Testing '../src/scraper.js'
describe("Scraper Base Object", function () {
	
	var scraper = require('../src/scraper');

	it("Should return the store name.", function () {
		
		var testScraper = scraper.extend({
			config: {
				storeName: "Try N' Save"
			}
		});

		expect(testScraper.getStoreName()).to.equal("Try N' Save");
	});

	it("Should locate and parse desired data, given json source.", function () {
		
		var fakeJson = JSON.stringify({
					content: {
						collection: [{data: ["data1", "data2"]}]
					}
				});

		var result = scraper.locateAndParsePageData(fakeJson);

		expect(result).to.be.an('array');
		expect(result).to.have.length(2);
		expect(result[0]).to.equal("data1");
	
	});

	it("Should log the results of the scrape.", function () {
		
		var products = ["thing1", "thing2"], 
			testScraper = scraper.extend({
				config: {
					storeName: "My Store"
				}
			});

		var testLog = sinon.stub(console, "log", function (input) {
			return input;
		});

		testScraper.logScrapeResults(products);

		expect(testLog.called).to.be.true;
		expect(testLog.args[0][0]).to.equal("Scraped 2 products from this week's My Store circular!");

		testLog.restore();

	});
	
	it("Should parse and standardize dates.", function () {
		
		expect(scraper.parseDate("2015/2/6")).to.equal("Friday, February 6th 2015");
		expect(scraper.parseDate("02/06/2015")).to.equal("Friday, February 6th 2015")
		expect(scraper.parseDate("2015-08-03")).to.equal("Monday, August 3rd 2015");
		expect(scraper.parseDate("8/3/2015")).to.equal("Monday, August 3rd 2015");

	});

});

// Testing '../src/scrapeBigY.js'
describe("Big Y Scraper", function () {
	
	var scrapeBigY = require('../src/scrapeBigY');

	it("Should slice out start and end dates from data object.", function () {
		
		var mockDates = {StartDate: "02/27/1987", EndDate: "08/21/1988", wrongDate: "04/24/2000"}, 
			startDate = scrapeBigY.getDate(mockDates, 'start'), 
			endDate = scrapeBigY.getDate(mockDates, 'end');
		// PROBLEM

		expect(startDate).to.equal("Friday, February 27th 1987");	
		expect(endDate).to.equal("Sunday, August 21st 1988");
	});

	it("Given JSON data consisting of an array with a single container object, it should return the container object.", function () {
		
		var mockJSON = JSON.stringify([{prop1: "value1", prop2: 32}]), 
			containerObj = scrapeBigY.locateAndParsePageData(mockJSON);

		expect(containerObj).to.be.an('object');
		expect(containerObj.prop1).to.exist.and.equal("value1");
		expect(containerObj.prop2).to.exist.and.equal(32);
	});

	it("Should return a new product instance, given a source object.", function () {
		
		var Product = require('../src/Product'), 
			mockSource = {
				ProductName: "Jiff", 
				ProductDescription: "Best peanut butter", 
				Price: "$2.99", 
				ImageUrl: '../img/pb-jiff.jpeg'
			};

		var instance = scrapeBigY.getProductData(mockSource, Product);

		expect(instance).to.be.an('object');
		expect(instance.productName).to.equal("Jiff");	
	});

	it("Should map over circular data to get product information.", function () {
		
		var destination = []; 
		var mockCircularData = {
			CS_Page: [{
				SaleItems: ["bananas", "Cheerios", "bacon"]
			}]
		};
		var mockProductHandler = function (item, product) {
			return item;
		};

		scrapeBigY.getProducts(mockCircularData, destination, mockProductHandler);
		
		expect(destination.length).to.equal(3);
		expect(destination[2]).to.equal("bacon");

	});

	it("Should handle the results of the http request.", function () {
		
		var fakeData = JSON.stringify([
		    {
		        "CS_Page": [
		            {
		                "SaleItems": [
		                    {
		                        "ImageUrl": "http://fakeURL/products/1",
		                        "Price": "2 FOR $5.00",
		                        "ProductDescription": " 9 to 14 oz",
		                        "ProductName": " Tostitos Tortilla Chips"
		                    },
		                    {
		                        "ImageUrl": "http://fakeURL/products/2",
		                        "Price": "4 FOR $10.00 With Your Card",
		                        "ProductDescription": "Cabot, Assorted Varieties",
		                        "ProductName": "Sargento Shredded Cheese"
		                    }
		                ]
		            },
		        ],
		        "EndDate": "2015-02-04T00:00:00",
		        "StartDate": "2015-01-29T00:00:00"
		    }
		]);
		var fakeResponseObject = {
			statusCode: 200
		};

		// Implementing Sinon's stub and spy methods
		var testLog = sinon.stub(console, "log", function (input) {
			return input;
		});

		sinon.spy(scrapeBigY, "logScrapeResults");

		var circularData = scrapeBigY.handleRequestResults(null, fakeResponseObject, fakeData);

		expect(circularData.startDate).to.equal("Thursday, January 29th 2015");
		expect(circularData.products.length).to.equal(2);
		expect(circularData.products[0].imageUrl).to.equal("http://fakeURL/products/1");
		expect(scrapeBigY.logScrapeResults.called).to.be.true;

		// Restore environment
		scrapeBigY.logScrapeResults.restore();
		testLog.restore();
	});

});

// Testing '../src/CacheDataLocator.js'
describe("CacheDataLocator Constructor", function () {
	
	var CacheDataLocator = require('../src/CacheDataLocator'),
		testCDL = new CacheDataLocator("placeOne", "placeTwo", ["param1", "param2"]);

	it("Should return an object.", function () {
		
		expect(testCDL.host).to.equal("placeOne");
		expect(testCDL.pathname).to.equal("placeTwo");
		expect(testCDL.parameters).to.be.an('array');
		expect(testCDL.parameters[0]).to.equal("param1");
	
	});

});

// Testing '../src/UrlObject.js'
describe("UrlObject Constructor", function () {
	
	var UrlObject = require('../src/UrlObject'), 
		CacheDataLocator = require('../src/CacheDataLocator');

	var testCache = {
		host: {
			webpage: 'fake.webpage.com', 
			api: 'not.real.api.com'
		}, 
		pathname: {
			forPromotionID: '/some/pathname', 
			forPageData: '/another/nonexistent/path.aspx', 
			forProductData: '/fake/pathname.aspx'
		}, 
		parameters: {
			campaignid: 'de34c36a', 
			storeid: '123456', 
			resultset: 'full', 
			pageid: null, 
			promotionid: null
		}
	};

	it("Should return an object when invoked.", function () {
		
		var testObj = new UrlObject("testHostName", "testPathName", {testQueryProp: "testQueryValue"});

		expect(testObj).to.be.an('object');
		expect(testObj.host).to.equal("testHostName");
		expect(testObj.query).to.be.an('object').and.have.a.property("testQueryProp");
	});

	it("Should fall back to default values if arguments are not provided.", function () {
		
		var testObj = new UrlObject("SuperHost");

		expect(testObj.pathname).to.equal('');
		expect(testObj.query).to.be.null;
	});

	it("Should get and set values given a cache object and an object of keys.", function () {
		
		var testObj = new UrlObject(), 
			urlSettings = new CacheDataLocator("webpage", "forProductData", ['campaignid', 'storeid']);
		
		testObj.getConfigAndSetValues(testCache, urlSettings);

		expect(testObj.protocol).to.equal('http:');
		expect(testObj.host).to.equal('fake.webpage.com');
		expect(testObj.pathname).to.equal('/fake/pathname.aspx');
		expect(testObj.query).to.be.an('object');
		expect(testObj.query.storeid).to.equal('123456');
	});

	it("It should allow the user to add/modify properties of the object.", function () {
		
		var testObj = new UrlObject(), 
			urlSettings = new CacheDataLocator("webpage", "forProductData", ['storeid', 'pageid']);

		testObj.getConfigAndSetValues(testCache, urlSettings);
		expect(testObj.query.pageid).to.be.null;

		testObj.query.pageid = "98765";
		expect(testObj.query.pageid).to.equal("98765");
	
	});

	it("Should throw an error if the key does not exist in the cache.", function () {
		
		var testObj = new UrlObject(), 
			urlSettings = new CacheDataLocator("nonexistent", "notThere", ['nothing']);

		expect(testObj.getConfigAndSetValues(testCache, urlSettings)).to.throw;
	
	});

	it("Should return an object that can be parsed by the url module into a URL string.", function () {
		
		var url = require('url'), 
			testObj = new UrlObject(), 
			urlSettings = new CacheDataLocator("webpage", "forProductData", ['campaignid', 'storeid']), 
			urlObject = testObj.getConfigAndSetValues(testCache, urlSettings), 
			testURL = url.format(urlObject);

		expect(testURL).to.equal("http://fake.webpage.com/fake/pathname.aspx?campaignid=de34c36a&storeid=123456");
		
	});

});


// Testing '../src/UrlCreator.js'
describe("URL Creator Module", function () {
	
	var UrlCreator = require('../src/UrlCreator'), 
		testConfigs = {
			forStorePage: ['webpage', 'forPageData', ['campaignid', 'storeid']], 
			forProductCollection: ['api', 'forProductData', ['campaignid', 'storeid', 'resultset', 'pageid']]
		}, 
		testFragments = {
			host: {
				webpage: 'fakeblog.notreal.com', 
				api: 'norealdata.togiveyou.com'
			}, 
			pathname: {
				forPageData: '/NoRealPagesHere/BrowseByPage', 
				forProductData: '/EmptyStore/NothingHere'
			}, 
			parameters: {
				campaignid: '3d2c5a7a324badf2', 
				storeid: '543210', 
				resultset: 'full', 
				pageid: null
			}
		};

	var testCreator = new UrlCreator(testConfigs, testFragments);
	// console.log(testCreator);
	it("Should be able to store data upon construction.", function () {
		
		expect(testCreator.configs).to.exist.and.equal(testConfigs);
		expect(testCreator.fragments).to.exist.and.equal(testFragments);
	
	});

	it("Should be able to add data to its cache.", function () {

		var fakeNewConfig = ['api', 'forPageData', ['campaignid', 'resultset']];
			fakeNewPathnameObj = {forNothing: '/FakeNewPath/Nowhere.aspx'}, 
			fakeNewParameters = {
				userid: 'tdbts', 
				secretNumber: '718'
			};

		testCreator.addConfig('thirdConfig', fakeNewConfig);

		expect(testCreator.configs.thirdConfig).to.equal(fakeNewConfig);		
		
		testCreator.addFragment('pathname', fakeNewPathnameObj);
		testCreator.addFragment('parameters', fakeNewParameters);

		expect(testCreator.fragments.pathname.forNothing).to.equal(fakeNewPathnameObj.forNothing);
		expect(testCreator.fragments.parameters.userid).to.equal(fakeNewParameters.userid);
		expect(testCreator.fragments.parameters.secretNumber).to.equal(fakeNewParameters.secretNumber);
		
	});

	it("Should throw an error if the given url role does not exist.", function () {
		
		expect(testCreator.addFragment('nonexistentUrlPiece', {name: "val"})).to.throw;
	
	});

	it("Should be able to construct a url object from its data.", function () {
		
		var resultURL = testCreator.getUrl('forStorePage');

		expect(resultURL).to.equal("http://fakeblog.notreal.com/NoRealPagesHere/BrowseByPage?campaignid=3d2c5a7a324badf2&storeid=543210");
	
	});

	it("Should be able to modify its data when necessary for the url construction.", function () {
		
		var fakePageID = '8675309', 
			resultURL = testCreator.getUrl('forProductCollection', function (urlObj) {
				return urlObj.query.pageid = fakePageID;
			});

		expect(resultURL).to.equal("http://norealdata.togiveyou.com/EmptyStore/NothingHere?campaignid=3d2c5a7a324badf2&storeid=543210&resultset=full&pageid=8675309");
	
	});

});

// Testing '../src/CacheForPagesMetadata.js'
describe("Cache for pages metadata object.", function () {

	var CacheForPagesMetadata = require('../src/CacheForPagesMetadata'), 
		testMetadataCache = new CacheForPagesMetadata();

	it("Should create an object with a property data which holds an array.", function () {
		
		expect(testMetadataCache.data).to.be.an('array');

	});

	it("Should return the page IDs of its contained metadata.", function () {
		
		testMetadataCache.data.push({pageID: "12345"}, {pageID: "8675309"});

		var ids = testMetadataCache.getPageIDs();

		expect(ids).to.be.an('array').and.have.length(2);
		expect(ids[1]).to.equal("8675309");
	
	});

});


// Testing '../src/CircularPageData.js'
describe("Constructor for circular page data.", function () {
	
	var CircularPageData = require('../src/CircularPageData');

	it("Should create an object with three properties.", function () {
		
		var testDataObj = new CircularPageData("02/12/2015", "02/19/2015", ["chips", "soda"]);	
		
		expect(testDataObj.startDate).to.equal("02/12/2015");
		expect(testDataObj.products).to.be.an('array').and.have.length(2);
		expect(testDataObj.products[1]).to.equal("soda");
	});

	it("Should fall back to default values if none are provided.", function () {
		
		var testDataObj = new CircularPageData();

		expect(testDataObj.startDate).to.equal('');
		expect(testDataObj.products).to.be.an('array').and.have.length(0);
	
	});

});


// Testing '../src/sp_getPromotionID.js'
describe("Module to get Stop and Shop Promotion ID.", function () {
	
	var getPromotionID = require('../src/sp_getPromotionID');
	var fakeResponse = {
		statusCode: 304, 
		headers: {
			location: "http://www.fakesite.com/path/to/data?param1=monkey&promotionid=11105"
		}
	};

	it("Should have a config property containing an object with a storeName property.", function () {
		
		expect(getPromotionID.config.storeName).to.equal("Stop and Shop");
	
	});

	it("Should be able to get the query object of a url.", function () {
		
		var testURL = "http://www.fakesite.com/path/to/data?param1=turtle&param2=123", 
			queryObj = getPromotionID.getQueryObject(testURL);

		expect(queryObj).to.be.an('object');
		expect(queryObj.param1).to.equal("turtle");
		expect(queryObj.param2).to.equal("123");
	
	});

	it("Should parse a request response to get the promotionID object.", function () {

		var resultObj = getPromotionID.parseRequestResults(null, fakeResponse);

		expect(resultObj).to.be.an('object');
		expect(resultObj.promotionid).to.equal("11105");
	
	});

	it("Should handle errors that occur when making the request.", function () {

		expect(getPromotionID.parseRequestResults("Test Error")).to.throw;
		expect(getPromotionID.parseRequestResults(null, fakeResponse)).to.not.throw;
		
	});

});