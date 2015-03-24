var React = require('react');

var TwoColumnsView = React.createClass({displayName: "TwoColumnsView",
	getDefaultProps: function () {
		return {
			'viewType': 'twoColumns'
		};
	}, 

	render: function () {
		return (
			React.createElement("div", {id: "two_columns_view"}, 
				React.createElement("div", {id: "container_two_columns", className: "container"}, 
					React.createElement("div", {id: "two_columns_row", className: "row"}, 
						React.createElement("div", {className: "col-md-2"}), 
						React.createElement("div", {id: "column_left", className: "col-md-3"}
						), 
						React.createElement("div", {className: "col-md-2"}), 
						React.createElement("div", {id: "column_right", className: "col-md-3"}
						), 
						React.createElement("div", {className: "col-md-2"})
					)
				)
			)			
		);
	}
});

module.exports = TwoColumnsView;
