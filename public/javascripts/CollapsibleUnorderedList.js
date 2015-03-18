var React = require('react'), 
	CollapsibleListItem = require('./CollapsibleListItem');

var CollapsibleUnorderedList = React.createClass({displayName: "CollapsibleUnorderedList",
	render: function () {
		var subCategories = [];

		this.props.subCategories.forEach(function (subCategory) {
			subCategories.push(React.createElement(CollapsibleListItem, {key: subCategory.key, text: subCategory.text}));
		});

		return (
			React.createElement("ul", {id: this.props.domID, className: "nav collapse panel_suboptions"}, 
				subCategories
			)	
		)
	}
});

module.exports = CollapsibleUnorderedList;
