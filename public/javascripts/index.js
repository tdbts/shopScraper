/** @jsx React.DOM */

var React = require('react'), 
	ShopChooser = require('../javascripts/ShopChooser'), 
	$ = require('jquery');

window.$ = window.jQuery = require('jquery');


$(document).ready(function() {

	// I just feel like there has got to be a better way to conditionally load 
	// the ajax depending on the url path
	if (window.location.pathname === "/") {
		$.ajax({	
			type: "GET",

			url: '/ShopScraperNavigation', 
			
			success: function (storeLogoData) {
				React.render(React.createElement(ShopChooser, {stores: storeLogoData}), document.getElementById('store_navigation_container'));	
			}
		});
	}   

});
