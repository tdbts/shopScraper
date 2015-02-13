var Product = require('./Product');

function DomData(config) {
	this.config = config;
}

DomData.prototype.getText = function (selector, textLocation) {
	return selector.find(textLocation).text();
};

DomData.prototype.getDate = function (_$, dateType) {
	var dateLoc = this.config.date[dateType];
	
	return _$(dateLoc.element)
		.attr(dateLoc.attribute)
		.slice(dateLoc.indexes[0], dateLoc.indexes[1]);
};

DomData.prototype.getImageUrl = function (selector, imageElement, imageAttribute) {
	return selector.find(imageElement).attr(imageAttribute);
};

DomData.prototype.getProductText = function (selector, property) {
	return this.getText(selector, this.config.product[property]);
};

DomData.prototype.collectProducts = function (_$, dest) {
		
};

module.exports = DomData;