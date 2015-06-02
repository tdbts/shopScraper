var React = require('react');

var ProductComponent = React.createClass({
	getDefaultProps: function () {
		return {
			carousel: false, 
			active: false
		};
	}, 

	render: function () {
		var productClassBase = "product_info", 
			productClassAddtion = this.props.carousel ? this.props.active 
				? " item active" : " item" : ""; 

		return (
			<div className={productClassBase + productClassAddtion}>
				<div className="container_product_name">
					<h3 className="product_name">{this.props.productName}</h3>
				</div>
				<div className="container_product_description">
					<p className="product_description">{this.props.productDescription}</p>
				</div>
				<div className="container_product_price">
					<p className="product_price"><strong>{this.props.price}</strong></p>
				</div>
				<div className="container_product_image">
					<img className="product_image" src={this.props.imageUrl} />
				</div>
			</div>
		);
	}
});	

module.exports = ProductComponent;
