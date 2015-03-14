var React = require('react');

var StoreNavigationLogo = React.createClass({
	render: function () {
		
		return (
			<div data-ajax_route={this.props.store.storeHref} id={this.props.store.containerID} className="container_store_logo_navigation col-md-3 col-xs-6">
				<a href="#" className="store_navigation_link">
					<img id={this.props.store.imageID} className="store_logo" src={this.props.store.imageURL} alt={this.props.store.storeName} />
				</a>
			</div>
		);	
	}
});

module.exports = StoreNavigationLogo;


