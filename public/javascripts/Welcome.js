var React = require('react');

var Welcome = React.createClass({displayName: "Welcome",
	render: function () {
		return (
			React.createElement("div", {className: "welcome_container"}, 
				React.createElement("div", {id: "welcome_jumbotron", className: "jumbotron"}, 
					React.createElement("div", {id: "welcome_text_container"}, 
						React.createElement("h1", {id: "welcome_text"}, "Welcome To ShopScraper!")
					), 
					React.createElement("div", {id: "welcome_button_container"}, 
						React.createElement("button", {id: "welcome_button", type: "button", className: "btn btn-info"}, 
						React.createElement("span", {id: "welcome_button_glyph", className: "fa fa-shopping-cart"}), " Click to Get Started")
					)
				), 
				React.createElement("div", {id: "landing_page_info_container", className: "container"}, 
					React.createElement("div", {id: "landing_page_info", className: "row"}, 
						React.createElement("div", {className: "col-md-3"}, 
							React.createElement("div", {className: "info_circle_container"}, 
								React.createElement("span", {className: "fa-stack fa-3x"}, 
									React.createElement("span", {className: "fa fa-circle fa-stack-2x info_circle"}), 
									React.createElement("span", {className: "glyphicon glyphicon-search fa-inverse"})
								)
							), 
							React.createElement("div", {className: "landing_page_info_text"}, 
								React.createElement("p", {id: "info_text"}, "Lorem ipsum Adipisicing magna Ut in occaecat enim cupidatat dolor" + ' ' + 
								"reprehenderit mollit Excepteur nulla Duis velit culpa fugiat cupidatat" + ' ' + 
								"amet magna enim culpa sint irure ea incididunt.")
							)
						), 
						React.createElement("div", {className: "col-md-3"}, 
							React.createElement("div", {className: "info_circle_container"}, 
								React.createElement("span", {className: "fa-stack fa-3x"}, 
									React.createElement("span", {className: "fa fa-circle fa-stack-2x info_circle"}), 
									React.createElement("span", {className: "fa fa-history fa-inverse"})
								)
							), 
							React.createElement("div", {className: "landing_page_info_text"}, 
								React.createElement("p", {id: "info_text"}, "Lorem ipsum Adipisicing magna Ut in occaecat enim cupidatat dolor" + ' ' + 
								"reprehenderit mollit Excepteur nulla Duis velit culpa fugiat cupidatat" + ' ' + 
								"amet magna enim culpa sint irure ea incididunt.")
							)
						), 
						React.createElement("div", {className: "col-md-3"}, 
							React.createElement("div", {className: "info_circle_container"}, 
								React.createElement("span", {className: "fa-stack fa-3x"}, 
									React.createElement("span", {className: "fa fa-circle fa-stack-2x info_circle"}), 
									React.createElement("span", {className: "fa fa-list fa-inverse"})
								)
							), 
							React.createElement("div", {className: "landing_page_info_text"}, 
								React.createElement("p", {id: "info_text"}, "Lorem ipsum Adipisicing magna Ut in occaecat enim cupidatat dolor" + ' ' + 
								"reprehenderit mollit Excepteur nulla Duis velit culpa fugiat cupidatat" + ' ' + 
								"amet magna enim culpa sint irure ea incididunt.")
							)
						), 
						React.createElement("div", {className: "col-md-3"}, 
							React.createElement("div", {className: "info_circle_container"}, 
								React.createElement("span", {className: "fa-stack fa-3x"}, 
									React.createElement("span", {className: "fa fa-circle fa-stack-2x info_circle"}), 
									React.createElement("span", {className: "fa fa-envelope fa-inverse"})
								)
							), 
							React.createElement("div", {className: "landing_page_info_text"}, 
								React.createElement("p", {id: "info_text"}, "Lorem ipsum Adipisicing magna Ut in occaecat enim cupidatat dolor" + ' ' + 
								"reprehenderit mollit Excepteur nulla Duis velit culpa fugiat cupidatat" + ' ' + 
								"amet magna enim culpa sint irure ea incididunt.")
							)
						)
					)
				)
			)
		);
	}
});

module.exports = Welcome;
