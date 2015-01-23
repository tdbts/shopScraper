var express = require('express');
var router = express.Router();
var scrapeBigY = require('../scrapeBigY');
var scrapeShopRite = require('../scrapeShopRite');
var scrapeStopAndShop = require('../scrapeStopAndShop');

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

	scrapeBigY.scrape(function (data) {
		
		res.render('productListings', { 
			storeName: "Big Y", 
			startDate: data.startDate, 
			endDate: data.endDate,  
			products: data.products
		});

	});

});

router.get('/ShopRite', function (req, res) {
	
	scrapeShopRite.scrape(function (data) {
		
		res.render('productListings', {
			storeName: "ShopRite",  
			startDate: data.startDate, 
			endDate: data.endDate, 
			products: data.products
		});
	});

});

router.get('/StopAndShop', function (req, res) {
	
	scrapeStopAndShop.scrape(function (data) {

		res.render('productListings', { 
			storeName: "Stop and Shop", 
			startDate: 	data.startDate, 
			endDate: data.endDate, 
			products: data.products
		});
	});
});


module.exports = router;
