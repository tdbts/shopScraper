var React = require('react');

var Welcome = React.createClass({
	render: function () {
		return (
			<div className="welcome_container">
				<div id="welcome_jumbotron" className="jumbotron">
					<div id="welcome_text_container">
						<h1 id="welcome_text">Welcome To ShopScraper!</h1>
					</div>
					<div id="welcome_button_container">
						<button id="welcome_button" type="button" className="btn btn-info">
						<span id="welcome_button_glyph" className="fa fa-shopping-cart"></span> Click to Get Started</button>
					</div>
				</div>
				<div id="landing_page_info_container" className="container">
					<div id="landing_page_info" className="row">
						<div className="col-md-3">
							<div className="info_circle_container">
								<span className="fa-stack fa-3x">
									<span className="fa fa-circle fa-stack-2x info_circle"></span>
									<span className="glyphicon glyphicon-search fa-inverse"></span>
								</span>
							</div>
							<div className="landing_page_info_text">
								<p id="info_text">Find everything on sale &#8212 for all of your favorite 
								local grocery stores &#8212 consolidated in once place.  No more combing 
								through the Sunday newspaper looking for bargains, or comparing prices 
								between flyers, find everything you need right here at ShopScraper.</p>
							</div>
						</div>
						<div className="col-md-3">
							<div className="info_circle_container">
								<span className="fa-stack fa-3x">
									<span className="fa fa-circle fa-stack-2x info_circle"></span>
									<span className="fa fa-history fa-inverse"></span>
								</span>
							</div>
							<div className="landing_page_info_text">
								<p id="info_text">Ever look at the list price and have no idea whether you're 
								looking at a good deal or a rip-off?  Or have no idea what you paid for the 
								same exact product just last week?  At ShopScraper, you can search your old 
								store listings to see how prices have changed over time.</p>
							</div>
						</div>
						<div className="col-md-3">
							<div className="info_circle_container">
								<span className="fa-stack fa-3x">
									<span className="fa fa-circle fa-stack-2x info_circle"></span>
									<span className="fa fa-list fa-inverse"></span>
								</span>
							</div>
							<div className="landing_page_info_text">
								<p id="info_text">Lorem ipsum Adipisicing magna Ut in occaecat enim cupidatat dolor 
								reprehenderit mollit Excepteur nulla Duis velit culpa fugiat cupidatat 
								amet magna enim culpa sint irure ea incididunt.</p>
							</div>
						</div>
						<div className="col-md-3">
							<div className="info_circle_container">
								<span className="fa-stack fa-3x">
									<span className="fa fa-circle fa-stack-2x info_circle"></span>
									<span className="fa fa-envelope fa-inverse"></span>
								</span>
							</div>
							<div className="landing_page_info_text">
								<p id="info_text">Lorem ipsum Adipisicing magna Ut in occaecat enim cupidatat dolor 
								reprehenderit mollit Excepteur nulla Duis velit culpa fugiat cupidatat 
								amet magna enim culpa sint irure ea incididunt.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Welcome;
