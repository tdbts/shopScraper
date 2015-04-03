var chai = require('chai'), 
	expect = chai.expect;

// Testing '../../src/CacheDataLocator.js'
describe("CacheDataLocator Constructor", function () {
	
	var CacheDataLocator = require('../../src/CacheDataLocator'),
		testCDL = new CacheDataLocator("placeOne", "placeTwo", ["param1", "param2"]);

	it("Should return an object.", function () {
		
		expect(testCDL.host).to.equal("placeOne");
		expect(testCDL.pathname).to.equal("placeTwo");
		expect(testCDL.parameters).to.be.an('array');
		expect(testCDL.parameters[0]).to.equal("param1");
	
	});

});