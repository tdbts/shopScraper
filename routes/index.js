var express = require('express'),
	router = express.Router(),
	renderListings = require('../src/renderListings'),
	scrapeBigY = require('../src/scrapeBigY'),
	scrapeShopRite = require('../src/scrapeShopRite'),
	scrapeStopAndShop = require('../src/scrapeStopAndShop');


/* GET home page. */
router.get('/', function (req, res) {
	
	res.render('index', {
		title: "Welcome to ShopScraper", 
		bigYLogo: '/images/big_y_logo.jpeg', 
		stopAndShopLogo: '/images/stop_and_shop_logo.jpeg',
		shopRiteLogo: '/images/shop_rite_logo.jpeg'
	});

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


module.exports = router;
