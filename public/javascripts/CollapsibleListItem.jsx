var React = require('react');

var CollapsibleListItem = React.createClass({
	render: function () {
		return (
			<li className="panel_suboption"><a href="#">{this.props.text}</a></li>
		);
	}
});

module.exports = CollapsibleListItem;
