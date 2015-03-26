var React = require('react'), 
	ShopScraper = require('./ShopScraper');

$(document).ready(function() {

	React.render(React.createElement(ShopScraper, null), document.getElementById('app_wrapper'));

});
