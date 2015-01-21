var express = require('express');
var router = express.Router();
var scrapeBigY = require('../scrapeBigY');

/* GET home page. */
router.get('/', function(req, res) {

	scrapeBigY(function (data) {
		
		res.render('index', { 
			title: 'ShopScraper',
			startDate: data.StartDate, 
			endDate: data.EndDate,  
			products: data.Products
		});

	});


});

module.exports = router;
