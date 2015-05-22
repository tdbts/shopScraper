var React = require('react');

var StoreCircularComponent = React.createClass({displayName: "StoreCircularComponent",
	componentDidMount: function () {
		// Make the sidebar as long as the page height
		$(".sidebar").height(Math.max($("#shsc_subcomponents_wrapper").height(), $(".sidebar").height()));
	}, 

	render: function () {
		return (
			React.createElement("div", {className: "store_circular_component"}, 
				React.createElement("div", {className: "store_header_component"}, 
					React.createElement("h1", {className: "header_store_name"}, this.props.storeName)
				), 
				React.createElement("div", {className: "store_circular_date_component"}, 
					React.createElement("h4", {className: "store_valid_dates"}, React.createElement("em", null, "Valid from ", this.props.startDate, " to ", this.props.endDate))
				), 
				React.createElement("div", {className: "container_circular_products"}, 
					this.props.products
				)
			)
		);
	}
});

module.exports = StoreCircularComponent;
