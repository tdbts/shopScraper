var React = require('react'), 
	Navbar = require('./Navbar'), 
	SidePanel = require('./SidePanel');

var Navigation = React.createClass({displayName: "Navigation",
	render: function () {
		return (
	        React.createElement("nav", {id: "primary_navbar", className: "navbar navbar-default navbar-static-top", role: "navigation"}, 
	        	React.createElement(Navbar, null), 
	        	React.createElement(SidePanel, null)
	        )			
		);
	}
});

module.exports = Navigation;