var express = require('express'),
	router = express.Router(),  
	ContentModel = require('../model/ContentModel'), 
	async = require('async'), 
	handleScrapeRequest = require('../src/handleScrapeRequest');

/* GET home page. */
router.get('/', function (req, res) {
	// PLACEHOLDER -- DB CHECK
	if (req.db) {
		console.log("YEAHHHH WE GOT A DATABASE, BITCH!");
		var model = new ContentModel(req.db);
		model.collection('companies').getData({'companyName': 'BigY'}, function (err, data) {
			if (!err) {
				console.log(data);
			}
		});
	}
	res.render('index');
});

router.get('/ShopScraperNavigation', function (req, res) {
	if (req.db) {
		var model = new ContentModel(req.db);
		
		model.collection('storeLogoData').getData({}, function (err, data) {
			if (!err) {
				stringifiedLogoData = JSON.stringify(data);
				
				res.send(stringifiedLogoData);
			}
		});
	}
});

router.get('/api/:storeName', function (req, res) {

	var storeName = req.params.storeName;

	handleScrapeRequest(req, res, storeName);
});

// TESTING WELCOME PAGE
router.get('/test/Welcome', function (req, res) {
	
	res.render('index');
});

router.get('/test/SelectLocationDefaults', function (req, res) {
	var jsonResponse = {};

	if (req.db) {
		var logoDataModel = new ContentModel(req.db), 
			locationDataModel = new ContentModel(req.db);

		async.parallel([
			function (callback) {
				logoDataModel.collection('storeLogoData').getData({}, function (err, data) {
					if (!err) {
						jsonResponse.logoData = data;
						callback(null, jsonResponse);
					}
				});
			}, 

			function (callback) {
				locationDataModel.collection('locations').getData({}, function (err, data) {
					if (!err) {
						jsonResponse.locationData = data;
						callback(null, jsonResponse);
					}
				});
			}
		], 

		function (err, results) {
			if (!err) {
				res.send(JSON.stringify(results));
			}
		});
	} 
});

module.exports = router;
