/* ContentModel.js */
var Model = require('./BaseModel'), 
	model = new Model();

var ContentModel = model.extend({
	getData: function (collectionName, propName) {
		return this.collection(collectionName).find(propName);
	}
});

module.exports = ContentModel;