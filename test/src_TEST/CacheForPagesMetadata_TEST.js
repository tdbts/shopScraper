var chai = require('chai'), 
	expect = chai.expect;

// Testing '../../src/CacheForPagesMetadata.js'
describe("Cache for pages metadata object.", function () {

	var CacheForPagesMetadata = require('../../src/CacheForPagesMetadata'), 
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