var React = require('react'), 
	Spinner = require('./Spinner'), 
	StoreCircularComponent = require('./StoreCircularComponent'),
	LoadingOverlay = require('./LoadingOverlay'),  
	ThreeColumnsView = require('./ThreeColumnsView'), 
	TwoColumnsView = require('./TwoColumnsView');

var ViewListings = React.createClass({
	getInitialState: function () {
		return {
			'currentView': <LoadingOverlay />
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
				circularListingsComponents.push(<StoreCircularComponent circularData={store} />);
			});

			this.setState({'currentView': <ThreeColumnsView listings={circularListingsComponents} />});
			
			// TESTING OUT LOADING OVERLAY 
			// $('body').removeClass('loading_overlay');
			this.props.toggleLoadingOverlay();

		}.bind(this));
	}, 

	render: function () {
		return (
			<div id="view_listings_component">
				{this.state.currentView}
			</div>
		);
	}
});

module.exports = ViewListings;
