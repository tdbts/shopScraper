var React = require('react'), 
	ShopLogoRow = require('./ShopLogoRow'), 
	StoreCircularComponent = require('./StoreCircularComponent');

var ShopChooser = React.createClass({
	componentDidMount: function () {
		$('.container_store_logo_navigation').on('click', function () {

			var ajaxRoute = $(this).attr('data-ajax_route');
			
			$.get(ajaxRoute, function (responseData) {
				React.render(<StoreCircularComponent circularData={responseData} />, document.getElementById('test_store_components_container'));
			});
		});		
	}, 

	render: function () {

		return (
			<div>
				<ShopLogoRow stores={this.props.stores} />
			</div>
		);
	}
});

module.exports = ShopChooser;
