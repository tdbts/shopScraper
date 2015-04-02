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
		return localStorage ? localStorage.getItem('userDefaultLocations') : null;
	}, 

	getLocalStorageBasedComponent: function () {
		var defaultLocations = this.getDataFromLocalStorage(), 
			currentViewComponent;

		if (!defaultLocations) {
			currentViewComponent = React.createElement(DefaultLocationsSelector, {handleSubmitSelections: this.handleSubmitSelections, handleClearSelections: this.handleClearSelections});
		
		} else {
			// ...More code will be added here
			currentViewComponent = React.createElement(ThreeColumnsView, null);
		} 

		return currentViewComponent;
	}, 

	handleSubmitSelections: function () {
		var companyID, 
			defaultLocationID, 
			defaultData = [];

		$('.locations_dropdown').each(function () {
			companyID = $(this).find('.no_selection_option').attr('value');
			defaultLocationID = this.value;

			defaultData.push({
				companyID: companyID, 
				defaultLocationID: defaultLocationID
			});
		});

		// DEVELOPMENT ONLY
		console.log(defaultData);

		defaultData = JSON.stringify(defaultData);

		if (localStorage) {
			localStorage.setItem('userDefaultLocations', defaultData);
		}

		console.log(localStorage);

		this.setState({currentWindowView: React.createElement(ThreeColumnsView, {defaultLocations: defaultData})});	

	}, 

	handleClearSelections: function () {

		$('.locations_dropdown').each(function () {
			this.selectedIndex = 0;
		});
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
