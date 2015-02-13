var express = require('express');
var router = express.Router();
var scrapeBigY = require('../src/scrapeBigY');
var scrapeShopRite = require('../src/scrapeShopRite');
var scrapeStopAndShop = require('../src/scrapeStopAndShop');

/* 
* Need to create a better MV* architecture for this webapp.  
* I should not have my business logic within each of these get() 
* method calls.
* Will need one type of controller for the pages, and another 
* type for the index.
*/

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

	scrapeBigY.scrape(function (err, data) {

		if (!err) {
			res.render('productListings', { 
				storeName: "Big Y", 
				startDate: data.startDate, 
				endDate: data.endDate,  
				products: data.products
			});
		}

	});

});

router.get('/ShopRite', function (req, res) {
	
	scrapeShopRite.scrape(function (err, data) {
		
		res.render('productListings', {
			storeName: "ShopRite",  
			startDate: data.startDate, 
			endDate: data.endDate, 
			products: data.products
		});
	});

});

router.get('/StopAndShop', function (req, res) {
	
	scrapeStopAndShop.scrape(function (err, data) {

		if (!err) {
			res.render('productListings', { 
				storeName: "Stop and Shop", 
				startDate: 	data.startDate, 
				endDate: data.endDate, 
				products: data.products
			});
		}

	});
});


module.exports = router;
