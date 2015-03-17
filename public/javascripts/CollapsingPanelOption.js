var React = require('react'), 
	CollapsibleUnorderedList = require('./CollapsibleUnorderedList');

var CollapsingPanelOption = React.createClass({displayName: "CollapsingPanelOption",
	render: function () {
		var targetHref = "#" + this.props.config.targetID, 
			fontAwesomeClassName = "fa " + this.props.config.fontAwesomeIcon + " fa-fw";
		return (
			React.createElement("li", {className: "collapsing_panel_option"}, 
				React.createElement("a", {className: "side_panel_option collapse_anchor", "data-toggle": "collapse", href: targetHref}, 
					React.createElement("span", {className: fontAwesomeClassName}), " ", this.props.config.optionName, React.createElement("span", {className: "fa arrow"})
				), 
				React.createElement(CollapsibleUnorderedList, {domID: this.props.config.targetID, subCategories: this.props.config.subCategories})
			)
		)
	}
});

module.exports = CollapsingPanelOption;
