var React = require('react');

var ThreeColumnsView = React.createClass({displayName: "ThreeColumnsView",
	getDefaultProps: function () {
		return {
			'viewType': 'threeColumns', 
			'columnPositions': ["left", "middle", "right"]
		};
	}, 

	render: function () {
		return (
			React.createElement("div", {id: "three_columns_view"}, 
				React.createElement("div", {id: "container_three_columns", className: "container"}, 
					React.createElement("div", {id: "three_columns_row", className: "row"}, 
						React.createElement("div", {id: "column_left", className: "col-md-3"}, 
							this.props.listings[0]
						), 
						React.createElement("div", {className: "col-md-1"}), 
						React.createElement("div", {id: "column_middle", className: "col-md-3"}, 
							this.props.listings[1]
						), 
						React.createElement("div", {className: "col-md-1"}), 
						React.createElement("div", {id: "column_right", className: "col-md-3"}, 
							this.props.listings[2]
						), 
						React.createElement("div", {className: "col-md-1"})
					)
				)
			)
		);
	}
});

module.exports = ThreeColumnsView;
