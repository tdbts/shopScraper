var chai = require('chai'), 
	expect = chai.expect;

// Testing '../../src/UrlObject.js'
describe("UrlObject Constructor", function () {
	
	var UrlObject = require('../../src/UrlObject'), 
		CacheDataLocator = require('../../src/CacheDataLocator');

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