var React = require('react');

var DefaultLocationsSelector = React.createClass({
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
						return locations.push(<option key={location.storeID} value={location._id}>{selectionText}</option>);
					} 
				}.bind(this));

				return locationSelectors.push(
					<div key={logo.storeID} className="location_selector_container">
						<div className="row">
							<div className="col-md-4"></div>
							<div id={logo.containerID} className="col-md-4 logo_container">
								<img alt={logo.storeName} id={logo.imageID} src={logo.imageURL} className="store_logo" />
							</div>
							<div className="col-md-4"></div>
						</div>
						<div className="row">
							<div className="col-md-3"></div>
							<div className="col-md-6 select_dom_element_container">
								<select className="form-control locations_selector">
									{locations}
								</select>
							</div>
							<div className="col-md-3"></div>
						</div>
					</div>
				);
			}.bind(this));
		} 
		console.log(locationSelectors);
		return (
			<div id="locations_selector_container" className="container">
				{locationSelectors}
			</div>
		);
	}
});

module.exports = DefaultLocationsSelector;
