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
				storeLogoData: json.logoData[0].storeLogoData, 
				storeLocationData: json.locationData
			});
		}.bind(this));
	}, 

	createLocationSelectors: function (locationSelectors) {
		// console.log("STORE LOGO DATA: ", this.state.storeLogoData);
		// console.log("STORE LOCATION DATA: ", this.state.storeLocationData);
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
							React.createElement("div", {className: "col-md-1"}), 
							React.createElement("div", {id: logo.containerID, className: "col-md-2 logo_container"}, 
								React.createElement("img", {alt: logo.storeName, id: logo.imageID, src: logo.imageURL, className: "store_logo"})
							), 
							React.createElement("div", {className: "col-md-9"})
						), 
						React.createElement("div", {className: "row"}, 
							React.createElement("div", {className: "col-md-1"}), 
							React.createElement("div", {className: "col-md-8 select_dom_element_container"}, 
								React.createElement("select", {className: "form-control locations_selector"}, 
									React.createElement("option", {value: logo.storeID}, "*** No ", logo.storeName, " Location Selected ***"), 
									locations
								)
							), 
							React.createElement("div", {className: "col-md-3"})
						)
					)
				);
			}.bind(this));
		} 
		// console.log(locationSelectors);		
	}, 

	render: function () {
		var locationSelectors = [];

		this.createLocationSelectors(locationSelectors);

		return (
			React.createElement("div", {className: "container"}, 
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {id: "locations_selector_description", className: "col-md-3"}, 
						React.createElement("div", {id: "locsel_description_title_container"}, 
							React.createElement("h1", {id: "locsel_description_title"}, "Select Your Local Store Locations")
						), 
						React.createElement("div", {id: "locsel_description_text_container"}, 
							React.createElement("p", {id: "locsel_description_text"}, "Lorem ipsum Incididunt" + ' ' + 
							"sint veniam sint occaecat dolor incididunt est dolor commodo" + ' ' + 
							"Ut exercitation sunt id enim in in cillum ullamco et enim" + ' ' + 
							"consectetur sint dolore dolor dolor est ut ut ea est in" + ' ' + 
							"officia et voluptate voluptate ex pariatur fugiat fugiat dolore" + ' ' + 
							"esse nostrud do Duis in amet sunt fugiat ut laborum labore" + ' ' + 
							"dolor labore tempor do quis laboris aliquip Excepteur adipisicing" + ' ' + 
							"id incididunt dolore minim Ut veniam in mollit ullamco mollit" + ' ' + 
							"eiusmod sunt Duis ullamco cillum est occaecat cupidatat sed qui" + ' ' + 
							"dolore quis et occaecat qui nulla dolor dolore pariatur fugiat" + ' ' + 
							"deserunt aliqua amet in incididunt ullamco dolor nisi nostrud" + ' ' + 
							"labore in sit laboris culpa occaecat nostrud ut occaecat enim" + ' ' + 
							"pariatur culpa esse sit dolor laboris ex irure laborum minim" + ' ' + 
							"anim adipisicing sunt ut proident esse sunt elit eiusmod amet" + ' ' + 
							"nulla fugiat enim ad quis incididunt aute do sit officia labore" + ' ' + 
							"adipisicing reprehenderit elit dolor quis aute anim amet aute" + ' ' + 
							"adipisicing nulla Ut culpa in enim sunt aliqua ex est anim ea" + ' ' + 
							"proident cillum minim irure occaecat proident exercitation dolore" + ' ' + 
							"sint officia veniam deserunt ut in nostrud anim dolore amet minim" + ' ' + 
							"eu eiusmod Ut culpa sed aute eu consectetur enim est irure proident" + ' ' + 
							"ut elit in nisi ut ex Ut nostrud occaecat magna officia consectetur" + ' ' + 
							"commodo aute reprehenderit sit eiusmod tempor mollit eiusmod.")
						)
					), 
					React.createElement("div", {className: "col-md-1"}), 
					React.createElement("div", {className: "col-md-8"}, 
						React.createElement("div", {id: "locations_selector_container"}, 
							locationSelectors
						), 
						React.createElement("div", {id: "default_submit_button_row", className: "row"}, 
							React.createElement("div", {className: "col-md-1"}), 
							React.createElement("div", {id: "location_defaults_selection_buttons_container", className: "col-md-8"}, 
								React.createElement("span", {id: "location_defaults_submit_button_container", className: "defaults_button_container"}, 
									React.createElement("button", {id: "location_defaults_submit_button", className: "btn btn-info", type: "button"}, "Set Default Locations")
								), 
								React.createElement("span", {id: "location_defaults_clear_button_container", className: "defaults_button_container"}, 
									React.createElement("button", {id: "location_defaults_clear_button", className: "btn btn-danger", type: "button"}, "Clear Selected Locations")
								)
							), 
							React.createElement("div", {className: "col-md-3"})
						)
					)
				)
			)
		);
	}
});

module.exports = DefaultLocationsSelector;
