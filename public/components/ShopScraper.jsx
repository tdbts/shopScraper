var React = require('react'), 
	Navigation = require('./Navigation'), 
	Welcome = require('./Welcome'), 
	Spinner = require('./Spinner'), 
	DefaultLocationsSelector = require('./DefaultLocationsSelector'),
	ViewListings = require('./ViewListings'),  
	ThreeColumnsView = require('./ThreeColumnsView');

var ShopScraper = React.createClass({
	getInitialState: function () {
		return {
			currentWindowView: <Welcome onButtonClick={this.determineViewToRender} />, 
			filterText: ""
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

	getLocalStorageBasedComponent: function () {
		var localStorageData = this.getDataFromLocalStorage(), 
			currentViewComponent;

		if (localStorageData && this.defaultsAreValid(localStorageData)) {
			currentViewComponent = <ViewListings searchFieldText={this.state.filterText} toggleLoadingOverlay={this.toggleLoadingOverlay} defaultLocations={localStorageData} />;
		
		} else {
			currentViewComponent = <DefaultLocationsSelector handleSubmitSelections={this.handleSubmitSelections} handleClearSelections={this.handleClearSelections} />;
		}

		return currentViewComponent;
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

		this.setState({currentWindowView: <ViewListings searchFieldText={this.state.filterText} toggleLoadingOverlay={this.toggleLoadingOverlay} defaultLocations={defaultData} />});	

	}, 

	handleClearSelections: function () {

		$('.locations_dropdown').each(function () {
			this.selectedIndex = 0;
		});
	}, 

	determineViewToRender: function () {	
		var currentWindowView = this.isMounted() ? this.getLocalStorageBasedComponent() 
			: <Welcome onButtonClick={this.handleButtonClick} />;

		return this.setState({currentWindowView: currentWindowView}); 
	}, 

	toggleLoadingOverlay: function () {
		
		$('body').toggleClass('overlayDarken');
	}, 

	filterListings: function (userInputText) {

		this.setState({
			filterText: userInputText
		});

	}, 

	render: function () {
		var localStorageData = this.getDataFromLocalStorage();

		return (
			<div id="shsc_subcomponents_wrapper">
				<div id="navigation_wrapper">
					<Navigation filterListings={this.filterListings} />
				</div>
				<div id="window_wrapper">
					<ViewListings searchFieldText={this.state.filterText} toggleLoadingOverlay={this.toggleLoadingOverlay} defaultLocations={localStorageData} />;
				</div>
			</div>
		);
	}
});

module.exports = ShopScraper;
