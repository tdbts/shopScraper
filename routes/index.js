var express = require('express'),
	router = express.Router(),  
	ContentModel = require('../model/ContentModel'), 
	async = require('async'), 
	getStoreLocations = require('../src/getStoreLocations'), 
	wireDatabaseToScrapersAndScrape = require('../src/wireDatabaseToScrapersAndScrape'), 
	handleScrapeRequest = require('../src/handleScrapeRequest');

/* GET home page. */
router.get('/', function (req, res) {
	// PLACEHOLDER -- DB CHECK
	if (req.db) {
		console.log("YEAHHHH WE GOT A DATABASE, BITCH!");
		var model = new ContentModel(req.db);
		model.collection('companies').getData({'companyName': 'BigY'}, {}, function (err, data) {
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
		
		model.collection('storeLogoData').getData({}, {}, function (err, data) {
			if (!err) {
				stringifiedLogoData = JSON.stringify(data);
				
				res.send(stringifiedLogoData);
			}
		});
	}
});

router.get('/api/:storeName', function (req, res) {

	var storeName = req.params.storeName;

	handleScrapeRequest(req, res, storeName);
});

router.get('/user/locations', function (req, res) {
	
	console.log("LINE 47: \n", req.query);

	var defaultsData = JSON.parse(req.query.data);
	console.log("LINE 50: \n", defaultsData);

	var companyModel = new ContentModel(req.db), 
		locationModel = new ContentModel(req.db),
		scrapeConfigModel = new ContentModel(req.db),  
		locationIDs;

	locationIDs = defaultsData.map(function (obj) {
		return obj.defaultLocationID;
	});

	async.parallel([
		function (callback) {
			locationModel.collection('locations').getData({'storeID': {$in: locationIDs}}, {}, function (err, data) {
				if (!err) {
					callback(null, data);
				}
			});
		}, 

		function (callback) {
			scrapeConfigModel.collection('scrapeConfig').getData({}, {}, function (err, data) {
				if (!err) {
					callback(null, data);
				}
			});
		}
	], 

	function (err, results) {
		console.log("LINE 80: \n", results);

		var dataForScrapes = [];

		results[0].map(function (location) {
			results[1].map(function (config) {
				if (location.companyID === config.companyID) {
					dataForScrapes.push({
						storeName: config.storeName, 
						configData: [config], 
						preferences: location.companyID === '2' ? [{circularPath: location.circularPath}] 
							: [{storeID: location.storeID}] 
					});
				}
			});
		});

		console.log("LINE 97: DATA FOR SCRAPES: \n", JSON.stringify(dataForScrapes));

		// // APPROACH #1 - USING async.map
		// DEFINITELY SEEMS FASTER, BUT WHY??
		async.map(dataForScrapes, function (data, callback) {
			wireDatabaseToScrapersAndScrape(res, data, callback);
		}, 
		function (err, results) {
			if (!err) {
				console.log("LINE 104: \n", results);
				res.json(results);
			}
		});


		// // APPROACH #2 - USING async.parallel
		// var scrapes = [
		// 	function (callback) {
		// 		wireDatabaseToScrapersAndScrape(res, dataForScrapes[0], function (err, circularData) {
		// 			console.log("BIG Y CIRCULAR DATA: ", circularData);
		// 			callback(null, circularData);
		// 		});
		// 	}, 

		// 	function (callback) {
		// 		wireDatabaseToScrapersAndScrape(res, dataForScrapes[1], function (err, circularData) {
		// 			callback(null, circularData);
		// 		});
		// 	}, 

		// 	function (callback) {
		// 		wireDatabaseToScrapersAndScrape(res, dataForScrapes[2], function (err, circularData) {
		// 			callback(null, circularData);
		// 		});
		// 	}
		// ];

		// async.parallel(scrapes, function (err, circularData) {
		// 	if (!err) {
		// 		console.log("LINE 141: \n", circularData);
		// 		res.json(circularData);
		// 	}
		// });

	});


});

// TESTING WELCOME PAGE
router.get('/test/Welcome', function (req, res) {
	
	res.render('index');
});

router.get('/test/SelectLocationDefaults', function (req, res) {
	
		getStoreLocations(req, res, function (results) {
		res.json(results);
	});
});

router.get('/WelcomePageDomData', function (req, res) {
	var model = new ContentModel(req.db);

	model.collection('dom').getData({"welcomePage": {$exists: true}}, {}, function (err, data) {
		if (!err) {
			res.json(data);
		}
	});
});

module.exports = router;
