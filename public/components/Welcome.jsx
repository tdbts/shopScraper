var React = require('react'), 
	ThreeColumnsView = require('./ThreeColumnsView');

var Welcome = React.createClass({
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
						<div className="col-md-3 info_column">
							<div className="info_circle_container">
								<span className="fa-stack fa-3x">
									<span className="fa fa-circle fa-stack-2x info_circle"></span>
									<span className="glyphicon glyphicon-search fa-inverse"></span>
								</span>
							</div>
							<div className="landing_page_info_text">
								<p className="info_text">Find everything on sale &mdash; for all of your favorite 
								local grocery stores &mdash; consolidated in once place.  No more combing 
								through the Sunday newspaper looking for bargains, or comparing prices 
								between flyers, find everything you need right here at ShopScraper.</p>
							</div>
						</div>
						<div className="col-md-3 info_column">
							<div className="info_circle_container">
								<span className="fa-stack fa-3x">
									<span className="fa fa-circle fa-stack-2x info_circle"></span>
									<span className="fa fa-history fa-inverse"></span>
								</span>
							</div>
							<div className="landing_page_info_text">
								<p className="info_text">Ever look at the list price and have no idea whether you're 
								looking at a good deal or a rip-off?  Or have no idea how much you paid for the 
								same exact product just last week?  At ShopScraper, you can search your old 
								store listings to see how prices have changed over time.</p>
							</div>
						</div>
						<div className="col-md-3 info_column">
							<div className="info_circle_container">
								<span className="fa-stack fa-3x">
									<span className="fa fa-circle fa-stack-2x info_circle"></span>
									<span className="fa fa-list fa-inverse"></span>
								</span>
							</div>
							<div className="landing_page_info_text">
								<p className="info_text">Certain products you just love &mdash; so there's no sense in searching 
								for them all over again whenever a new flyer is released.  Add the brands and 
								staples you can't do without to a saved collection of personal favorites, 
								where they will always be quick and easy to find.</p>
							</div>
						</div>
						<div className="col-md-3 info_column">
							<div className="info_circle_container">
								<span className="fa-stack fa-3x">
									<span className="fa fa-circle fa-stack-2x info_circle"></span>
									<span className="fa fa-envelope fa-inverse"></span>
								</span>
							</div>
							<div className="landing_page_info_text">
								<p className="info_text">Select the best products at the lowest prices and add them to your 
								shopping list for the week.  When you're done, email the bargains you selected to 
								yourself or to anyone you'd like.  The list will be ready and waiting for you when you get to 
								the store.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Welcome;
