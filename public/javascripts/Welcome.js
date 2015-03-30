var React = require('react'), 
	ThreeColumnsView = require('./ThreeColumnsView');

var Welcome = React.createClass({displayName: "Welcome",
	render: function () {
 		return (
			React.createElement("div", {className: "welcome_container"}, 
				React.createElement("div", {id: "jumbotron_container", className: "container"}, 
					React.createElement("div", {className: "col-sm-12"}, 	
						React.createElement("div", {id: "welcome_jumbotron", className: "jumbotron"}, 
							React.createElement("div", {id: "welcome_text_container"}, 
								React.createElement("h1", {id: "welcome_text"}, "Welcome To ShopScraper!")
							), 
							React.createElement("div", {id: "welcome_button_container"}, 
								React.createElement("button", {id: "welcome_button", type: "button", className: "btn btn-info btn-sm", onClick: this.props.onButtonClick}, 
								React.createElement("span", {id: "welcome_button_glyph", className: "fa fa-shopping-cart"}), " Click to Get Started")
							)
						)
					)
				), 
				React.createElement("div", {id: "landing_page_info_container", className: "container"}, 
					React.createElement("div", {id: "landing_page_info", className: "row"}, 
						React.createElement("div", {className: "col-md-3 info_column"}, 
							React.createElement("div", {className: "info_circle_container"}, 
								React.createElement("span", {className: "fa-stack fa-3x"}, 
									React.createElement("span", {className: "fa fa-circle fa-stack-2x info_circle"}), 
									React.createElement("span", {className: "glyphicon glyphicon-search fa-inverse"})
								)
							), 
							React.createElement("div", {className: "landing_page_info_text"}, 
								React.createElement("p", {className: "info_text"}, "Find everything on sale — for all of your favorite" + ' ' + 
								"local grocery stores — consolidated in once place.  No more combing" + ' ' + 
								"through the Sunday newspaper looking for bargains, or comparing prices" + ' ' + 
								"between flyers, find everything you need right here at ShopScraper.")
							)
						), 
						React.createElement("div", {className: "col-md-3 info_column"}, 
							React.createElement("div", {className: "info_circle_container"}, 
								React.createElement("span", {className: "fa-stack fa-3x"}, 
									React.createElement("span", {className: "fa fa-circle fa-stack-2x info_circle"}), 
									React.createElement("span", {className: "fa fa-history fa-inverse"})
								)
							), 
							React.createElement("div", {className: "landing_page_info_text"}, 
								React.createElement("p", {className: "info_text"}, "Ever look at the list price and have no idea whether you're" + ' ' + 
								"looking at a good deal or a rip-off?  Or have no idea how much you paid for the" + ' ' + 
								"same exact product just last week?  At ShopScraper, you can search your old" + ' ' + 
								"store listings to see how prices have changed over time.")
							)
						), 
						React.createElement("div", {className: "col-md-3 info_column"}, 
							React.createElement("div", {className: "info_circle_container"}, 
								React.createElement("span", {className: "fa-stack fa-3x"}, 
									React.createElement("span", {className: "fa fa-circle fa-stack-2x info_circle"}), 
									React.createElement("span", {className: "fa fa-list fa-inverse"})
								)
							), 
							React.createElement("div", {className: "landing_page_info_text"}, 
								React.createElement("p", {className: "info_text"}, "Certain products you just love, so there's no sense in searching" + ' ' + 
								"for them all over again whenever a new flyer is released.  Add the brands and" + ' ' + 
								"staples you can't do without to a saved collection of personal favorites," + ' ' + 
								"where they will always be quick and easy to find.")
							)
						), 
						React.createElement("div", {className: "col-md-3 info_column"}, 
							React.createElement("div", {className: "info_circle_container"}, 
								React.createElement("span", {className: "fa-stack fa-3x"}, 
									React.createElement("span", {className: "fa fa-circle fa-stack-2x info_circle"}), 
									React.createElement("span", {className: "fa fa-envelope fa-inverse"})
								)
							), 
							React.createElement("div", {className: "landing_page_info_text"}, 
								React.createElement("p", {className: "info_text"}, "Select the best products at the lowest prices and add them to your" + ' ' + 
								"shopping list for the week.  When you're done, email the bargains you selected to" + ' ' + 
								"yourself or to anyone you'd like.  The list will be ready and waiting for you when you get to" + ' ' + 
								"the store.")
							)
						)
					)
				)
			)
		);
	}
});

module.exports = Welcome;
