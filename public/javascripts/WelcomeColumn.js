var React = require('react');

var WelcomeColumn = React.createClass({displayName: "WelcomeColumn",
	render: function () {
		return (
			React.createElement("div", {id: this.props.columnID, className: "col-md-3 info_column"}, 
				React.createElement("div", {className: "info_circle_container"}, 
					React.createElement("span", {className: "fa-stack fa-3x"}, 
						React.createElement("span", {className: "fa fa-circle fa-stack-2x info_circle"}), 
						React.createElement("span", {className: this.props.glyphiconClass})
					)
				), 
				React.createElement("div", {className: "landing_page_info_text"}, 
					React.createElement("p", {className: "info_text"}, this.props.text)
				)
			)			
		);
	}
});

module.exports = WelcomeColumn;
