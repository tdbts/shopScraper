var React = require('react'), 
	Navbar = require('./Navbar'), 
	SidePanel = require('./SidePanel');

var Navigation = React.createClass({
	render: function () {
		return (
	        <nav id="primary_navbar" className="navbar navbar-default navbar-static-top" role="navigation">
	        	<Navbar />
	        	<SidePanel />
	        </nav>			
		)
	}
});

module.exports = Navigation;