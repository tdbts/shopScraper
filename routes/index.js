var express = require('express'),
	router = express.Router(),
	// renderListings = require('../src/renderListings'),
	// storeRouteMapper = require('../src/storeRouteMapper'),
	// ContentModel = require('../model/ContentModel'), 
	// placeHolderModelData = require('../model/placeHolderModelData'),  
	storeLogoData = require('../src/storeLogoData'), 
	wireDatabaseToScrapersAndScrape = require('../src/wireDatabaseToScrapersAndScrape');


/* GET home page. */
router.get('/', function (req, res) {

	res.render('index');
});

router.get('/ShopScraperNavigation', function (req, res) {

	res.send(storeLogoData);	
});

router.get('/api/:storeName', function (req, res) {

	var storeName = req.params.storeName;

	wireDatabaseToScrapersAndScrape(res, storeName, 'placeHolderScraperData', 'scrapeConfigData');

});

module.exports = router;
