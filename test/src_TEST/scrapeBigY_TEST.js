var chai = require('chai'), 
	expect = chai.expect, 
	sinon = require('sinon');

// Testing '../../src/scrapeBigY.js'
describe("Big Y Scraper", function () {
	
	var scrapeBigY = require('../../src/scrapeBigY');

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
		
		var Product = require('../../src/Product'), 
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