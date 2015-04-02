var express = require('express'),
	router = express.Router(),  
	ContentModel = require('../model/ContentModel'), 
	getStoreLocations = require('../src/getStoreLocations'), 
	getListingsFromUserDefaults = require('../src/getListingsFromUserDefaults'), 
	handleScrapeRequest = require('../src/handleScrapeRequest');

/* GET home page. */
router.get('/', function (req, res) {

	res.render('index');
});

// SOON TO BE DEPRECATED
// router.get('/ShopScraperNavigation', function (req, res) {
// 	if (req.db) {
// 		var model = new ContentModel(req.db);
		
// 		model.collection('storeLogoData').getData({}, {}, function (err, data) {
// 			if (!err) {
// 				stringifiedLogoData = JSON.stringify(data);
				
// 				res.send(stringifiedLogoData);
// 			}
// 		});
// 	}
// });

router.get('/api/:storeName', function (req, res) {

	var storeName = req.params.storeName;

	handleScrapeRequest(req, res, storeName);
});

router.get('/user/locations', function (req, res) {

	getListingsFromUserDefaults(req, res);	
});

router.get('/SelectLocationDefaults', function (req, res) {
	
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
