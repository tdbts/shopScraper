var chai = require('chai'), 
	expect = chai.expect, 
	sinon = require('sinon');

// Testing '../../src/scraper.js'
describe("Scraper Base Object", function () {
	
	var scraper = require('../../src/scraper');

	afterEach(function () {
		delete scraper.config;
	});

	it("Should set a value in config object.", function () {
		
		var testScraper = scraper.extend({
			config: {}
		});

		testScraper.setConfigData('rapper', 'Jay-Z');

		expect(testScraper.config.rapper).to.equal('Jay-Z');
	});

	it("Should create the config object if it doesn't exist when setting a value.", function () {
		
		var testScraper = scraper.extend({});

		testScraper.setConfigData('favCity', 'NYC');

		expect(testScraper.config).to.exist;
		expect(testScraper.config.favCity).to.equal('NYC');	
	});

	it("Should return a value or undefined when get method invoked.", function () {
		
		var testScraper = scraper.extend({
			config: {
				eenie: 'meenie', 
				miney: 'mo'
			}
		});

		expect(testScraper.getConfigData('eenie')).to.equal('meenie');
		expect(testScraper.getConfigData('notThere')).to.be.undefined;
	});

	it("Should merge config object with a given object, creating the config object if it doesn't exist.", function () {
		
		var testScraperOne = scraper.extend({
			config: {
				propOne: "I", 
				propTwo: "love"
			}
		}), 
			testScraperTwo = scraper.extend({});

		testScraperOne.extendConfig({propThree: "NYC"});
		testScraperTwo.extendConfig({hot: "dog"});

		expect(testScraperOne.getConfigData('propThree')).to.equal("NYC");
		expect(testScraperTwo.getConfigData('hot')).to.equal("dog");
	});

	it("Should return the store name.", function () {
		
		var testScraper = scraper.extend({
			config: {
				storeName: "Try N' Save"
			}
		});

		expect(testScraper.getStoreName()).to.equal("Try N' Save");
	});

	it("Should locate and parse desired data, given json source.", function () {
		
		var fakeJson = JSON.stringify({
					content: {
						collection: [{data: ["data1", "data2"]}]
					}
				});

		var result = scraper.locateAndParsePageData(fakeJson);

		expect(result).to.be.an('array');
		expect(result).to.have.length(2);
		expect(result[0]).to.equal("data1");
	
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

});