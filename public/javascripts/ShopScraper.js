var React = require('react'), 
	Navigation = require('./Navigation'), 
	Welcome = require('./Welcome'), 
	DefaultLocationsSelector = require('./DefaultLocationsSelector'), 
	ThreeColumnsView = require('./ThreeColumnsView');

var ShopScraper = React.createClass({displayName: "ShopScraper",
	getInitialState: function () {
		return {
			showLocationsSelector: false, 
			showStoreListings: false, 
			currentWindowView: React.createElement(Welcome, {onButtonClick: this.determineViewToRender})
		};
	}, 

	getDataFromLocalStorage: function () {
		return localStorage ? localStorage.getItem('shopScraperData') : null;
	}, 

	getLocalStorageBasedComponent: function () {
		var shopScraperData = this.getDataFromLocalStorage(), 
			currentViewComponent;

		if (!shopScraperData) {
			currentViewComponent = React.createElement(DefaultLocationsSelector, null);
		
		} else {
			// ...More code will be added here
			currentViewComponent = React.createElement(ThreeColumnsView, null)
		} 

		return currentViewComponent;
	}, 

	determineViewToRender: function () {
		var currentWindowView = this.isMounted() ? this.getLocalStorageBasedComponent() 
			: React.createElement(Welcome, {onButtonClick: this.handleButtonClick});

		return this.setState({currentWindowView: currentWindowView}); 
	}, 

	render: function () {
		return (
			React.createElement("div", {id: "shsc_subcomponents_wrapper"}, 
				React.createElement("div", {id: "navigation_wrapper"}, 
					React.createElement(Navigation, null)
				), 
				React.createElement("div", {id: "window_wrapper"}, 
					this.state.currentWindowView
				)
			)
		);
	}
});

module.exports = ShopScraper;
