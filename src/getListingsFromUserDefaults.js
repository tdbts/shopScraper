var async = require('async'), 
	wireDatabaseToScrapersAndScrape = require('../src/wireDatabaseToScrapersAndScrape'), 
	assembleDataForScrapes = require('./assembleDataForScrapes'), 
	ContentModel = require('../model/ContentModel');

module.exports = function (req, res) {
	var defaultsData = JSON.parse(req.query.data),
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
		var dataForScrapes = assembleDataForScrapes(results.locations, results.scrapeConfigs);

		async.map(dataForScrapes, function (data, callback) {
			// DEVELOPMENT ONLY -- BIG Y BUG FIX
			// console.log("BEFORE WIRING: ");
			wireDatabaseToScrapersAndScrape(res, data, callback);
		}, 
		function (err, results) {
			// DEVELOPMENT ONLY -- BIG Y BUG FIX
			console.log("FINAL CALLBACK ERROR: ", err);
			if (!err) {
				// DEVELOPMENT ONLY -- BIG Y BUG FIX
				console.log("AFTER WIRING AND SCRAPE.");
				console.log("LINE 68 - results from scrapes: \n", results);
				res.json(results);
			}
		});

	});
};