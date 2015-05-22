var React = require('react');

var ProductComponent = React.createClass({displayName: "ProductComponent",
	render: function () {
		return (
			React.createElement("div", {className: "product_info"}, 
				React.createElement("div", {className: "container_product_name"}, 
					React.createElement("h3", {className: "product_name"}, this.props.productName)
				), 
				React.createElement("div", {className: "container_product_description"}, 
					React.createElement("p", {className: "product_description"}, this.props.productDescription)
				), 
				React.createElement("div", {className: "container_product_price"}, 
					React.createElement("p", {className: "product_price"}, React.createElement("strong", null, this.props.price))
				), 
				React.createElement("div", {className: "container_product_image"}, 
					React.createElement("img", {className: "product_image", src: this.props.imageUrl})
				)
			)
		);
	}
});	

module.exports = ProductComponent;
