var React = require('react'), 
	Spinner = require('./Spinner'), 
	StoreCircularComponent = require('./StoreCircularComponent'),
	LoadingOverlay = require('./LoadingOverlay'),  
	ThreeColumnsView = require('./ThreeColumnsView'), 
	TwoColumnsView = require('./TwoColumnsView');

var ViewListings = React.createClass({displayName: "ViewListings",
	getInitialState: function () {
		return {
			'currentView': React.createElement(LoadingOverlay, null)
		};
	}, 

	componentDidMount: function () {
		// TESTING OUT LOADING OVERLAY
		// $('body').addClass('loading_overlay');
		// React.render(<Spinner />, document.getElementById('window_wrapper'));
		this.props.toggleLoadingOverlay();

		var circularListingsComponents = [];

		$.get('/user/locations', {data: this.props.defaultLocations}, function (storeListings) {
			
			storeListings.map(function (store) {
				circularListingsComponents.push(React.createElement(StoreCircularComponent, {circularData: store}));
			});

			this.setState({'currentView': React.createElement(ThreeColumnsView, {listings: circularListingsComponents})});
			
			// TESTING OUT LOADING OVERLAY 
			// $('body').removeClass('loading_overlay');
			this.props.toggleLoadingOverlay();

		}.bind(this));
	}, 

	render: function () {
		return (
			React.createElement("div", {id: "view_listings_component"}, 
				this.state.currentView
			)
		);
	}
});

module.exports = ViewListings;
