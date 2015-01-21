var express = require('express');
var router = express.Router();
var scrapeBigY = require('../scrapeBigY');

/* GET home page. */
router.get('/', function(req, res) {

	scrapeBigY(function (data) {
		
		res.render('index', { 
			title: 'ShopScraper', 
			products: data
		});

	});


});

module.exports = router;
