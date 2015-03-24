var React = require('react'), 
	StoreCircularComponent = require('./StoreCircularComponent');

var StoreNavigationLogo = React.createClass({ 
	handleClickEvent: function () {
		var mountID = React.findDOMNode(this.refs.logo).parentNode.getAttribute('id'), 
			circularDataURL = this.props.store.storeHref;
		
		$.get(circularDataURL, function (responseData) {

			React.render(<StoreCircularComponent circularData={responseData} />, 
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
			<div ref="logo" data-ajax_route={this.props.store.storeHref} id={this.props.store.containerID} className="container_store_logo_navigation col-md-3 col-xs-6">
				<a href="#" className="store_navigation_link">
					<img id={this.props.store.imageID} className="store_logo" src={this.props.store.imageURL} alt={this.props.store.storeName} />
				</a>
			</div>
		);	
	}
});

module.exports = StoreNavigationLogo;
