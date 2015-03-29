var React = require('react'), 
	StoreNavigationLogo = require('./StoreNavigationLogo');

var ShopLogoRow = React.createClass({
	render: function () {
		var logos = [];
		
		this.props.stores.forEach(function (store) {
			logos.push(<StoreNavigationLogo key={store.storeID} store={store} />);
		});

		return (
			<div id="shop_row" className="row">
				{logos}
			</div>
		);
	}
});

module.exports = ShopLogoRow;