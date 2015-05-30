var React = require('react'), 
	StoreCircularComponent = require('./StoreCircularComponent'), 
	ProductComponent = require('./ProductComponent'),
	ThreeColumnsView = require('./ThreeColumnsView');

var ViewListings = React.createClass({

	processStoreListingsData: function (storeListings) {

		var circularListingsComponents = storeListings.map(this.collectCircularListingsComponents);

		return <ThreeColumnsView listings={circularListingsComponents} />;
	}, 

	collectCircularListingsComponents: function (store) {
		
		var products = [];

		store.products.forEach(function (productData) {

			this.filterProductBySearchText(productData, products);
		
		}.bind(this));

		return <StoreCircularComponent storeName={store.storeName} startDate={store.startDate} endDate={store.endDate} products={products} />;
	}, 

	filterProductBySearchText: function (productData, dest) {
		var productName = productData.productName.toLowerCase(), 
			productDescription = productData.productDescription.toLowerCase(), 
			searchFieldText = this.props.searchFieldText.toLowerCase();

		if ((productName.indexOf(searchFieldText) !== -1) || (productDescription.indexOf(searchFieldText) !== -1)) {
		
			dest.push(<ProductComponent key={productData.shsc_id} {...productData} />);
		}

		return;		
	}, 

	componentDidUpdate: function () {
		// DEVELOPMENT ONLY
		// console.log("VIEWLISTINGS UPDATED: ", this.props.searchFieldText); 
		
		this.processStoreListingsData(this.props.storeListings);
	},

	render: function () { 

		var storeProductListings = this.processStoreListingsData(this.props.storeListings);

		return (
			<div id="view_listings_component">
				{storeProductListings}
			</div>
		);
	}
});

module.exports = ViewListings;
