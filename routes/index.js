var express = require('express'),
	router = express.Router(),  
	ContentModel = require('../model/ContentModel'), 
	async = require('async'), 
	getStoreLocations = require('../src/getStoreLocations'), 
	handleScrapeRequest = require('../src/handleScrapeRequest');

/* GET home page. */
router.get('/', function (req, res) {
	// PLACEHOLDER -- DB CHECK
	if (req.db) {
		console.log("YEAHHHH WE GOT A DATABASE, BITCH!");
		var model = new ContentModel(req.db);
		model.collection('companies').getData({'companyName': 'BigY'}, {}, function (err, data) {
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
		
		model.collection('storeLogoData').getData({}, {}, function (err, data) {
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
	
	getStoreLocations(req, res, function (results) {
		res.json(results);
	});
});

router.get('/WelcomePageDomData', function (req, res) {
	var model = new ContentModel(req.db);

	model.collection('dom').getData({"welcomePage": {$exists: true}}, {}, function (err, data) {
		if (!err) {
			res.json(data);
		}
	});
});

module.exports = router;
