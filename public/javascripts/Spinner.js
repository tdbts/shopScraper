var React = require('react');

var Spinner = React.createClass({displayName: "Spinner",
	render: function () {
		return (
			React.createElement("i", {className: "fa fa-spinner fa-pulse fa-5x column_spinner"})
		);
	}
});

module.exports = Spinner;
