/** @jsx React.DOM */

var React = require('react'), 
	ShopChooser = require('../javascripts/ShopChooser'), 
	$ = require('jquery');

window.$ = window.jQuery = require('jquery');


$(document).ready(function() {

	// This is throwing an error because the way my html is set up, the ajax call 
	// below will run on every page load, including the calls to the other routes.   
	$.ajax({	
		type: "GET",

		url: '/ShopScraperNavigation', 
		
		success: function (storeLogoData) {
			React.render(React.createElement(ShopChooser, {stores: storeLogoData}), document.getElementById('store_navigation_container'));	
		}
	});


});
