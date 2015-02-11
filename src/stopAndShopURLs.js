var UrlCreator = require('./UrlCreator');

var urlConfigs = {
	forPromotionID: ['webpage', 'forPromotionID', ['storeid']], 
	forPagesData: ['api', 'forPageData', ['campaignid', 'storeid', 'promotionid']], 
	forProductData: ['api', 'forProductData', ['campaignid', 'storeid', 'resultset', 'pageid']], 
};

var urlFragments = {
	host: {
		webpage: 'stopandshop.shoplocal.com', 
		api: 'scapi.shoplocal.com'
	}, 
	pathname: {
		forPromotionID: '/StopandShop/BrowseByPage', 
		forPageData: '/stopandshop/2012.2/json/getpromotionpages.aspx', 
		forProductData: '/stopandshop/2012.2/json/getpromotionpagelistings.aspx'
	}, 
	parameters: {
		campaignid: '5e018ae35636a4e2', 
		storeid: '2599015', 
		resultset: 'full', 
		pageid: null, 
		promotionid: null
	}
};

module.exports = new UrlCreator(urlConfigs, urlFragments);