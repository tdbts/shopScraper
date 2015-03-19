var ContentModel = require('../model/ContentModel'), 
	placeHolderModelData = require('../model/placeHolderModelData'), 
	storeRouteMapper = require('./storeRouteMapper');

module.exports = function (res, storeName, collectionName, propertyName) {
	
	var model = new ContentModel();
	model.setDB(placeHolderModelData);

	var allStoreConfigData = model.getData(collectionName, propertyName), 
		storeScrapeConfig = allStoreConfigData[storeName];

	storeRouteMapper[storeName].scrape(storeScrapeConfig, function (err, circularData) {
		if (!err) {
			res.json(circularData);
		}
	});

};
