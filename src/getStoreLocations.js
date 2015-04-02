var async = require('async'), 
	sortObjectsByProp = require('./sortObjectsByProp'), 
	ContentModel = require('../model/ContentModel');

module.exports = function (req, res, callback) {
	if (req.db) {
		var logoDataModel = new ContentModel(req.db), 
			locationDataModel = new ContentModel(req.db);

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
			}
		});
	}	
};