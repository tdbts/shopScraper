var React = require('react'), 
	CollapsibleListItem = require('./CollapsibleListItem');

var CollapsibleUnorderedList = React.createClass({
	render: function () {
		var subCategories = [];

		this.props.subCategories.forEach(function (subCategory) {
			subCategories.push(<CollapsibleListItem key={subCategory.key} text={subCategory.text} />);
		});

		return (
			<ul id={this.props.domID} className="nav collapse panel_suboptions">
				{subCategories}
			</ul>	
		)
	}
});

module.exports = CollapsibleUnorderedList;
