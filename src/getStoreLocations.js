var async = require('async'), 
	ContentModel = require('../model/ContentModel');

module.exports = function (req, res, callback) {
	var jsonResponse = {};

	if (req.db) {
		var logoDataModel = new ContentModel(req.db), 
			locationDataModel = new ContentModel(req.db);

		async.parallel([
			function (callback) {
				logoDataModel.collection('dom').getData({}, {'storeLogoData': 1}, function (err, data) {
					if (!err) {
						jsonResponse.logoData = data;
						callback(null, jsonResponse);
					}
				});
			}, 

			function (callback) {
				locationDataModel.collection('locations').getData({}, {}, function (err, data) {
					if (!err) {
						data = data.sort(function (a, b) {
							if (a.name < b.name) {
								return -1;
							} else if (a.name > b.name) {
								return 1;
							} else {
								return 0;
							}
						});

						jsonResponse.locationData = data;
						callback(null, jsonResponse);
					}
				});
			}
		], 

		function (err, results) {
			if (!err) {
				callback(results);
			}
		});
	}	
};