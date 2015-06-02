var React = require('react'), 
	ShopScraper = require('./ShopScraper');

$(document).ready(function() {

	React.render(<ShopScraper />, document.getElementById('app_wrapper'));
});
