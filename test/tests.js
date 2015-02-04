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


describe("Product constructor", function () {
	
	var Product = require('../src/Product.js');
	
	it("Should create a new Product instance.", function () {
		
		var apple = new Product("Macintosh Apples", "Yummy and scrumptious", "12 for $1", '../img/appleImage.jpg');

		expect(apple.productName).to.equal("Macintosh Apples");
		expect(apple.productDescription).to.equal("Yummy and scrumptious");
		expect(apple.price).to.equal("12 for $1");
		expect(apple.imageUrl).to.equal('../img/appleImage.jpg');
		
	});

	it("Should fall back to default description value if one is not found.", function () {
		
		var chips = new Product("Lay's Potato Chips", "", "$2.99", '../img/laysPotatoChips.jpg');

		expect(chips.productDescription).to.equal("No Description Provided");
		expect(chips.price).to.equal("$2.99");
	});


});