var React = require('react');

var DefaultLocationsSelector = React.createClass({displayName: "DefaultLocationsSelector",
	getInitialState: function () {
		return {
			storeLogoData: [], 
			storeLocationData: []
		};
	}, 

	componentDidMount: function () {
		$.get('/test/SelectLocationDefaults', function (data) {
			var json = JSON.parse(data)[0];

			this.setState({
				storeLogoData: json.logoData, 
				storeLocationData: json.locationData
			});
		}.bind(this));
	}, 

	render: function () {
		var locationSelectors = [];
		console.log("STORE LOGO DATA: ", this.state.storeLogoData);
		console.log("STORE LOCATION DATA: ", this.state.storeLocationData);
		if (this.state.storeLogoData && this.state.storeLocationData) {
			this.state.storeLogoData.map(function (logo) {
				var locations = [];

				this.state.storeLocationData.map(function (location) {
					var selectionText = location.name + " \u2014 " + location.address;

					if (location.companyID === logo.storeID) {
						return locations.push(React.createElement("option", {key: location.storeID, value: location._id}, selectionText));
					} 
				}.bind(this));

				return locationSelectors.push(
					React.createElement("div", {key: logo.storeID, className: "location_selector_container"}, 
						React.createElement("div", {className: "row"}, 
							React.createElement("div", {className: "col-md-4"}), 
							React.createElement("div", {id: logo.containerID, className: "col-md-4 logo_container"}, 
								React.createElement("img", {alt: logo.storeName, id: logo.imageID, src: logo.imageURL, className: "store_logo"})
							), 
							React.createElement("div", {className: "col-md-4"})
						), 
						React.createElement("div", {className: "row"}, 
							React.createElement("div", {className: "col-md-3"}), 
							React.createElement("div", {className: "col-md-6 select_dom_element_container"}, 
								React.createElement("select", {className: "form-control locations_selector"}, 
									locations
								)
							), 
							React.createElement("div", {className: "col-md-3"})
						)
					)
				);
			}.bind(this));
		} 
		console.log(locationSelectors);
		return (
			React.createElement("div", {id: "locations_selector_container", className: "container"}, 
				locationSelectors
			)
		);
	}
});

module.exports = DefaultLocationsSelector;
