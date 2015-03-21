var express = require('express'),
	router = express.Router(),  
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
