var React = require('react'), 
	Spinner = require('./Spinner'), 
	StoreCircularComponent = require('./StoreCircularComponent');

var StoreNavigationLogo = React.createClass({displayName: "StoreNavigationLogo", 
	handleClickEvent: function () {
		var mountID = React.findDOMNode(this.refs.logo).parentNode.getAttribute('id'), 
			circularDataURL = this.props.store.storeHref;

		React.render(React.createElement(Spinner, {key: this.props.store.imageID}), document.getElementById(mountID));
		
		$.get(circularDataURL, function (responseData) {

			React.render(React.createElement(StoreCircularComponent, {circularData: responseData}), 
				document.getElementById(mountID));
		});

	}, 

	componentDidMount: function () {
		$("#" + this.props.store.imageID).on('click', function () {
			this.handleClickEvent();
		}.bind(this));
	}, 

	render: function () {
		return (
			React.createElement("div", {ref: "logo", "data-ajax_route": this.props.store.storeHref, id: this.props.store.containerID, className: "container_store_logo_navigation col-md-3 col-xs-6"}, 
				React.createElement("a", {href: "#", className: "store_navigation_link"}, 
					React.createElement("img", {id: this.props.store.imageID, className: "store_logo", src: this.props.store.imageURL, alt: this.props.store.storeName})
				)
			)
		);	
	}
});

module.exports = StoreNavigationLogo;
