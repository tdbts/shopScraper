var React = require('react'), 
	// Welcome = require('./Welcome'), 
	// Navigation = require('./Navigation'), 
	ShopScraper = require('./ShopScraper');

$(document).ready(function() {

	React.render(<ShopScraper />, document.getElementById('app_wrapper'));
});
