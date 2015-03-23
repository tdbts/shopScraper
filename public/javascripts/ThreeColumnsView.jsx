var React = require('react'), 
	StoreCircularComponent = require('./StoreCircularComponent');

var ThreeColumnsView = React.createClass({
	componentDidMount: function () {
		$.get('/api/BigY', function (responseData) {
			React.render(<StoreCircularComponent circularData={responseData} />, document.getElementById('column_left'));
		});

		$.get('/api/StopAndShop', function (responseData) {
			React.render(<StoreCircularComponent circularData={responseData} />, document.getElementById('column_middle'));
		});			
		
		$.get('/api/ShopRite', function (responseData) {
			React.render(<StoreCircularComponent circularData={responseData} />, document.getElementById('column_right'));
		});
	}, 

	render: function () {
		return (
			<div id="three_columns_view">
				<div id="container_three_columns" className="container">
					<div id="three_columns_row" className="row">
						<div className="col-md-1"></div>
						<div id="column_left" className="col-md-3">
						</div>
						<div className="col-md-1"></div>
						<div id="column_middle" className="col-md-3">
						</div>
						<div className="col-md-1"></div>
						<div id="column_right" className="col-md-3">
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = ThreeColumnsView;
