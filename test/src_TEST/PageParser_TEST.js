var chai = require('chai'), 
	expect = chai.expect;

// Testing '../../src/PageParser.js'
describe("Stop and Shop Page Parsing Constructor Module", function () {
	
	var PageParser = require('../../src/PageParser');
	var fakeData = JSON.stringify({
		content: {
			collection: [{
				data: [
					{
						'listingstart': "02/27/2015", 
						'listingend': "03/06/2015", 
						'title': "Twix Candy Bars", 
						'description': "The only candy with the cookie crunch", 
						'price': "$1.50", 
						'pricequalifier': "With your card", 
						'image': "/img/twix.jpg"	
					}
				]
			}]
		}
	});

	it("Should create an object with a data property.", function () {
		
		var testPage = new PageParser(fakeData);

		expect(testPage.data).to.exist.and.be.a('string');
	
	});

	it("Should get the dates from the product array.", function () {
		
		var testStart = [{'listingstart': "02/27/2015"}];
		var testEnd = [{'listingend': "03/06/2015"}];

		expect(new PageParser().getDateFromPage(testStart, 'start')).to.equal("02/27/2015");
		expect(new PageParser().getDateFromPage(testEnd, 'end')).to.equal("03/06/2015");
	
	});

	it("Should parse the data to return an object of desired information.", function () {
		
		var testParser = new PageParser(fakeData), 
			resultData = testParser.getPageData();
		
		expect(resultData).to.be.an('object');
		expect(resultData.startDate).to.equal("Friday, February 27th 2015");
		expect(resultData.products[0].productDescription).to.equal("The only candy with the cookie crunch");
	
	});

});