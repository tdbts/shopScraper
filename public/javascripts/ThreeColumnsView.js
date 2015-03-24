var React = require('react'), 
	StoreNavigationLogo = require('./StoreNavigationLogo'), 
	StoreCircularComponent = require('./StoreCircularComponent');

var ThreeColumnsView = React.createClass({displayName: "ThreeColumnsView",
	getInitialState: function () {
		return {
			'isOccupied': {
				'column_left': false, 
				'column_middle': false, 
				'column_right': false 
			}
		};	
	}, 

	getDefaultProps: function () {
		return {
			'viewType': 'threeColumns'
		};
	}, 

	componentDidMount: function () {
		// $.get('/api/BigY', function (responseData) {
		// 	React.render(<StoreCircularComponent circularData={responseData} />, document.getElementById('column_left'));
		// });

		// $.get('/api/StopAndShop', function (responseData) {
		// 	React.render(<StoreCircularComponent circularData={responseData} />, document.getElementById('column_middle'));
		// });			
		
		// $.get('/api/ShopRite', function (responseData) {
		// 	React.render(<StoreCircularComponent circularData={responseData} />, document.getElementById('column_right'));
		// });
		
		$.get('/ShopScraperNavigation', function (storeLogoData) {
			var i = 0, 
				columnID;

			for (columnID in this.state.isOccupied) {
				React.render(React.createElement(StoreNavigationLogo, {store: storeLogoData[i]}), 
					document.getElementById(columnID));
				
				i++;
				this.state.isOccupied[columnID] = true;
			}
		}.bind(this));
	}, 

	render: function () {
		return (
			React.createElement("div", {id: "three_columns_view"}, 
				React.createElement("div", {id: "container_three_columns", className: "container"}, 
					React.createElement("div", {id: "three_columns_row", className: "row"}, 
						React.createElement("div", {className: "col-md-1"}), 
						React.createElement("div", {id: "column_left", className: "col-md-3"}
						), 
						React.createElement("div", {className: "col-md-1"}), 
						React.createElement("div", {id: "column_middle", className: "col-md-3"}
						), 
						React.createElement("div", {className: "col-md-1"}), 
						React.createElement("div", {id: "column_right", className: "col-md-3"}
						)
					)
				)
			)
		);
	}
});

module.exports = ThreeColumnsView;
