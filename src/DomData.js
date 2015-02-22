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

DomData.prototype.getProductData = function (currentItem) {
	var imageConfig = this.config.product.image,
		itemData = {};

	itemData.name = this.getProductText(currentItem, 'name');
	itemData.price = this.getProductText(currentItem, 'price');
	itemData.description = this.getProductText(currentItem, 'description');
	itemData.image = this.getImageUrl(currentItem, imageConfig.element, imageConfig.attribute);

	return itemData;
};

DomData.prototype.collectProducts = function (_$, dest) {
	var self = this, 
		container = self.config.product.container;

	_$(container).map(function () {
		var itemData = self.getProductData(_$(this));

		if (itemData.name && itemData.price && itemData.image) {
			dest.push(new Product(itemData.name, itemData.description, itemData.price, itemData.image));
		}	
	});

	return;
};

module.exports = DomData;