var React = require('react'), 
	Spinner = require('./Spinner'), 
	StoreCircularComponent = require('./StoreCircularComponent'), 
	ProductComponent = require('./ProductComponent'), 
	LoadingOverlay = require('./LoadingOverlay'),  
	ThreeColumnsView = require('./ThreeColumnsView'), 
	TwoColumnsView = require('./TwoColumnsView');

var ViewListings = React.createClass({displayName: "ViewListings",
	getInitialState: function () {
		return {
			'currentView': React.createElement(LoadingOverlay, null)
		};
	}, 

	handleStoreListingsData: function (storeListings) {
		var circularListingsComponents = [];

		storeListings.map(function (store) { 
			var products = []; 

			store.products.forEach(function (productData) {
				products.push(React.createElement(ProductComponent, {key: productData.shsc_id, product: productData}));
			});

			circularListingsComponents.push(React.createElement(StoreCircularComponent, {storeName: store.storeName, startDate: store.startDate, endDate: store.endDate, products: products}));
		});

		this.setState({'currentView': React.createElement(ThreeColumnsView, {listings: circularListingsComponents})});
		
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
			React.createElement("div", {id: "view_listings_component"}, 
				this.state.currentView
			)
		);
	}
});

module.exports = ViewListings;
