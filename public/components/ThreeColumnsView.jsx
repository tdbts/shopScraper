var React = require('react');

var ThreeColumnsView = React.createClass({
	getDefaultProps: function () {
		return {
			'viewType': 'threeColumns', 
			'columnPositions': ["left", "middle", "right"]
		};
	}, 

	render: function () {
		return (
			<div id="three_columns_view">
				<div id="container_three_columns" className="container">
					<div id="three_columns_row" className="row">
						<div id="column_left" className="col-md-3 store_listings_column">
							{this.props.listings[0]}
						</div>
						<div className="col-md-1 space_column"></div>
						<div id="column_middle" className="col-md-3 store_listings_column">
							{this.props.listings[1]}
						</div>
						<div className="col-md-1 space_column"></div>
						<div id="column_right" className="col-md-3 store_listings_column">
							{this.props.listings[2]}
						</div>
						<div className="col-md-1 space_column"></div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = ThreeColumnsView;
