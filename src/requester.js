var request = require('request'), 
	_ = require('underscore');

module.exports = {
	config: {},
	
	extend: function (child) {
		return _.extend({}, this, child);	
	}, 

	makeRequest: function (url, processor, callback) {
		// DEVELOPMENT ONLY
		// var start = process.hrtime();
		request(url, function (err, resp, body) {
			var result = null;

			if (!err) {
				result = processor(err, resp, body);
			}

			process.nextTick(function () {
				callback(err, result);
				// DEVELOPMENT ONLY
				// var end = process.hrtime(start);
				// console.log("Request response time to" + url + ": ", end);				
			});
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