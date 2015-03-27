/* ContentModel.js */
var Model = require('./BaseModel'), 
	model = new Model(), 
	_ = require('underscore');

var ContentModel = model.extend({
	getData: function (queryObj, callback) {
		// DEVELOPMENT ONLY
		var humanReadableQuery = _.isEmpty(queryObj) ? "all documents." : JSON.stringify(queryObj);
		console.log("Querying " + this._collection + " collection for " + humanReadableQuery);
		
		return this.collection().find(queryObj).toArray(function (err, data) {
			if (!err) {
				callback(err, data);
			} else {
				console.log("There was an error querying the database: ", err);
			}
		});
	}
});

module.exports = ContentModel;