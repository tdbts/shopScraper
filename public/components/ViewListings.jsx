var React = require('react'), 
	StoreCircularComponent = require('./StoreCircularComponent'), 
	ProductComponent = require('./ProductComponent'),
	ThreeColumnsView = require('./ThreeColumnsView'), 
	$ = window.jQuery || require('jquery');

var ViewListings = React.createClass({
	getInitialState: function () {
		return {
			smallScreenView: false
		};	
	},		

	processStoreListingsData: function (storeListings) {

		var circularListingsComponents = storeListings.map(this.collectCircularListingsComponents);

		return <ThreeColumnsView listings={circularListingsComponents} />;
	}, 

	handleEmptyFilterResults: function (arr) {
		arr.push(<ProductComponent key="1" productName="No Matching Products Found" productDescription="Your search did not return any results for this store." price="Zilch." imageUrl="http://dulieu.phim.pw/images/hinh404.png" />);
	}, 

	collectCircularListingsComponents: function (store) {
		
		var products = [];

		store.products.forEach(function (productData) {

			this.filterProductBySearchText(productData, products, this.collectProductComponents);
		
		}.bind(this));

		// DEVELOPMENT ONLY 
		console.log("PRODUCTS for " + store.storeName + ": ", products);

		if (products.length === 0) {
			this.handleEmptyFilterResults(products);
		}

		return <StoreCircularComponent storeName={store.storeName} startDate={store.startDate} endDate={store.endDate} products={products} />;
	}, 

	filterProductBySearchText: function (productData, dest, callback) {
		var productName = productData.productName.toLowerCase(), 
			productDescription = productData.productDescription.toLowerCase(), 
			searchFieldText = this.props.searchFieldText.toLowerCase();

		if ((productName.indexOf(searchFieldText) !== -1) || (productDescription.indexOf(searchFieldText) !== -1)) {
		
			// dest.push(<ProductComponent key={productData.shsc_id} {...productData} />);
			callback(productData, dest);
		}

		return;		
	},

	collectProductComponents: function (productData, dest) {
		var carouselBool = true, 
			activeBool = false;

		if ($(window).width() > 992) {
			dest.push(<ProductComponent key={productData.shsc_id} {...productData} />);
		
		} else {	
			if (dest.length === 0) {
				activeBool = true;
			}

			dest.push(<ProductComponent key={productData.shsc_id} {...productData} carousel={carouselBool} active={activeBool} />); 
		}
	}, 

	setViewState: function () {
		if (!this.state.smallScreenView && $(window).width() < 992) {
			this.setState({smallScreenView: true})
		
		} else {
			if (this.state.smallScreenView && $(window).width() >= 992) {
				this.setState({smallScreenView: false});
			}
		}
	}, 

	componentDidMount: function () {
		
		$('.sidebar').css({left: 0}); 
		$('#window_wrapper').css({marginLeft: 250});

		this.setViewState();

		$(window).on('resize', this.setViewState);
	}, 

	componentWillUnmount: function () {
		$(window).off('resize', this.setViewState)
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
