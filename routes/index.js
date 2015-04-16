var express = require('express'),
	router = express.Router(),   
	getStoreLocations = require('../src/getStoreLocations'), 
	getAndSendWelcomePageDomData = require('../src/getAndSendWelcomePageDomData'), 
	getListingsFromUserDefaults = require('../src/getListingsFromUserDefaults'), 
	handleScrapeRequest = require('../src/handleScrapeRequest');

/* ROUTES */
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

module.exports = router;
