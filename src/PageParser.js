var CircularPageData = require('./CircularPageData'), 
	Product = require('./Product'), 
	scraper = require('./scraper'), 
	_ = require('underscore');

function PageParser(data) {
	this.data = data;
}

PageParser.prototype = _.pick(scraper, 'locateAndParsePageData', 'parseDate');

PageParser.prototype.getDateFromPage = function (productDataArray, type) {
	var prop = type === 'start' ? "listingstart" 
		: type === 'end' ? "listingend" : void 0;

	return productDataArray[0][prop];	
};

PageParser.prototype.getProperImageSize = function (str) {
	return str.replace(/li\/[0-9][0-9]./, "li/200.");
};

PageParser.prototype.collectPageProductObjects = function (src, dest, ProductConstructor) {
	var self = this;
	
	return src.map(function (product) {
		
		dest.push(new ProductConstructor(
			product.title, 
			product.description, 
			product.price + " " + product.pricequalifier, 
			self.getProperImageSize(product.image)
		));
	});	
};

PageParser.prototype.getPageData = function () {
	var pageData = new CircularPageData(), 
		productJsonArray = this.locateAndParsePageData(this.data);
		
	if (productJsonArray && productJsonArray.length > 0) {

		pageData.startDate = this.parseDate(this.getDateFromPage(productJsonArray, 'start'));
		pageData.endDate = this.parseDate(this.getDateFromPage(productJsonArray, 'end'));		

		this.collectPageProductObjects(productJsonArray, pageData.products, Product);
	}

	return pageData;
};

module.exports = PageParser;