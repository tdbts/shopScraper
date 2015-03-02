var React = require('react'), 
	ShopLogoRow = require('./ShopLogoRow');

var ShopChooser = React.createClass({
	render: function () {

		return (
			<div>
				<ShopLogoRow stores={this.props.stores} />
			</div>
		);
	}
});

module.exports = ShopChooser;
