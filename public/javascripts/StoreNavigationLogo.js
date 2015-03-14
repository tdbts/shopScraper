var React = require('react');

var StoreNavigationLogo = React.createClass({displayName: "StoreNavigationLogo",
	render: function () {
		
		return (
			React.createElement("div", {"data-ajax_route": this.props.store.storeHref, id: this.props.store.containerID, className: "container_store_logo_navigation col-md-3 col-xs-6"}, 
				React.createElement("a", {href: "#", className: "store_navigation_link"}, 
					React.createElement("img", {id: this.props.store.imageID, className: "store_logo", src: this.props.store.imageURL, alt: this.props.store.storeName})
				)
			)
		);	
	}
});

module.exports = StoreNavigationLogo;


