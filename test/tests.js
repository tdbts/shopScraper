// tests.js 
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

describe('Viewbase', function () {
	
	var View = require('../views/Viewbase'); 
	var testTemplate = "template";
	var testData = "data";
	
	var testResponse = {
			
		render: function (template, data) {
			if (template && data) {
				return true;
			}
		}
	};

	it("Should should create an object with response, template, extend and render properties.", function () {
		
		var v = new View(testResponse, testTemplate);

		should.exist(v.response);
		should.exist(v.template);
		should.exist(v.extend);
		should.exist(v.render);
	});

	it("Should have two methods, 'extend' and 'render.'", function () {
		
		var v = new View(testResponse, testTemplate);

		expect(v.extend).to.be.a('function');
		expect(v.render).to.be.a('function');
	});

});