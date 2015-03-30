var React = require('react'), 
	Welcome = require('./Welcome'), 
	Navigation = require('./Navigation'), 
	ShopScraper = require('./ShopScraper');

$(document).ready(function() {

	// // PLACEHOLDER -- Testing Welcome Page
	// if (window.location.pathname === '/test/Welcome') {
	// 	React.render(<Navigation />, document.getElementById('app_wrapper'));
	// 	React.render(<Welcome />, document.getElementById('welcome_test'));
	
	// } else {
	// 	React.render(<ShopScraper />, document.getElementById('app_wrapper'));
	// }

	React.render(<ShopScraper />, document.getElementById('app_wrapper'));

});
