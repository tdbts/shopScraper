var express = require('express'),
<<<<<<< HEAD
	router = express.Router(),  
	ContentModel = require('../model/ContentModel'), 
	async = require('async'), 
	getStoreLocations = require('../src/getStoreLocations'), 
=======
	router = express.Router(),   
	getStoreLocations = require('../src/getStoreLocations'), 
	getAndSendWelcomePageDomData = require('../src/getAndSendWelcomePageDomData'), 
	getListingsFromUserDefaults = require('../src/getListingsFromUserDefaults'), 
>>>>>>> ui_development
	handleScrapeRequest = require('../src/handleScrapeRequest');

/* GET home page. */
router.get('/', function (req, res) {
<<<<<<< HEAD
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
=======

>>>>>>> ui_development
	res.render('index');
});

// SOON TO BE DEPRECATED
// router.get('/ShopScraperNavigation', function (req, res) {
// 	if (req.db) {
// 		var model = new ContentModel(req.db);
		
<<<<<<< HEAD
		model.collection('storeLogoData').getData({}, {}, function (err, data) {
			if (!err) {
				stringifiedLogoData = JSON.stringify(data);
=======
// 		model.collection('storeLogoData').getData({}, {}, function (err, data) {
// 			if (!err) {
// 				stringifiedLogoData = JSON.stringify(data);
>>>>>>> ui_development
				
// 				res.send(stringifiedLogoData);
// 			}
// 		});
// 	}
// });

router.get('/api/:storeName', function (req, res) {

	handleScrapeRequest(req, res, req.params.storeName);
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
	
	getAndSendWelcomePageDomData(req, res);
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
