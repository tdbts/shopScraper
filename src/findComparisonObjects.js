var scrapePage = require('./sr_scrapePage'), 
	getType = require('./getType');

module.exports = function (memo, pageNumber, callback) {
	scrapePage.scrape(pageNumber, function (err, result) {
		
		if ((getType(result) === 'Object') && result.hasOwnProperty('products')) {
			memo.push(result);
			
			if (memo && memo.length === 2) {
				callback(memo);
			} else {
				callback(null, memo);
			}
		} 

	});
};