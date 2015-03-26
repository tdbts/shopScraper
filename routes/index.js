var express = require('express'),
	router = express.Router(),  
	// storeLogoData = require('../src/storeLogoData'),  
	ContentModel = require('../model/ContentModel'), 
	wireDatabaseToScrapersAndScrape = require('../src/wireDatabaseToScrapersAndScrape');

/* GET home page. */
router.get('/', function (req, res) {
	// PLACEHOLDER -- DB CHECK
	if (req.db) {
		console.log("YEAHHHH WE GOT A DATABASE, BITCH!");
		var model = new ContentModel(req.db);
		model.collection('companies').getData({'companyName': 'BigY'}, function (err, data) {
			if (!err) {
				console.log(data);
			}
		});
	}
	res.render('index');
});

router.get('/ShopScraperNavigation', function (req, res) {
	if (req.db) {
		var model = new ContentModel(req.db);
		model.collection('storeLogoData').getData({}, function (err, data) {
			if (!err) {
				stringifiedLogoData = JSON.stringify(data);
				
				res.send(stringifiedLogoData);
			}
		});
	}
});

router.get('/api/:storeName', function (req, res) {

	var storeName = req.params.storeName;

	wireDatabaseToScrapersAndScrape(res, storeName, 'placeHolderScraperData', 'scrapeConfigData');

});

module.exports = router;
