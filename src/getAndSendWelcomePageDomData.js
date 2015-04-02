var ContentModel = require('../model/ContentModel'); 
	
module.exports = function (req, res) {
	var model = new ContentModel(req.db);
	
	model.collection('dom').getData({'welcomePage': {$exists: true}}, {}, function (err, data) {
		if (!err) {
			res.json(data);
		}
	});
};