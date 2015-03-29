var React = require('react');

var Spinner = React.createClass({
	render: function () {
		return (
			<div className="spinner_container">
				<i className="fa fa-spinner fa-pulse fa-5x spinner"></i>
			</div>
		);
	}
});

module.exports = Spinner;
