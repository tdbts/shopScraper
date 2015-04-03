var chai = require('chai'), 
	expect = chai.expect;

// Testing '../../src/CircularPageData.js'
describe("Constructor for circular page data.", function () {
	
	var CircularPageData = require('../../src/CircularPageData');

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