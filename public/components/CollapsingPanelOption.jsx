var React = require('react'), 
	CollapsibleUnorderedList = require('./CollapsibleUnorderedList');

var CollapsingPanelOption = React.createClass({
	render: function () {
		var targetHref = "#" + this.props.config.targetID, 
			fontAwesomeClassName = "fa " + this.props.config.fontAwesomeIcon + " fa-fw";
			
		return (
			<li className="collapsing_panel_option">
				<a className="side_panel_option collapse_anchor" data-toggle="collapse" href={targetHref}>
					<span className={fontAwesomeClassName}></span> {this.props.config.optionName}<span className="fa arrow"></span>
				</a>
				<CollapsibleUnorderedList domID={this.props.config.targetID} subCategories={this.props.config.subCategories} />
			</li>
		);
	}
});

module.exports = CollapsingPanelOption;
