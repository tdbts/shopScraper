var React = require('react'), 
	ProductComponent = require('./ProductComponent');

var StoreCircularComponent = React.createClass({displayName: "StoreCircularComponent",
	// getInitialState: function () {
	// 	return {
	// 		circularData: ''
	// 	};
	// }, 

	// componentDidMount: function () {
	// 	 $.get(this.props.urlForData, function (responseData) {
	// 	 	if (this.isMounted()) {
	// 	 		this.setState({
	// 	 			circularData: responseData
	// 	 		});
	// 	 	}
	// 	 }.bind(this));
	// }, 

	render: function () {
		var storeProducts = [];

		this.props.circularData.products.forEach(function (productData) {
			storeProducts.push(React.createElement(ProductComponent, {key: productData.shsc_id, product: productData}));
		});

		return (
			React.createElement("div", {className: "store_circular_component"}, 
				React.createElement("div", {className: "store_header_component"}, 
					React.createElement("h1", {className: "header_store_name"}, this.props.circularData.storeName)
				), 
				React.createElement("div", {className: "store_circular_date_component"}, 
					React.createElement("h4", {className: "store_valid_dates"}, React.createElement("em", null, "Valid from ", this.props.circularData.startDate, " to ", this.props.circularData.endDate))
				), 
				React.createElement("div", {className: "container_circular_products"}, 
					storeProducts
				)
			)
		);
	}
});

module.exports = StoreCircularComponent;