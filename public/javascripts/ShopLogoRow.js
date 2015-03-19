var React = require('react'), 
	StoreNavigationLogo = require('./StoreNavigationLogo');

var ShopLogoRow = React.createClass({displayName: "ShopLogoRow",
	render: function () {
		var logos = [];
		
		this.props.stores.forEach(function (store) {
			logos.push(React.createElement(StoreNavigationLogo, {key: store.storeID, store: store}));
		});

		return (
			React.createElement("div", {id: "shop_row", className: "row"}, 
				logos
			)
		);
	}
});

module.exports = ShopLogoRow;