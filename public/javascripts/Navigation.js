var React = require('react'), 
	Navbar = require('./Navbar'), 
	SidePanel = require('./SidePanel');

var Navigation = React.createClass({displayName: "Navigation",
	render: function () {
		return (
			React.createElement("div", {id: "navbar_container"}, 
		        React.createElement("nav", {id: "primary_navbar", className: "navbar navbar-default navbar-static-top", role: "navigation"}, 
		        	React.createElement(Navbar, null)
		        ), 
		        React.createElement("nav", {id: "sidepanel_container"}, 
		        	React.createElement(SidePanel, {filterListings: this.props.filterListings})
		        )
	        )			
		);
	}
});

module.exports = Navigation;