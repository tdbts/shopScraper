var React = require('react'), 
	// DefaultLocationsSelector = require('./DefaultLocationsSelector'), 
	// ThreeColumnsView = require('./ThreeColumnsView'), 
	WelcomeColumn = require('./WelcomeColumn'); 

var Welcome = React.createClass({displayName: "Welcome", 
	getInitialState: function () {
		return {
			columnData: []
		};
	}, 

	componentDidMount: function () {
		var infoColumnsData;

		$.get('/WelcomePageDomData', function (data) {
			infoColumnsData = data.pop().welcomePage.infoColumns;
			
			this.handleDomData(infoColumnsData);
		
		}.bind(this));	
	}, 

	handleDomData: function (data) {
		var columns = [];

		data.forEach(function (columnObj, index) {
			columns[index] = React.createElement(WelcomeColumn, {columnID: columnObj.columnID, key: index, text: columnObj.text, glyphiconClass: columnObj.glyphiconClass});
			return;
		});

		this.setState({columnData: columns});

		return;
	}, 

	render: function () {
 		return (
			React.createElement("div", {className: "welcome_container"}, 
				React.createElement("div", {id: "jumbotron_container", className: "container"}, 
					React.createElement("div", {className: "col-sm-12"}, 	
						React.createElement("div", {id: "welcome_jumbotron", className: "jumbotron"}, 
							React.createElement("div", {id: "welcome_text_container"}, 
								React.createElement("h1", {id: "welcome_text"}, "Welcome To ShopScraper!")
							), 
							React.createElement("div", {id: "welcome_button_container"}, 
								React.createElement("button", {id: "welcome_button", type: "button", className: "btn btn-info btn-sm", onClick: this.props.onButtonClick}, 
								React.createElement("span", {id: "welcome_button_glyph", className: "fa fa-shopping-cart"}), " Click to Get Started")
							)
						)
					)
				), 
				React.createElement("div", {id: "landing_page_info_container", className: "container"}, 
					React.createElement("div", {id: "landing_page_info", className: "row"}, 
						this.state.columnData
					)
				)
			)
		);
	}
});

module.exports = Welcome;
