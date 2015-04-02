var async = require('async'), 
	wireDatabaseToScrapersAndScrape = require('../src/wireDatabaseToScrapersAndScrape'), 
	ScrapeConfig = require('./ScrapeConfig'), 
	assembleDataForScrapes = require('./assembleDataForScrapes'), 
	getUserPreferenceForLocation = require('./getUserPreferenceForLocation'), 
	ContentModel = require('../model/ContentModel');

module.exports = function (req, res) {
	// DEVELOPMENT ONLY
	console.log("LINE 7 - req.query: \n", req.query);

	var defaultsData = JSON.parse(req.query.data);
	
	// DEVELOPMENT ONLY
	console.log("LINE 12 - defaultsData: \n", defaultsData);

	var companyModel = new ContentModel(req.db), 
		locationModel = new ContentModel(req.db),
		scrapeConfigModel = new ContentModel(req.db),  
		locationIDs;

	locationIDs = defaultsData.map(function (obj) {
		return obj.defaultLocationID;
	});

	async.parallel({
		locations: function (callback) {
			locationModel.collection('locations').getData({'storeID': {$in: locationIDs}}, {}, function (err, data) {
				if (!err) {
					callback(null, data);
				}
			});
		}, 

		scrapeConfigs: function (callback) {
			scrapeConfigModel.collection('scrapeConfig').getData({}, {}, function (err, data) {
				if (!err) {
					callback(null, data);
				}
			});
		}
	}, 

	function (err, results) {
		console.log("LINE 42 - results from querying database for locations and scrapeConfig data: \n", results);

		var dataForScrapes = assembleDataForScrapes(results.locations, results.scrapeConfigs);

		console.log("LINE 59: DATA FOR SCRAPES: \n", JSON.stringify(dataForScrapes));

		// // APPROACH #1 - USING async.map
		// DEFINITELY SEEMS FASTER, BUT WHY??
		async.map(dataForScrapes, function (data, callback) {
			wireDatabaseToScrapersAndScrape(res, data, callback);
		}, 
		function (err, results) {
			if (!err) {
				console.log("LINE 68 - results from scrapes: \n", results);
				res.json(results);
			}
		});

	});
}