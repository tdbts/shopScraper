var chai = require('chai'), 
	expect = chai.expect;

// Testing '../../src/UrlCreator.js'
describe("URL Creator Module", function () {
	
	var UrlCreator = require('../../src/UrlCreator'), 
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