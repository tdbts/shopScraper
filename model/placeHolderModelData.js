/* placeHolderModelData.js */
var Collection = function (collectionName, data) {
	this[collectionName] = data;
};

Collection.prototype.find = function (propName) {
	return this[propName];
};

var myStoreData = {
	BigY: {
		circularDataURL: "http://bigy.myrelationshop.com/rs/WeeklyAd/GetCurrentCircular?size=768&storeId=",
		storeID: "30"		
	},

	ShopRite: {
		// "PseudoStoreID" is same as data-clientanalyticslabel attribute of store hrefs!
		baseURL: "http://plan.shoprite.com/Circular/ShopRite-of-Norwich/BFDE400/Weekly/1/", 
		pageNumberLocation: 'span.pages', 
		domData: {
			pageNumberLocation: 'span.pages', 
			date: {
				start: {
					element: 'div#CircularValidDates', 
					attribute: 'data-start', 
					indexes: [0, 8]
				}, 
				end: {
					element: 'div#CircularValidDates', 
					attribute: 'data-end', 
					indexes: [0, 8]
				} 
			}, 
			product: {
				container: '.tooltip', 
				name: 'p.itemTitle', 
				description: 'p.itemBrand', 
				price: 'p.itemPrice', 
				image: {
					element: 'img.itemImage', 
					attribute: 'src'
				}
			}	
		}
	}, 

	StopAndShop: {
		urlConfigs: {
			forPromotionID: ['webpage', 'forPromotionID', ['storeid']], 
			forPagesData: ['api', 'forPageData', ['campaignid', 'storeid', 'promotionid']], 
			forProductData: ['api', 'forProductData', ['campaignid', 'storeid', 'resultset', 'pageid']], 
		}, 
		urlFragments: {
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
		}
	}
};

module.exports = {
	placeHolderScraperData: new Collection('storeData', myStoreData),

	collection: function (collectionName) {
		return this[collectionName];
	}
};
