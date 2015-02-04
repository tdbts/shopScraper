// Data object for Products
module.exports = function (name, desc, price, img) {
	this.productName = name;
	this.productDescription = desc || "No Description Provided";
	this.price = price;
	this.imageUrl = img;
};