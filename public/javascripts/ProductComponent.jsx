var React = require('react');

var ProductComponent = React.createClass({
	render: function () {
		return (
			<div className="product_info">
				<div className="container_product_name">
					<h3 className="product_name">{this.props.product.productName}</h3>
				</div>
				<div className="container_product_description">
					<p className="product_description">{this.props.product.productDescription}</p>
				</div>
				<div className="container_product_price">
					<p className="product_price">{this.props.product.price}</p>
				</div>
				<div className="container_product_image">
					<img className="product_image" src={this.props.product.imageUrl} />
				</div>
			</div>
		)
	}
});

module.exports = ProductComponent;