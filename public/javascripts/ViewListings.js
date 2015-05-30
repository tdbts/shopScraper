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
			// 'currentView': <LoadingOverlay />
			storeListings: []
			// , 
			// displayedStoreListings: []
		};
	}, 

	handleStoreListingsData: function (storeListings) {
		console.log("HANDLING STORE LISTINGS");
		var circularListingsComponents = [];

		storeListings.map(function (store) { 
			var products = [];

			store.products.forEach(function (productData) {
				var productName = productData.productName.toLowerCase(), 
					productDescription = productData.productDescription.toLowerCase(), 
					searchFieldText = this.props.searchFieldText.toLowerCase();

				if ((productName.indexOf(searchFieldText) !== -1) || (productDescription.indexOf(this.props.searchFieldText) !== -1)) {
				
					products.push(React.createElement(ProductComponent, React.__spread({key: productData.shsc_id},  productData)));
				}

				return;
			}.bind(this));
			console.log("PRODUCTS LENGTH: ", products.length);
			circularListingsComponents.push(React.createElement(StoreCircularComponent, {storeName: store.storeName, startDate: store.startDate, endDate: store.endDate, products: products}));
		}.bind(this));

		// this.setState({displayedStoreListings: circularListingsComponents});
		// this.setState({'currentView': <ThreeColumnsView listings={circularListingsComponents} />});
		React.render(React.createElement(ThreeColumnsView, {listings: circularListingsComponents}), document.getElementById('view_listings_component'));
		// console.log(this.state.storeListings);
		// TESTING OUT LOADING OVERLAY 
		// $('body').removeClass('loading_overlay');
		this.props.toggleLoadingOverlay();		
	}, 

	componentDidUpdate: function () {
		console.log("VIEWLISTINGS UPDATED: ", this.props.searchFieldText); 
		this.handleStoreListingsData(this.state.storeListings);
	},

	componentDidMount: function () {
		React.render(React.createElement(LoadingOverlay, null), document.getElementById('view_listings_component'));

		// TESTING OUT LOADING OVERLAY
		// $('body').addClass('loading_overlay');
		// React.render(<Spinner />, document.getElementById('window_wrapper'));
		this.props.toggleLoadingOverlay();

		$.get('/user/locations', {data: this.props.defaultLocations}, function (storeListings) {
			
			this.setState({
				storeListings: storeListings
			});		
			this.handleStoreListingsData(this.state.storeListings);	

		}.bind(this)); 
	}, 

	render: function () {
		return (
			React.createElement("div", {id: "view_listings_component"}
			)
		);
	}
});

module.exports = ViewListings;
