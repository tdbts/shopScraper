var React = require('react'), 
	Navigation = require('./Navigation'), 
	Welcome = require('./Welcome'), 
	DefaultLocationsSelector = require('./DefaultLocationsSelector'), 
	ThreeColumnsView = require('./ThreeColumnsView');

var ShopScraper = React.createClass({
	getInitialState: function () {
		return {
			showLocationsSelector: false, 
			showStoreListings: false, 
			currentWindowView: <Welcome onButtonClick={this.determineViewToRender} />
		};
	}, 

	getDataFromLocalStorage: function () {
		return localStorage ? localStorage.getItem('shopScraperData') : null;
	}, 

	getLocalStorageBasedComponent: function () {
		var shopScraperData = this.getDataFromLocalStorage(), 
			currentViewComponent;

		if (!shopScraperData) {
			currentViewComponent = <DefaultLocationsSelector />;
		
		} else {
			// ...More code will be added here
			currentViewComponent = <ThreeColumnsView />;
		} 

		return currentViewComponent;
	}, 

	determineViewToRender: function () {
		var currentWindowView = this.isMounted() ? this.getLocalStorageBasedComponent() 
			: <Welcome onButtonClick={this.handleButtonClick} />;

		return this.setState({currentWindowView: currentWindowView}); 
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
