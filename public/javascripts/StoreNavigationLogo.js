var React = require('react');

var StoreNavigationLogo = React.createClass({displayName: "StoreNavigationLogo",
	render: function () {
		
		return (
			React.createElement("div", {id: this.props.store.containerID, className: "col-md-3 col-xs-6"}, 
				React.createElement("a", {href: this.props.store.storeHref}, 
					React.createElement("img", {id: this.props.store.imageID, className: "store_logo", src: this.props.store.imageURL, alt: this.props.store.storeName})
				)
			)
		);	
	}
});

module.exports = StoreNavigationLogo;


