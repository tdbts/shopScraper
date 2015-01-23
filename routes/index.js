var express = require('express');
var router = express.Router();
var scrapeBigY = require('../scrapeBigY');
var scrapeShopRite = require('../scrapeShopRite');
var scrapeStopAndShop = require('../scrapeStopAndShop');

/* GET home page. */
router.get('/', function (req, res) {

	scrapeBigY(function (data) {
		
		res.render('index', { 
			storeName: "Big Y", 
			startDate: data.StartDate, 
			endDate: data.EndDate,  
			products: data.Products
		});

	});

});

router.get('/ShopRite', function (req, res) {
	
	scrapeShopRite.scrape(function (data) {
		
		res.render('index', {
			storeName: "ShopRite",  
			startDate: data.startDate, 
			endDate: data.endDate, 
			products: data.products
		});
	});

});

router.get('/StopAndShop', function (req, res) {
	
	scrapeStopAndShop(function (data) {

		res.render('index', { 
			storeName: "Stop and Shop", 
			startDate: "START DATE", 
			endDate: "END DATE", 
			products: data
		});
	});
});


module.exports = router;
