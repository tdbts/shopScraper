var React = require('react'), 
	StoreCircularComponent = require('./StoreCircularComponent'), 
	Spinner = require('./Spinner');

var ThreeColumnsView = React.createClass({
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
			<div id="three_columns_view">
				<div id="container_three_columns" className="container">
					<div id="three_columns_row" className="row">
						<div id="column_left" className="col-md-3">
							{this.props.listings[0]}
						</div>
						<div className="col-md-1"></div>
						<div id="column_middle" className="col-md-3">
							{this.props.listings[1]}
						</div>
						<div className="col-md-1"></div>
						<div id="column_right" className="col-md-3">
							{this.props.listings[2]}
						</div>
						<div className="col-md-1"></div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = ThreeColumnsView;
