var getType = require('./getType'), 
	findElementsThatPass = require('./findElementsThatPass');

var isObjWithProducts = function (item) {
	return (getType(item) === "Object") && item.products;
};

module.exports = function (arr) {
	return findElementsThatPass(arr, isObjWithProducts, 2);
};