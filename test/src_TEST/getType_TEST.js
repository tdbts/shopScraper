var chai = require('chai'), 
	expect = chai.expect;

describe("Module: getType", function () {
	
	var getType = require('../../src/getType');

	it("Should return the type of any entity passed to it.", function () {
		
		var stringTest = getType("string"), 
			boolTest = getType(true), 
			objectTest = getType({prop: "one"}), 
			arrayTest = getType(["one", "two"]), 
			undefinedTest = getType(undefined), 
			numberTest = getType(3), 
			nullTest = getType(null);

		expect(stringTest).to.equal('String');
		expect(boolTest).to.equal('Boolean');
		expect(objectTest).to.equal('Object');
		expect(arrayTest).to.equal('Array');
		expect(undefinedTest).to.equal('Undefined');
		expect(numberTest).to.equal('Number');
		expect(nullTest).to.equal('Null');			
	
	});

});