var React = require('react'), 
	Navigation = require('./Navigation'), 
	Welcome = require('./Welcome'), 
	DefaultLocationsSelector = require('./DefaultLocationsSelector'),
	LoadingOverlay = require('./LoadingOverlay'), 
	ViewListings = require('./ViewListings');  

var ShopScraper = React.createClass({displayName: "ShopScraper",
	getInitialState: function () {
		return {
			filterText: "", 
			storeListings: []
		};
	}, 

	getDataFromLocalStorage: function () {
		return localStorage ? localStorage.getItem('userDefaultLocations') : null;
	}, 

	defaultsAreValid: function (localStorageData) {
		var parsedLocalStorageData = JSON.parse(localStorageData);

		return (parsedLocalStorageData.length > 1) && (parsedLocalStorageData.every(function (obj) {
			return obj.hasOwnProperty('companyID') && obj.hasOwnProperty('defaultLocationID');
		}));
	}, 

	defaultStoreSelectionRequired: function () {
		var localStorageData = this.getDataFromLocalStorage();

		if (localStorageData && this.defaultsAreValid(localStorageData)) {
			
			this.loadStoreProductData(localStorageData);

			return false;

		} else {
			return true;
		}
	}, 

	loadStoreProductData: function (userDefaultData) {

		this.getStoreListingsFromServer('user/locations', userDefaultData, this.handleStoreListingsServerResponse);
	}, 

	getStoreListingsFromServer: function (apiPath, userDefaultLocationData, callback) {
		
		$.get(apiPath, {data: userDefaultLocationData}, function (storeListings) {
			
			callback(storeListings);
		});
	}, 

	handleStoreListingsServerResponse: function (storeListings) {
		this.setState({
			storeListings: storeListings
		});

		this.updateWindowView(React.createElement(ViewListings, {searchFieldText: this.state.filterText, storeListings: this.state.storeListings}));		
	}, 

	getDefaultDataFromSelections: function () {
		var defaultData = [];

		$('.locations_dropdown').each(function () {
			
			defaultData.push({
				companyID: $(this).find('.no_selection_option').attr('value'), 
				defaultLocationID: this.value
			});
		});

		return defaultData;		
	}, 

	handleSubmitSelections: function () {

		var defaultData = JSON.stringify(this.getDefaultDataFromSelections());

		if (localStorage) {
			localStorage.setItem('userDefaultLocations', defaultData);
		}
	
		this.getStoreListingsFromServer('user/locations', this.getDataFromLocalStorage(), this.handleStoreListingsServerResponse);
	}, 

	handleClearSelections: function () {

		$('.locations_dropdown').each(function () {
			this.selectedIndex = 0;
		});
	}, 

	determineViewToRender: function () {	
		var currentWindowView = this.defaultStoreSelectionRequired() ? 
			React.createElement(DefaultLocationsSelector, {handleSubmitSelections: this.handleSubmitSelections, handleClearSelections: this.handleClearSelections})
			: React.createElement(LoadingOverlay, null);

		this.updateWindowView(currentWindowView);
	}, 

	filterListings: function (userInputText) {

		this.setState({
			filterText: userInputText
		});

	}, 

	componentDidUpdate: function () {

		this.updateWindowView(React.createElement(ViewListings, {searchFieldText: this.state.filterText, storeListings: this.state.storeListings}));
	}, 

	updateWindowView: function (component) {
		
		React.render(component, document.getElementById('window_wrapper'));
	},  

	componentDidMount: function () {
		
		this.updateWindowView(React.createElement(Welcome, {onButtonClick: this.determineViewToRender}));
	}, 

	render: function () {
		return (
			React.createElement("div", {id: "shsc_subcomponents_wrapper"}, 
				React.createElement("div", {id: "navigation_wrapper"}, 
					React.createElement(Navigation, {filterListings: this.filterListings})
				), 
				React.createElement("div", {id: "window_wrapper"}
				)
			)
		);
	}
});

module.exports = ShopScraper;
