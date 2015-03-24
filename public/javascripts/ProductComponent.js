var React = require('react');

var ProductComponent = React.createClass({displayName: "ProductComponent",
	render: function () {
		return (
			React.createElement("div", {className: "product_info"}, 
				React.createElement("div", {className: "container_product_name"}, 
					React.createElement("h3", {className: "product_name"}, this.props.product.productName)
				), 
				React.createElement("div", {className: "container_product_description"}, 
					React.createElement("p", {className: "product_description"}, this.props.product.productDescription)
				), 
				React.createElement("div", {className: "container_product_price"}, 
					React.createElement("p", {className: "product_price"}, React.createElement("strong", null, this.props.product.price))
				), 
				React.createElement("div", {className: "container_product_image"}, 
					React.createElement("img", {className: "product_image", src: this.props.product.imageUrl})
				)
			)
		);
	}
});	

module.exports = ProductComponent;
