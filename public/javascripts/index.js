var React = require('react'), 
	// Welcome = require('./Welcome'), 
	// Navigation = require('./Navigation'), 
	ShopScraper = require('./ShopScraper');

$(document).ready(function() {

	React.render(React.createElement(ShopScraper, null), document.getElementById('app_wrapper'));
});
