var React = require('react'), 
	ProductComponent = require('./ProductComponent');

var StoreCircularComponent = React.createClass({
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
			storeProducts.push(<ProductComponent key={productData.shsc_id} product={productData} />);
		});

		return (
			<div className="store_circular_component">
				<div className="store_header_component">
					<h1 className="header_store_name">{this.props.circularData.storeName}</h1>
				</div>
				<div className="store_circular_date_component">
					<h4 className="store_valid_dates"><em>Valid from {this.props.circularData.startDate} to {this.props.circularData.endDate}</em></h4>
				</div>
				<div className="container_circular_products">
					{storeProducts}
				</div>
			</div>
		);
	}
});

module.exports = StoreCircularComponent;