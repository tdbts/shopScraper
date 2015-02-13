var request = require('request'), 
	_ = require('underscore');

module.exports = {
	config: {},
	
	extend: function (child) {
		return _.extend({}, this, child);	
	}, 

	makeRequest: function (url, processor, callback) {
		
		request(url, function (err, resp, body) {
			var result = null;

			if (!err) {
				result = processor(err, resp, body);
			}

			callback(err, result);
		});
	}, 

	handleError: function (err, message) {
		var result = null;

		if (err) {
			result = new Error(message + "\n" + err);
		}

		return result;
	}, 

	getRequester: function () {
		return request;
	}	
};