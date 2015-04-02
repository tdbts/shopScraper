var React = require('react');

var DefaultLocationsSelector = React.createClass({
	getInitialState: function () {
		return {
			storeLogoData: [], 
			storeLocationData: []
		};
	}, 

	componentDidMount: function () {
		$.get('/SelectLocationDefaults', function (data) {

			this.setState({
				storeLogoData: data.logoData, 
				storeLocationData: data.locationData
			});

		}.bind(this));
	}, 

	createArrayOfLocationOptions: function (logo) {
		var locations = [], 
			selectElementID, 
			selectionText;

		this.state.storeLocationData.map(function (location) {
			selectionText = location.name + " \u2014 " + location.address;

			if (location.companyID === logo.storeID) {
				return locations.push(<option key={location.storeID} value={location.storeID}>{selectionText}</option>);
			} 
		}.bind(this));	

		return locations;	
	},

	createLocationSelectors: function (locationSelectors) {
		
		if (this.state.storeLogoData && this.state.storeLocationData) {
			this.state.storeLogoData.map(function (logo) {

				var locations = this.createArrayOfLocationOptions(logo);

				selectElementID = "selectElement_" + logo.storeID;

				return locationSelectors.push(
					<div key={logo.storeID} className="location_selector_container">
						<div className="row">
							<div className="col-md-1"></div>
							<div id={logo.containerID} className="col-md-2 logo_container">
								<img alt={logo.storeName} id={logo.imageID} src={logo.imageURL} className="store_logo" />
							</div>
							<div className="col-md-9"></div>
						</div>
						<div className="row">
							<div className="col-md-1"></div>
							<div className="col-md-8 select_dom_element_container">
								<select id={selectElementID} className="form-control locations_dropdown">
									<option className="no_selection_option" value={logo.storeID}>&#42;&#42;&#42; No {logo.storeName} Location Selected &#42;&#42;&#42;</option>
									{locations}
								</select>
							</div>
							<div className="col-md-3"></div>
						</div>
					</div>
				);
			}.bind(this));
		} 	
	}, 

	createLocationSelectorButtons: function (locationSelectorButtons) {
		if (this.state.storeLogoData.length && this.state.storeLocationData.length) {
			locationSelectorButtons.push(
				<div key="0" id="location_defaults_selection_buttons_container">
					<span id="location_defaults_submit_button_container" className="defaults_button_container">
						<button id="location_defaults_submit_button" className="btn btn-info" type="button" onClick={this.props.handleSubmitSelections}>Set Default Locations</button> 
					</span>
					<span id="location_defaults_clear_button_container" className="defaults_button_container">
						<button id="location_defaults_clear_button" className="btn btn-danger" type="button" onClick={this.props.handleClearSelections}>Clear Selected Locations</button> 
					</span>				
				</div>
			);

		} else {
			locationSelectorButtons = [];
		}

		return locationSelectorButtons;
	}, 

	render: function () {
		var locationSelectors = [], 
			locationSelectorButtons = [];

		this.createLocationSelectors(locationSelectors);
		this.createLocationSelectorButtons(locationSelectorButtons);

		return (
			<div className="container">
				<div className="row">
					<div id="locations_selector_description" className="col-md-3">
						<div id="locsel_description_title_container">
							<h1 id="locsel_description_title">Select Your Local Store Locations</h1>
						</div>
						<div id="locsel_description_text_container">
							<p id="locsel_description_text">Lorem ipsum Incididunt 
							sint veniam sint occaecat dolor incididunt est dolor commodo 
							Ut exercitation sunt id enim in in cillum ullamco et enim 
							consectetur sint dolore dolor dolor est ut ut ea est in 
							officia et voluptate voluptate ex pariatur fugiat fugiat dolore 
							esse nostrud do Duis in amet sunt fugiat ut laborum labore 
							dolor labore tempor do quis laboris aliquip Excepteur adipisicing 
							id incididunt dolore minim Ut veniam in mollit ullamco mollit 
							eiusmod sunt Duis ullamco cillum est occaecat cupidatat sed qui 
							dolore quis et occaecat qui nulla dolor dolore pariatur fugiat 
							deserunt aliqua amet in incididunt ullamco dolor nisi nostrud 
							labore in sit laboris culpa occaecat nostrud ut occaecat enim 
							pariatur culpa esse sit dolor laboris ex irure laborum minim 
							anim adipisicing sunt ut proident esse sunt elit eiusmod amet 
							nulla fugiat enim ad quis incididunt aute do sit officia labore 
							adipisicing reprehenderit elit dolor quis aute anim amet aute 
							adipisicing nulla Ut culpa in enim sunt aliqua ex est anim ea 
							proident cillum minim irure occaecat proident exercitation dolore 
							sint officia veniam deserunt ut in nostrud anim dolore amet minim 
							eu eiusmod Ut culpa sed aute eu consectetur enim est irure proident 
							ut elit in nisi ut ex Ut nostrud occaecat magna officia consectetur 
							commodo aute reprehenderit sit eiusmod tempor mollit eiusmod.</p>
						</div>
					</div>
					<div className="col-md-1"></div>
					<div className="col-md-8">
						<div id="locations_selector_container">
							{locationSelectors}
						</div>
						<div id="default_submit_button_row" className="row">
							<div className="col-md-1"></div>
							<div id="location_defaults_selection_buttons_column" className="col-md-8">
								{locationSelectorButtons}
							</div>
							<div className="col-md-3"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = DefaultLocationsSelector;
