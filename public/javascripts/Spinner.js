var React = require('react');

var Spinner = React.createClass({displayName: "Spinner",
	render: function () {
		return (
			React.createElement("div", {className: "spinner_container"}, 
				React.createElement("i", {className: "fa fa-spinner fa-pulse fa-5x spinner"})
			)
		);
	}
});

module.exports = Spinner;
