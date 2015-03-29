var React = require('react'), 
	Navigation = require('./Navigation'), 
	ThreeColumnsView = require('./ThreeColumnsView');

var ShopScraper = React.createClass({
	render: function () {
		return (
			<div id="shsc_subcomponents_wrapper">
				<div id="navigation_wrapper">
					<Navigation />
				</div>
				<div id="window_wrapper">
					<ThreeColumnsView />
				</div>
			</div>
		);
	}
});

module.exports = ShopScraper;
