var React = require('react'), 
	ShopLogoRow = require('./ShopLogoRow');

var ShopChooser = React.createClass({displayName: "ShopChooser",
	render: function () {
		
		return (
			React.createElement("div", null, 
				React.createElement(ShopLogoRow, {stores: this.props.stores})
			)
		);
	}
});

module.exports = ShopChooser;