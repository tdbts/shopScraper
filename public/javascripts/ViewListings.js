var React = require('react'), 
	Spinner = require('./Spinner'), 
	StoreCircularComponent = require('./StoreCircularComponent'), 
	ThreeColumnsView = require('./ThreeColumnsView'), 
	TwoColumnsView = require('./TwoColumnsView');

var ViewListings = React.createClass({displayName: "ViewListings",
	getInitialState: function () {
		return {
			'currentView': null
		};
	}, 

	componentDidMount: function () {
		var circularListingsComponents = [];

		$.get('/user/locations', {data: this.props.defaultLocations}, function (storeListings) {
			
			storeListings.map(function (store) {
				circularListingsComponents.push(React.createElement(StoreCircularComponent, {circularData: store}));
			});

			this.setState({'currentView': React.createElement(ThreeColumnsView, {listings: circularListingsComponents})});
		}.bind(this));
	}, 

	render: function () {
		return (
			React.createElement("div", {id: "view_listings_component"}, 
				this.state.currentView
			)
		);
	}
});

module.exports = ViewListings;
