var React = require('react');

var Spinner = React.createClass({displayName: "Spinner",
	render: function () {
		return (
			React.createElement("div", {className: "spinner_container"}, 
				React.createElement("i", {className: "fa fa-3x fa-spin fa-shopping-cart"})
			)
		);
	}
});

module.exports = Spinner;
