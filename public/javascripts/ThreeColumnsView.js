var React = require('react'), 
	StoreCircularComponent = require('./StoreCircularComponent');

var ThreeColumnsView = React.createClass({displayName: "ThreeColumnsView",
	componentDidMount: function () {
		/* Placeholder - Testing out how UI will look */
		$.get('/api/BigY', function (responseData) {
			React.render(React.createElement(StoreCircularComponent, {circularData: responseData}), document.getElementById('column_one'));
		});

		$.get('/api/StopAndShop', function (responseData) {
			React.render(React.createElement(StoreCircularComponent, {circularData: responseData}), document.getElementById('column_two'));
		});			
		
		$.get('/api/ShopRite', function (responseData) {
			React.render(React.createElement(StoreCircularComponent, {circularData: responseData}), document.getElementById('column_three'));
		});
	}, 

	render: function () {
		return (
			React.createElement("div", {id: "three_columns_view"}, 
				React.createElement("div", {id: "container_three_columns", className: "container"}, 
					React.createElement("div", {id: "three_columns_row", className: "row"}, 
						React.createElement("div", {className: "col-md-1"}), 
						React.createElement("div", {id: "column_one", className: "col-md-3"}
						), 
						React.createElement("div", {className: "col-md-1"}), 
						React.createElement("div", {id: "column_two", className: "col-md-3"}
						), 
						React.createElement("div", {className: "col-md-1"}), 
						React.createElement("div", {id: "column_three", className: "col-md-3"}
						)
					)
				)
			)
		);
	}
});

module.exports = ThreeColumnsView;
