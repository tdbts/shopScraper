/** @jsx React.DOM */

var React = require('react'), 
	ShopChooser = require('../javascripts/ShopChooser'), 
	StoreCircularComponent = require('../javascripts/StoreCircularComponent'), 	
	$ = require('jquery');

window.$ = window.jQuery = require('jquery');


$(document).ready(function() {

	// I just feel like there has got to be a better way to conditionally load 
	// the ajax depending on the url path.
	// Ultimately, this code will use the logged-in user's data from MongoDB to 
	// determine which store's logos to get from the backend...well, actually, the final 
	// version of this webapp won't have this logo placeholder at all.  
	if (window.location.pathname === "/") {
		$.ajax({	
			type: "GET",

			url: '/ShopScraperNavigation', 
			
			success: function (storeLogoData) {

				React.render(<ShopChooser stores={storeLogoData} />, document.getElementById('store_navigation_container'));
			}
		});
	}   

});
