module.exports = function (arr, test, desiredAmount) {
	var count = 0, result = [];

	arr.forEach(function (item) {
		if (count < desiredAmount && test(item)) {
			count++;
			return result.push(item);
		}
	});

	return result && result.length === desiredAmount ? result : false;
};