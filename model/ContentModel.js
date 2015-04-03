/* ContentModel.js */
var Model = require('./BaseModel'), 
	model = new Model(), 
	_ = require('underscore');

var ContentModel = model.extend({
	getData: function (queryObj, options, callback) {
		// DEVELOPMENT ONLY
		var humanReadableQuery = _.isEmpty(queryObj) ? " all documents using " : " " + JSON.stringify(queryObj) + " using", 
			humanReadableOptions = _.isEmpty(options) ? " no options." : " options: " + JSON.stringify(options) + ".";
		
<<<<<<< HEAD
=======
		console.log("Querying " + this._collection.namespace + " collection for" + humanReadableQuery + humanReadableOptions);

>>>>>>> ui_development
		options = options || {};

		return this.collection().find(queryObj, options).toArray(function (err, data) {
			if (!err) {
				callback(err, data);
			} else {
				console.log("There was an error querying the database: ", err);
			}
		});
	}
});

module.exports = ContentModel;