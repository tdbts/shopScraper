var React = require('react');

var StoreNavigationLogo = React.createClass({
	render: function () {
		return (
			<div id={this.props.store.containerID} className="col-md-3 col-xs-6">
				<a href={this.props.store.storeHref}>
					<img id={this.props.store.imageID} className="store_logo" src={this.props.store.imageURL} alt={this.props.store.storeName} />
				</a>
			</div>
		);	
	}
});

module.exports = StoreNavigationLogo;


