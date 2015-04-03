var async = require('async'), 
<<<<<<< HEAD
	ContentModel = require('../model/ContentModel');

module.exports = function (req, res, callback) {
	var jsonResponse = {};

=======
	sortObjectsByProp = require('./sortObjectsByProp'), 
	ContentModel = require('../model/ContentModel');

module.exports = function (req, res, callback) {
>>>>>>> ui_development
	if (req.db) {
		var logoDataModel = new ContentModel(req.db), 
			locationDataModel = new ContentModel(req.db);

<<<<<<< HEAD
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
=======
		async.parallel({
			logoData: function (callback) {
				logoDataModel.collection('dom').getData({}, {'storeLogoData': 1, '_id': 0}, function (err, data) {
					if (!err) {
						data = data[0].storeLogoData;

						callback(null, data);
					}	
				});
			}, 

			locationData: function (callback) {
				locationDataModel.collection('locations').getData({}, {}, function (err, data) {
					if (!err) {
						data = data.sort(sortObjectsByProp('name'));

						callback(null, data);
					}
				});
			}
		}, 

		function (err, resultsObj) {
			if (!err) {
				callback(resultsObj);
>>>>>>> ui_development
			}
		});
	}	
};