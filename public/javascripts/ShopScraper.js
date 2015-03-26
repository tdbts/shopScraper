var React = require('react'), 
	Navigation = require('./Navigation'), 
	ThreeColumnsView = require('./ThreeColumnsView');

var ShopScraper = React.createClass({displayName: "ShopScraper",
	componentDidMount: function () {
		React.render(React.createElement(Navigation, null), document.getElementById('navigation_wrapper'));
		
		// PLACEHOLDER -- There will eventually be a conditional statement 
		// here to render different views depending on client's localStorage
		React.render(React.createElement(ThreeColumnsView, null), document.getElementById('window_wrapper'));
	}, 

	render: function () {
		return (
			React.createElement("div", {id: "shsc_subcomponents_wrapper"}, 
				React.createElement("div", {id: "navigation_wrapper"}), 
				React.createElement("div", {id: "window_wrapper"})
			)
		);
	}
});

module.exports = ShopScraper;
