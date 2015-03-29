var React = require('react'), 
	Welcome = require('./Welcome'), 
	Navigation = require('./Navigation'), 
	ShopScraper = require('./ShopScraper');

$(document).ready(function() {

	// PLACEHOLDER -- Testing Welcome Page
	if (window.location.pathname === '/test/Welcome') {
		React.render(React.createElement(Navigation, null), document.getElementById('app_wrapper'));
		React.render(React.createElement(Welcome, null), document.getElementById('welcome_test'));
	
	} else {
		React.render(React.createElement(ShopScraper, null), document.getElementById('app_wrapper'));
	}

});
