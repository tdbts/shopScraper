var request = require('request'), 
	cheerio = require('cheerio');

function scrapeStopAndShop(callback) {

	request("http://scapi.shoplocal.com/stopandshop/2012.2/json/getpromotionpages.aspx?campaignid=5e018ae35636a4e2&storeid=2599015&promotionid=111191", function (err, resp, body) {
		
		if (err) {
			return new Error("There was an error making the URL request.\n" + err);
		}

		if (!err && resp.statusCode === 200) {

			var $ = cheerio.load(body);

			console.log(body);

			var json = JSON.parse(body);

			var result = [];

			json.content.collection[0].data.map(function (page) {
				result.push({
					pageID: page.pageid, 
					endDate: page.enddate, 
					image: page.imageurl 
				});
			});

			console.log("Found " + result.length + " pages!");
			console.log(result);
		}
	});

}

scrapeStopAndShop();