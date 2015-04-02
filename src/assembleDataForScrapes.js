var getUserPreferenceForLocation = require('./getUserPreferenceForLocation'), 
	ScrapeConfig = require('./ScrapeConfig');

module.exports = function (locations, scrapeConfigs) {
	var dataForScrapes = [];

	locations.map(function (location) {
		scrapeConfigs.map(function (config) {
			var userPreference = getUserPreferenceForLocation(location);
			
			if (location.companyID === config.companyID) {
				dataForScrapes.push(new ScrapeConfig(config.storeName, [config], userPreference));
			}
		});
	});

	return dataForScrapes;
};