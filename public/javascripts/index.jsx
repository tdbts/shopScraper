/** @jsx React.DOM */

var React = require('react'), 
	ShopChooser = require('../javascripts/ShopChooser'), 
	$ = require('jquery');


$(document).ready(function() {

	$.ajax({	
		type: "GET",

		url: '/ShopScraperNavigation', 
		
		success: function (storeLogoData) {
			React.render(<ShopChooser stores={storeLogoData} />, document.getElementById('store_navigation_container'));	
		}
	});


});
