var scraper = require('./scraper'), 
	CacheForPagesMetadata = require('./CacheForPagesMetadata');

var getPagesMetadata = scraper.extend({
	config: {
		storeName: "Stop and Shop"
	}, 

	PageMetadataObject: function (pageID, endDate, image) {
		this.pageID = pageID; 
		this.endDate = endDate; 
		this.image = image;
	}, 

	parsePagesMetadata: function (dataSource, dataParser, MetadataObjConstructor) {
		
		var pageMetadataSource = dataParser(dataSource), 
			circularPagesData = new CacheForPagesMetadata();

		pageMetadataSource.map(function (page) {
			circularPagesData.data.push(new MetadataObjConstructor(page.pageid, page.enddate, page.imageurl));
		});

		return circularPagesData; 
	}, 

	handlePagesMetadata: function (err, resp, body) {
		
		var self = getPagesMetadata;

		self.handleError(err, "There was an error getting the " + self.config.storeName + " circular's page metadata.");

		if (!err && resp.statusCode === 200) {
			// DEVELOPMENT ONLY
			// console.log(body)

			var circularPagesData = self.parsePagesMetadata(body, self.locateAndParsePageData, self.PageMetadataObject);

			// DEVELOPMENT ONLY
			// console.log("Found " + circularPagesData.length + " pages!");
			// console.log(circularPagesData);

			return circularPagesData;			
		}
	}, 

	scrape: function (url, callback) {
		var self = this;

		this.makeRequest(url, self.handlePagesMetadata, callback);
	}

});

module.exports = getPagesMetadata;