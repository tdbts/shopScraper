/** @jsx React.DOM */

var React = require('react'), 
	// StoreNavigationLogo = require('./StoreNavigationLogo'), 
	// ShopLogoRow = require('./ShopLogoRow'), 
	// ShopChooser = require('./ShopChooser'), 
	// TestReact = require('./TestReact');
	ShopChooser = require('../javascripts/ShopChooser');
	
var StoreLogoData = [
	{
		storeID: "0", 
		storeName: "Big Y", 
		storeHref: "/BigY", 
		imageURL: "/images/big_y_logo.jpeg", 
		imageID: "big_y_logo", 
		containerID: "container_big_y_logo"
	},
	{
		storeID: "1", 
		storeName: "Stop and Shop", 
		storeHref: "/StopAndShop", 
		imageURL: "/images/stop_and_shop_logo.jpeg", 
		imageID: "stop_and_shop_logo", 
		containerID: "container_stop_and_shop_logo"
	},
	{
		storeID: "2", 
		storeName: "ShopRite", 
		storeHref: "/ShopRite", 
		imageURL: "/images/shop_rite_logo.jpeg", 
		imageID: "shop_rite_logo", 
		containerID: "container_shop_rite_logo"
	} 
];

// var StoreNavigationLogo = React.createClass({
// 	render: function () {
// 		return (
// 			<div id={this.props.store.containerID} className="col-md-3 col-xs-6">
// 				<img id={this.props.store.imageID} className="store_logo" src={this.props.store.imageURL} alt={this.props.store.storeName} />
// 					<a href={this.props.store.storeHref}></a>
// 			</div>
// 		);	
// 	}
// });

// var ShopLogoRow = React.createClass({
// 	render: function () {
// 		var logos = [];
// 		this.props.stores.forEach(function (store) {
// 			logos.push(<StoreNavigationLogo store={store} />)
// 		});
// 		return (
// 			<div id="shop_row" className="row">
// 				{logos}
// 			</div>
// 		);
// 	}
// });

// var ShopChooser = React.createClass({
// 	render: function () {
// 		return (
// 			<div>
// 				<ShopLogoRow />
// 			</div>
// 		);
// 	}
// });

React.render(<ShopChooser stores={StoreLogoData} />, document.getElementById('store_navigation_container'));
// React.render(<TestReact />, document.getElementById('store_navigation_container'));