/** @jsx React.DOM */

var React = require('react');
	
var StoreLogoData = [
	{
		storeName: "Big Y", 
		storeHref: "/BigY", 
		imageURL: "/images/big_y_logo.jpeg", 
		imageID: "big_y_logo", 
		containerID: "container_big_y_logo"
	},
	{
		storeName: "Stop and Shop", 
		storeHref: "/StopAndShop", 
		imageURL: "/images/stop_and_shop_logo.jpeg", 
		imageID: "stop_and_shop_logo", 
		containerID: "container_stop_and_shop_logo"
	},
	{
		storeName: "ShopRite", 
		storeHref: "/ShopRite", 
		imageURL: "/images/shop_rite_logo.jpeg", 
		imageID: "shop_rite_logo", 
		containerID: "container_shop_rite_logo"
	} 
];

var StoreNavigationLogo = React.createClass({displayName: "StoreNavigationLogo",
	render: function () {
		return (
			React.createElement("div", {id: this.props.store.containerID, className: "col-md-3 col-xs-6"}, 
				React.createElement("img", {id: this.props.store.imageID, className: "store_logo", src: this.props.store.imageURL, alt: this.props.store.storeName}), 
					React.createElement("a", {href: this.props.store.storeHref})
			)
		);	
	}
});

var ShopLogoRow = React.createClass({displayName: "ShopLogoRow",
	render: function () {
		var logos = [];
		this.props.stores.forEach(function (store) {
			logos.push(React.createElement(StoreNavigationLogo, {store: store}))
		});
		return (
			React.createElement("div", {id: "shop_row", className: "row"}, 
				logos
			)
		);
	}
});

var ShopChooser = React.createClass({displayName: "ShopChooser",
	render: function () {
		return (
			React.createElement("div", null, 
				React.createElement(ShopLogoRow, null)
			)
		);
	}
});

React.render(React.createElement(ShopChooser, {stores: StoreLogoData}), document.getElementById('store_navigation_container'));
