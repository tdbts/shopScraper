var storeRouteMapper = require('./storeRouteMapper');

module.exports = function (res, storeName, dataForScrape) {

	storeRouteMapper[storeName].scrape(dataForScrape, function (err, circularData) {
		if (!err) {
			res.json(circularData);
		}
	});

};
