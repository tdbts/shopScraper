var express = require('express'),
	router = express.Router(),
	renderListings = require('../src/renderListings'),
	storeRouteMapper = require('../src/storeRouteMapper'),
	ContentModel = require('../model/ContentModel'), 
	placeHolderModelData = require('../model/placeHolderModelData'),  
	storeLogoData = require('../src/storeLogoData'), 
	wireDatabaseToScrapersAndScrape = require('../src/wireDatabaseToScrapersAndScrape'), 
	scrapeBigY = require('../src/scrapeBigY'),
	scrapeShopRite = require('../src/scrapeShopRite'),
	scrapeStopAndShop = require('../src/scrapeStopAndShop');


/* GET home page. */
router.get('/', function (req, res) {

	res.render('index');
});

router.get('/ShopScraperNavigation', function (req, res) {

	res.send(storeLogoData);	
});


// router.get('/stores/:storeName', function (req, res) {
	
// 	var storeName = req.params.storeName; 

// 	renderListings(res, storeRouteMapper[storeName]);
// });

router.get('/api/:storeName', function (req, res) {

	var storeName = req.params.storeName;

	wireDatabaseToScrapersAndScrape(res, storeName, 'placeHolderScraperData', 'storeData');

});

// *************************************************
// Original routes to store product displays will no 
// longer work!  Use these new routes to test the various 
// scrapers during development.
router.get('/test_BigY', function (req, res) {
	
	renderListings(res, scrapeBigY);
});

router.get('/test_ShopRite', function (req, res) {
	
	renderListings(res, scrapeShopRite);
});

router.get('/test_StopAndShop', function (req, res) {
	
	renderListings(res, scrapeStopAndShop);
});
// *************************************************


module.exports = router;
