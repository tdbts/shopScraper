var express = require('express');
var router = express.Router();
var scrapeBigY = require('../scrapeBigY');
var scrapeShopRite = require('../scrapeShopRite');

/* GET home page. */
router.get('/', function (req, res) {

	scrapeBigY(function (data) {
		
		res.render('index', { 
			title: 'ShopScraper - Big Y',
			startDate: data.StartDate, 
			endDate: data.EndDate,  
			products: data.Products
		});

	});

});

router.get('/ShopRite', function (req, res) {
	
	scrapeShopRite(function (data) {
		
		res.render('index', {
			title: 'ShopScraper - ShopRite', 
			startDate: data.StartDate, 
			endDate: data.EndDate, 
			products: data.Products
		});
	});

});


module.exports = router;
