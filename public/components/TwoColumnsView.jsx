var React = require('react');

var TwoColumnsView = React.createClass({
	getDefaultProps: function () {
		return {
			'viewType': 'twoColumns'
		};
	}, 

	render: function () {
		return (
			<div id="two_columns_view">
				<div id="container_two_columns" className="container">
					<div id="two_columns_row" className="row">
						<div className="col-md-2"></div>
						<div id="column_left" className="col-md-3">
						</div>
						<div className="col-md-2"></div>
						<div id="column_right" className="col-md-3">
						</div>
						<div className="col-md-2"></div>
					</div>
				</div>
			</div>			
		);
	}
});

module.exports = TwoColumnsView;
