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
	// For Stop & Shop's server API, path to images contains a piece that looks like: 
	// "/dyn_li/60.0.75.0/".  The "60" means that a 60x60 px image of the product is 
	// returned, which becomes a poor quality image when blown up to 200x200 or so.  
	// This method replaces that url path so that we grab a 200x200 px image instead.  
	return str.replace(/li\/[0-9][0-9]./, "li/200.");
};

PageParser.prototype.collectPageProductObjects = function (src, dest, ProductConstructor) {
	var self = this;

	return src.map(function (product) {
		// Futureproofing: This method knows too much about what the ProductConstructor requires.  
		// What if one day we want to use different ProductConstructors to 
		// grab different data depending on the particular product??  It might be better to 
		// simply pass in a config object to the ProductConstructor so that different 
		// constructors can be used (not only ones that take title, description, price and 
		// image properties).
		dest.push(new ProductConstructor(
			product.title, 
			product.description, 
			// Might want to check for 'fineprint' property of JSON data, and if it 
			// exists, append it to either the description or the price properties.
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