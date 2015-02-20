var express = require('express'),
	router = express.Router(),
	renderListings = require('../src/renderListings'),
	storeLogoData = require('../src/storeLogoData'), 
	scrapeBigY = require('../src/scrapeBigY'),
	scrapeShopRite = require('../src/scrapeShopRite'),
	scrapeStopAndShop = require('../src/scrapeStopAndShop');


/* GET home page. */
router.get('/', function (req, res) {
	
	res.render('index');

});

router.get('/BigY', function (req, res) {

	renderListings(res, scrapeBigY);
});

router.get('/ShopRite', function (req, res) {
	
	renderListings(res, scrapeShopRite);
});

router.get('/StopAndShop', function (req, res) {
	
	renderListings(res, scrapeStopAndShop);
});

router.get('/ShopScraperNavigation', function (req, res) {

	res.send(storeLogoData);	
});


module.exports = router;
