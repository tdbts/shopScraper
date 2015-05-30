var React = require('react');

var StoreCircularComponent = React.createClass({
	componentDidMount: function () {
		// Make the sidebar as long as the page height
		$(".sidebar").height(Math.max($("#shsc_subcomponents_wrapper").height(), $(".sidebar").height()));
	}, 

	render: function () {
		return (
			<div className="store_circular_component">
				<div className="store_header_component">
					<h1 className="header_store_name">{this.props.storeName}</h1>
				</div>
				<div className="store_circular_date_component">
					<h4 className="store_valid_dates"><em>Valid from {this.props.startDate} to {this.props.endDate}</em></h4>
				</div>
				<div className="container_circular_products">
					{this.props.products}
				</div>
			</div>
		);
	}
});

module.exports = StoreCircularComponent;
