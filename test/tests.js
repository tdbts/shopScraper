// tests.js 
var chai = require('chai'),
	sinon = require('sinon'), 
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

// Testing '../src/scraper.js'
describe("Scraper Base Object", function () {
	
	var scraper = require('../src/scraper');

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

		var extension = scraper.extend(childObj);

		expect(extension).to.have.a.property('prop1');
		expect(extension.prop2).to.be.a('function');
		expect(extension.scrape()).to.equal("Scrape successful!");

	});

	it("Should return the store name.", function () {
		
		var testScraper = scraper.extend({
			config: {
				storeName: "Try N' Save"
			}
		});

		expect(testScraper.getStoreName()).to.equal("Try N' Save");
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

	it("Should handle errors.", function () {
		
		expect(scraper.handleError("Test Error", "Scraper returned an error: ")).to.throw;
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
			containerObj = scrapeBigY.getContainerObj(mockJSON);

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

	it("Should perform http requests and call a callback on the result.", function () {
		
		var server = sinon.fakeServer.create(), 
			testCallback = sinon.spy(), 
			request = require('request');

		server.respondWith("GET", '/api/fakeData.json', [
			200, 
			{"Content-Type": "application/json"}, 
			JSON.stringify([{"prop1": "value1", "prop2": 32}])
		]);

		scrapeBigY.urlRequest(request, '/api/fakeData.json', testCallback);
		server.respond();

		expect(testCallback.called).to.be.true;

		server.restore();

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

		var log = scrapeBigY.logScrapeResults.getCall(0);
		expect(circularData.startDate).to.equal("Thursday, January 29th 2015");
		expect(circularData.products.length).to.equal(2);
		expect(circularData.products[0].imageUrl).to.equal("http://fakeURL/products/1");
		expect(scrapeBigY.logScrapeResults.called).to.be.true;

		// Restore environment
		scrapeBigY.logScrapeResults.restore();
		testLog.restore();
	});

});

// Testing '../src/UrlObject.js'
describe("UrlObject Constructor", function () {
	
	var UrlObject = require('../src/UrlObject');

	it("Should return an object when invoked.", function () {
		
		var testObj = new UrlObject();

		expect(testObj).to.be.a('object');
	});

});