var React = require('react'), 
	Navigation = require('./Navigation'), 
	ThreeColumnsView = require('./ThreeColumnsView');

var ShopScraper = React.createClass({displayName: "ShopScraper",
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
