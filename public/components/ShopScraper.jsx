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
			currentWindowView: <Welcome onButtonClick={this.determineViewToRender} />
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

		if (!localStorageData || !this.defaultsAreValid(localStorageData)) {
			currentViewComponent = <DefaultLocationsSelector handleSubmitSelections={this.handleSubmitSelections} handleClearSelections={this.handleClearSelections} />;
		
		} else {
			if (this.defaultsAreValid(localStorageData)) {

				currentViewComponent = <ViewListings toggleLoadingOverlay={this.toggleLoadingOverlay} defaultLocations={localStorageData} />;
			}
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

		var defaultData = this.getDefaultDataFromSelections();

		defaultData = JSON.stringify(defaultData);

		if (localStorage) {
			localStorage.setItem('userDefaultLocations', defaultData);
		}

		this.setState({currentWindowView: <ViewListings toggleLoadingOverlay={this.toggleLoadingOverlay} defaultLocations={defaultData} />});	

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

	render: function () {
		return (
			<div id="shsc_subcomponents_wrapper">
				<div id="navigation_wrapper">
					<Navigation />
				</div>
				<div id="window_wrapper">
					{this.state.currentWindowView}
				</div>
			</div>
		);
	}
});

module.exports = ShopScraper;
