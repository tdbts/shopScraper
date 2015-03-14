var React = require('react'), 
	ShopLogoRow = require('./ShopLogoRow'), 
	StoreCircularComponent = require('./StoreCircularComponent');

var ShopChooser = React.createClass({displayName: "ShopChooser",
	componentDidMount: function () {
		$('.container_store_logo_navigation').on('click', function () {

			var ajaxRoute = $(this).attr('data-ajax_route');
			
			$.get(ajaxRoute, function (responseData) {
				React.render(React.createElement(StoreCircularComponent, {circularData: responseData}), document.getElementById('test_store_components_container'));
			});
		});		
	}, 

	render: function () {

		return (
			React.createElement("div", null, 
				React.createElement(ShopLogoRow, {stores: this.props.stores})
			)
		);
	}
});

module.exports = ShopChooser;
