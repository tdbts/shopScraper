var chai = require('chai'), 
	expect = chai.expect;

// Testing '../../src/sp_getPagesMetadata.js'
describe("Module to get Metadata from Pages.", function () {
	
	var getPagesMetadata = require('../../src/sp_getPagesMetadata');

	it("Should be able to instantiate a new PageMetadataObject.", function () {
		
		var testMetadataObj = new getPagesMetadata.PageMetadataObject('123', '02/27/2015');

		expect(testMetadataObj.pageID).to.equal('123');
		expect(testMetadataObj.endDate).to.equal('02/27/2015');	
	
	});

	it("Should be able to parse the page's metadata.", function () {
		
		var fakeJson = JSON.stringify({
			content: {
				collection: [{
					data: [
					{
						pageid: '12345', 
						enddate: '02/29/2016', 
						imageurl: '/fake/picture/location.jpg'
					}, 
					{
						pageid: '11367', 
						enddate: '01/01/1900', 
						imageurl: '/another/fake/pic.jpg'
					}]
				}]
			}
		});

		var self = getPagesMetadata;
		var metadata = self.parsePagesMetadata(fakeJson, self.locateAndParsePageData, self.PageMetadataObject);

		expect(metadata).to.be.an('object');
		expect(metadata.data[1].pageID).to.equal('11367');
	
	});

	it("Should return an error if the request fails.", function () {
		
		var result = getPagesMetadata.handlePagesMetadata("Test error", null);

		expect(result).to.throw;
	
	});

});