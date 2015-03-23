var React = require('react'), 
	StoreCircularComponent = require('./StoreCircularComponent');

var ThreeColumnsView = React.createClass({displayName: "ThreeColumnsView",
	componentDidMount: function () {
		$.get('/api/BigY', function (responseData) {
			React.render(React.createElement(StoreCircularComponent, {circularData: responseData}), document.getElementById('column_left'));
		});

		$.get('/api/StopAndShop', function (responseData) {
			React.render(React.createElement(StoreCircularComponent, {circularData: responseData}), document.getElementById('column_middle'));
		});			
		
		$.get('/api/ShopRite', function (responseData) {
			React.render(React.createElement(StoreCircularComponent, {circularData: responseData}), document.getElementById('column_right'));
		});
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
