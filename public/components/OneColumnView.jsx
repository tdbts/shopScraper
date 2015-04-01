var React = require('react');

var OneColumnView = React.createClass({
	getDefaultProps: function () {
		return {
			'viewType': 'oneColumn'
		};
	}, 

	render: function () {
		return (
			<div id="one_column_view">
				<div id="container_one_column" className="container">
					<div id="one_column_row" className="row">
						<div className="col-md-4"></div>
						<div id="column_middle" className="col-md-4">
						</div>
						<div className="col-md-4"></div>
					</div>
				</div>
			</div>			
		);
	}
});

module.exports = OneColumnView;