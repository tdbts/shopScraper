// tests.js 
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

describe('Viewbase constructor', function () {
	
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

	var v = new View(testResponse, testTemplate);
	
	it("Should should create an object with response, template, extend and render properties.", function () {
		
		expect(v.response).to.exist;
		expect(v.template).to.exist;
		expect(v.extend).to.exist;
		expect(v.render).to.exist;


	});

	it("Should have two methods, 'extend' and 'render.'", function () {
		
		expect(v.extend).to.be.a('function');
		expect(v.render).to.be.a('function');
	});

	it("Should render a template when the render method is called.", function () {
		
		expect(v.render(testData)).to.be.true;
	});

	it("Should be extensible.", function () {
		
		var child = v.extend({
			template: "new template", 
			foo: "bar", 
			ping: function () {}
		});

		expect(child.prototype.foo).to.exist.and.equal("bar");
		expect(child.prototype.ping).to.exist.and.be.a('function');
		expect(child.response).to.not.exist;
		expect(child.prototype.template).to.exist.and.equal("new template");
		expect(child.prototype.extend).to.exist.and.be.a('function');
		expect(child.prototype.render).to.exist.and.be.a('function');
	});

});