var chai = require('chai'), 
	expect = chai.expect;

// Testing '../model/ContentModel.js'
describe("Model for Getting Data Needed by Scrapers", function () {
	
	var ContentModel = require('../model/ContentModel');

	it("Should set the database and return the collection using methods.", function () {
		
		var testModel = new ContentModel(), 
			testDB = {
				myData: "Trail Mix", 
				collection: function (collectionName) {
					return this[collectionName];
				}
			};

		testModel.setDB(testDB);
		testModel.collection('myData');

		expect(testModel.db).to.equal(testDB);
		expect(testModel._collection).to.equal("Trail Mix");

	});

	// NEED TO RESEARCH BEST WAY TO TEST MONGODB AND MODELS THAT INTERACT WITH IT
	// it("Should query for the data it needs from the collection.", function () {
			
	// 	var testModelOne = new ContentModel(),
	// 		testModelTwo = new ContentModel(),  
	// 		Collection = function (firstProp, secondProp) {
	// 			this.firstProp = firstProp;
	// 			this.secondProp = secondProp;
	// 		};

	// 	Collection.prototype.find = function (propName) {
	// 		return this[propName];
	// 	};

	// 	var	testDB = {
	// 			firstCollection: new Collection("one", "two"), 
	// 			secondCollection: new Collection("a", "b"), 
	// 			collection: function (collectionName) {
	// 				return this[collectionName];
	// 			}
	// 		};

	// 	testModelOne.setDB(testDB);
	// 	testModelTwo.setDB(testDB);

	// 	var firstTest = testModelOne.getData('firstCollection', 'secondProp'), 
	// 		secondTest = testModelTwo.getData('secondCollection', 'firstProp');
		
	// 	expect(firstTest).to.equal("two");
	// 	expect(secondTest).to.equal("a");

	// 	// **********
	// 	var testLog = sinon.stub(console, "log", function (input) {
	// 		return input;
	// 	});

	// 	testScraper.logScrapeResults(products);

	// 	expect(testLog.called).to.be.true;
	// 	expect(testLog.args[0][0]).to.equal("Scraped 2 products from this week's My Store circular!");

	// 	testLog.restore();
	
	// });	

});