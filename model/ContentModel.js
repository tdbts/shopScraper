/* ContentModel.js */
var Model = require('./BaseModel'), 
	model = new Model();

var ContentModel = model.extend({
	getData: function (queryObj, callback) {
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