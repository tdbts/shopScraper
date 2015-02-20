/** @jsx React.DOM */

var React = require('react'), 
	ShopChooser = require('../javascripts/ShopChooser'), 
	$ = require('jquery');
	
// var storeLogoData = [
// 	{
// 		storeID: "0", 
// 		storeName: "Big Y", 
// 		storeHref: "/BigY", 
// 		imageURL: "/images/big_y_logo.jpeg", 
// 		imageID: "big_y_logo", 
// 		containerID: "container_big_y_logo"
// 	},
// 	{
// 		storeID: "1", 
// 		storeName: "Stop and Shop", 
// 		storeHref: "/StopAndShop", 
// 		imageURL: "/images/stop_and_shop_logo.jpeg", 
// 		imageID: "stop_and_shop_logo", 
// 		containerID: "container_stop_and_shop_logo"
// 	},
// 	{
// 		storeID: "2", 
// 		storeName: "ShopRite", 
// 		storeHref: "/ShopRite", 
// 		imageURL: "/images/shop_rite_logo.jpeg", 
// 		imageID: "shop_rite_logo", 
// 		containerID: "container_shop_rite_logo"
// 	} 
// ];

$(document).ready(function() {

	$.ajax({
		url: '/ShopScraperNavigation', 
		success: function (storeLogoData) {
			React.render(React.createElement(ShopChooser, {stores: storeLogoData}), document.getElementById('store_navigation_container'));	
		}
	});

});



