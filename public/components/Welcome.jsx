var React = require('react'), 
	// DefaultLocationsSelector = require('./DefaultLocationsSelector'), 
	// ThreeColumnsView = require('./ThreeColumnsView'), 
	WelcomeColumn = require('./WelcomeColumn'); 

var Welcome = React.createClass({ 
	getInitialState: function () {
		return {
			columnData: []
		};
	}, 

	componentDidMount: function () {
		var infoColumnsData;

		$.get('/WelcomePageDomData', function (data) {
			infoColumnsData = data.pop().welcomePage.infoColumns;
			
			this.handleDomData(infoColumnsData);
		
		}.bind(this));	
	}, 

	handleDomData: function (data) {
		var columns = [];

		data.forEach(function (columnObj, index) {
			columns[index] = <WelcomeColumn columnID={columnObj.columnID} key={index} text={columnObj.text} glyphiconClass={columnObj.glyphiconClass} />;
			return;
		});

		this.setState({columnData: columns});

		return;
	}, 

	render: function () {
 		return (
			<div className="welcome_container">
				<div id="jumbotron_container" className="container">
					<div className="col-sm-12">	
						<div id="welcome_jumbotron" className="jumbotron">
							<div id="welcome_text_container">
								<h1 id="welcome_text">Welcome To ShopScraper!</h1>
							</div>
							<div id="welcome_button_container">
								<button id="welcome_button" type="button" className="btn btn-info btn-sm" onClick={this.props.onButtonClick}>
								<span id="welcome_button_glyph" className="fa fa-shopping-cart"></span> Click to Get Started</button>
							</div>
						</div>
					</div>
				</div>
				<div id="landing_page_info_container" className="container">
					<div id="landing_page_info" className="row">
						{this.state.columnData}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Welcome;
