var React = require('react');

var Spinner = React.createClass({
	render: function () {
		return (
			<div className="spinner_container">
				<i className="fa fa-3x fa-spin fa-shopping-cart"></i>
			</div>
		);
	}
});

module.exports = Spinner;
