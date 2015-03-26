var React = require('react'), 
	Navigation = require('./Navigation'), 
	ThreeColumnsView = require('./ThreeColumnsView');

var ShopScraper = React.createClass({displayName: "ShopScraper",
	componentDidMount: function () {
		// React.render(<Navigation />, document.getElementById('navigation_wrapper'));
		
		// React.render(<ThreeColumnsView />, document.getElementById('window_wrapper'));
	}, 

	render: function () {
		return (
			React.createElement("div", {id: "shsc_subcomponents_wrapper"}, 
				React.createElement("div", {id: "navigation_wrapper"}, 
					React.createElement(Navigation, null)
				), 
				React.createElement("div", {id: "window_wrapper"}, 
					React.createElement(ThreeColumnsView, null)
				)
			)
		);
	}
});

module.exports = ShopScraper;
