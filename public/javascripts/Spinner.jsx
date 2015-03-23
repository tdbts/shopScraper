var React = require('react');

var Spinner = React.createClass({
	render: function () {
		return (
			<i className="fa fa-spinner fa-pulse fa-5x column_spinner"></i>
		);
	}
});

module.exports = Spinner;
