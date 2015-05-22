var React = require('react'), 
	Spinner = require('./Spinner'), 
	StoreCircularComponent = require('./StoreCircularComponent'), 
	ProductComponent = require('./ProductComponent'), 
	LoadingOverlay = require('./LoadingOverlay'),  
	ThreeColumnsView = require('./ThreeColumnsView'), 
	TwoColumnsView = require('./TwoColumnsView');

var ViewListings = React.createClass({
	getInitialState: function () {
		return {
			'currentView': <LoadingOverlay />
		};
	}, 

	handleStoreListingsData: function (storeListings) {
		var circularListingsComponents = [];

		storeListings.map(function (store) { 
			var products = []; 

			store.products.forEach(function (productData) {
				products.push(<ProductComponent key={productData.shsc_id} {...productData} />);
			});

			circularListingsComponents.push(<StoreCircularComponent storeName={store.storeName} startDate={store.startDate} endDate={store.endDate} products={products} />);
		});

		this.setState({'currentView': <ThreeColumnsView listings={circularListingsComponents} />});
		
		// TESTING OUT LOADING OVERLAY 
		// $('body').removeClass('loading_overlay');
		this.props.toggleLoadingOverlay();		
	}, 

	componentDidMount: function () {
		// TESTING OUT LOADING OVERLAY
		// $('body').addClass('loading_overlay');
		// React.render(<Spinner />, document.getElementById('window_wrapper'));
		this.props.toggleLoadingOverlay();

		$.get('/user/locations', {data: this.props.defaultLocations}, function (storeListings) {
			
			this.handleStoreListingsData(storeListings);			

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
