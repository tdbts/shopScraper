var React = require('react'), 
	StoreCircularComponent = require('./StoreCircularComponent'), 
	StoreNavigationLogo = require('./StoreNavigationLogo');

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
		
		// $.get('/ShopScraperNavigation', function (storeLogoData) {
		// 	var i = 0, 
		// 		columnID;

		// 	storeLogoData = JSON.parse(storeLogoData); 

		// 	for (columnID in this.state.isOccupied) {
		// 		React.render(<StoreNavigationLogo store={storeLogoData[i]} />, 
		// 			document.getElementById(columnID));
				
		// 		i++;
		// 		this.state.isOccupied[columnID] = true;
		// 	}
		// }.bind(this));
		
		$.get('/user/locations', {data: this.props.defaultLocations}, function (storeListings) {
			var columnIDs = ["left", "middle", "right"];

			return storeListings.map(function (store, index) {
				var columnID = "column_" + columnIDs[index];
				console.log(columnID);
				React.render(React.createElement(StoreCircularComponent, {circularData: store}), document.getElementById(columnID));
			});
		});
	}, 

	render: function () {
		return (
			React.createElement("div", {id: "three_columns_view"}, 
				React.createElement("div", {id: "container_three_columns", className: "container"}, 
					React.createElement("div", {id: "three_columns_row", className: "row"}, 
						React.createElement("div", {id: "column_left", className: "col-md-3"}
						), 
						React.createElement("div", {className: "col-md-1"}), 
						React.createElement("div", {id: "column_middle", className: "col-md-3"}
						), 
						React.createElement("div", {className: "col-md-1"}), 
						React.createElement("div", {id: "column_right", className: "col-md-3"}
						), 
						React.createElement("div", {className: "col-md-1"})
					)
				)
			)
		);
	}
});

module.exports = ThreeColumnsView;
