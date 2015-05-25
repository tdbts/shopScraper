var React = require('react'), 
	StoreCircularComponent = require('./StoreCircularComponent'), 
	Spinner = require('./Spinner');

var ThreeColumnsView = React.createClass({displayName: "ThreeColumnsView",
	// getInitialState: function () {
	// 	return {
	// 		'isOccupied': {
	// 			'column_left': false, 
	// 			'column_middle': false, 
	// 			'column_right': false 
	// 		}
	// 	};	
	// }, 

	getDefaultProps: function () {
		return {
			'viewType': 'threeColumns', 
			'columnPositions': ["left", "middle", "right"]
		};
	}, 

	getColumnID: function (index) { 

		return "column_" + this.props.columnPositions[index];
	}, 

	componentDidMount: function () {
		// var columnID, i;

		// for (i = 0; i < this.props.columnPositions.length; i++) {
		// 	columnID = this.getColumnID(i); 

		// 	React.render(this.props.listings[i], document.getElementById(columnID));
		// }
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
