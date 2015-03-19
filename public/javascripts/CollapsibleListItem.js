var React = require('react');

var CollapsibleListItem = React.createClass({displayName: "CollapsibleListItem",
	render: function () {
		return (
			React.createElement("li", {className: "panel_suboption"}, React.createElement("a", {href: "#"}, this.props.text))
		);
	}
});

module.exports = CollapsibleListItem;
