var React = require('react'), 
	Navigation = require('./Navigation'), 
	Welcome = require('./Welcome'), 
	ThreeColumnsView = require('./ThreeColumnsView');

var ShopScraper = React.createClass({
	getInitialState: function () {
		return {
			showWelcome: true
		};
	}, 

	handleButtonClick: function () {
		return this.setState({showWelcome: false});
	}, 

	render: function () {
		return (
			<div id="shsc_subcomponents_wrapper">
				<div id="navigation_wrapper">
					<Navigation />
				</div>
				<div id="window_wrapper">
					{this.state.showWelcome ? <Welcome onButtonClick={this.handleButtonClick} /> : <ThreeColumnsView />}
				</div>
			</div>
		);
	}
});

module.exports = ShopScraper;
