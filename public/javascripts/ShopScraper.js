var React = require('react'), 
	Navigation = require('./Navigation'), 
	Welcome = require('./Welcome'), 
	ThreeColumnsView = require('./ThreeColumnsView');

var ShopScraper = React.createClass({displayName: "ShopScraper",
	getInitialState: function () {
		return {
			showWelcome: true
		};
	}, 

	handleButtonClick: function () {
		return this.setState({showWelcome: false});
	}, 

	render: function () {
		return (
			React.createElement("div", {id: "shsc_subcomponents_wrapper"}, 
				React.createElement("div", {id: "navigation_wrapper"}, 
					React.createElement(Navigation, null)
				), 
				React.createElement("div", {id: "window_wrapper"}, 
					this.state.showWelcome ? React.createElement(Welcome, {onButtonClick: this.handleButtonClick}) : React.createElement(ThreeColumnsView, null)
				)
			)
		);
	}
});

module.exports = ShopScraper;
