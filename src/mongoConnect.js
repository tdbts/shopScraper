var MongoClient = require('mongodb').MongoClient;

module.exports = function (dbName, callback) {
	MongoClient.connect('mongodb://localhost:27017/shopScraperTest', function (err, db) {
		
		if (!err) {
			console.log("Connected to ShopScraper database!");
			dbName = db;
			// callback(db);
			callback(dbName);

		} else {
			console.log("There was an error connecting to the MongoDB database!");
		}
	});
};
