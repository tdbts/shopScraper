var wireDatabaseToScrapersAndScrape = require('./wireDatabaseToScrapersAndScrape'), 
	ContentModel = require('../model/ContentModel');

module.exports = function (req, res, storeName) {
	var preferences = [],
		configData,  
		dataForScrape;

	if (req.db) {
		var model = new ContentModel(req.db);

		model.collection('scrapeConfig').getData({'storeName': storeName}, {}, function (err, data) {
			if (!err) {
				configData = data;
				
				// PLACEHOLDER UNTIL WRITE CODE FOR QUERY USING DATA FROM CLIENT
				var companyPreferences = {
					BigY: {
						storeID: '30'
					}, 
					StopAndShop: {
						storeID: '2599015'						
					}, 
					ShopRite: {
						baseURL: 'http://plan.shoprite.com/Circular/ShopRite-of-Norwich/BFDE400/Weekly/'
					}
				};

				preferences.push(companyPreferences[storeName]);

				dataForScrape = {
					configData: configData, 
					preferences: preferences
				};

				wireDatabaseToScrapersAndScrape(res, storeName, dataForScrape);
			}
		});
	}
};