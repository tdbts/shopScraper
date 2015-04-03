var chai = require('chai'), 
	expect = chai.expect, 
	nock = require('nock');

// Testing '../../src/sp_getPromotionID.js'
describe("Module to get Stop and Shop Promotion ID.", function () {
	
	var getPromotionID = require('../../src/sp_getPromotionID');
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

// ** QUARANTINE **
	// it("Should be able to make a request that does not follow redirect and which calls parseRequestResults on the result.", function () {
		
	// 	var fakeURL = 'http://redirecter.com';

	// 	nock(fakeURL)
	// 		.get('/')
	// 		.reply(302, "Fake response here", {
	// 			'Location': 'http://fakeassredirecter.com/New/Path?promotionid=98765'
	// 		})
	// 		.get('/New/Path')
	// 		.reply(200, "Here is the result from the redirect.");

	// 	getPromotionID.scrape({url: fakeURL, followRedirect: false}, function (err, resultObj) {

	// 		if (expect(resultObj).to.be.an('object') && expect(resultObj.promotionid).to.equal("98765")) {
	// 			return true;
	// 		}
	// 	});

	// 	nock.restore();

	// });
// ** QUARANTINE **

});