module.exports = function (item) {
	return Object.prototype.toString.call(item).slice(8, -1);
};