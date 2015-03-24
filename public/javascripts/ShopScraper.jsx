var React = require('react'), 
	Navigation = require('./Navigation'), 
	ThreeColumnsView = require('./ThreeColumnsView');

var ShopScraper = React.createClass({
	componentDidMount: function () {
		React.render(<Navigation />, document.getElementById('navigation_wrapper'));
		React.render(<ThreeColumnsView />, document.getElementById('window_wrapper'));
	}, 

	render: function () {
		return (
			<div id="shsc_subcomponents_wrapper">
				<div id="navigation_wrapper"></div>
				<div id="window_wrapper"></div>
			</div>
		);
	}
});

module.exports = ShopScraper;
