var React = require('react');

var OneColumnView = React.createClass({displayName: "OneColumnView",
	getDefaultProps: function () {
		return {
			'viewType': 'oneColumn'
		};
	}, 

	render: function () {
		return (
			React.createElement("div", {id: "one_column_view"}, 
				React.createElement("div", {id: "container_one_column", className: "container"}, 
					React.createElement("div", {id: "one_column_row", className: "row"}, 
						React.createElement("div", {className: "col-md-4"}), 
						React.createElement("div", {id: "column_middle", className: "col-md-4"}
						), 
						React.createElement("div", {className: "col-md-4"})
					)
				)
			)			
		);
	}
});

module.exports = OneColumnView;