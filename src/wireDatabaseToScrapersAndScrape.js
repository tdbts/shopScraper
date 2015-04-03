var storeRouteMapper = require('./storeRouteMapper');

module.exports = function (res, dataForScrape, callback) {
	// dataForScrape an object of the form: 
	// {configData: ..., preferences: ..., storeName: ...}
	var storeName = dataForScrape.storeName;

	storeRouteMapper[storeName].scrape(dataForScrape, function (err, circularData) {
		if (!err) {
			callback(null, circularData);
		}
	});

};
