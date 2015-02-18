module.exports = function (res, scrapeFunc) {
	
	scrapeFunc.scrape(function (err, data) {
		
		if (!err) {
			res.render('productListings', {
				storeName: data.storeName, 
				startDate: data.startDate, 
				endDate: data.endDate, 
				products: data.products
			});
		}

	});
};