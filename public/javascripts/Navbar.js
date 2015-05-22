var React = require('react');

var Navbar = React.createClass({displayName: "Navbar",
	render: function () {
		return (
			React.createElement("div", {id: "header_wrapper"}, 
	            React.createElement("div", {className: "navbar-header"}, 
	                React.createElement("button", {type: "button", className: "navbar-toggle", "data-toggle": "collapse", "data-target": ".navbar-collapse"}, 
	                    React.createElement("span", {className: "sr-only"}, "Toggle navigation"), 
	                    React.createElement("span", {className: "icon-bar"}), 
	                    React.createElement("span", {className: "icon-bar"}), 
	                    React.createElement("span", {className: "icon-bar"})
	                ), 
	                React.createElement("a", {className: "navbar-brand", href: "/"}, "Shop Scraper")
	            ), 
	            React.createElement("div", {id: "myNavbar", className: "navbar-collapse collapse"}, 
	                React.createElement("div", {id: "navbar_left_wrapper"}, 
	                    React.createElement("ul", {className: "nav navbar-nav"}, 
                            React.createElement("li", {id: "home_li", className: "active navbar_navText"}, 
                                React.createElement("a", {href: "/", className: "navbar_link"}, "Home")
                            ), 
                            React.createElement("li", {id: "shops_li", className: "dropdown navbar_navText"}, 
                                React.createElement("a", {href: "#", className: "dropdown-toggle navbar_link", "data-toggle": "dropdown"}, "Shops", React.createElement("span", {className: "caret"})), 
                                React.createElement("ul", {className: "dropdown-menu"}, 
                                    React.createElement("li", {className: "navbar_store_link"}, 
                                        React.createElement("a", {href: "/BigY"}, "Big Y")
                                    ), 
                                    React.createElement("li", {className: "navbar_store_link"}, 
                                        React.createElement("a", {href: "/StopAndShop"}, "Stop & Shop")
                                    ), 
                                    React.createElement("li", {className: "navbar_store_link"}, 
                                        React.createElement("a", {href: "/ShopRite"}, "ShopRite")
                                    )
                                )
                            ), 
                            React.createElement("li", {id: "about_li", className: "navbar_navText"}, 
                                React.createElement("a", {href: "#"}, "About")
                            )
	                    )
	                ), 
	                React.createElement("div", {id: "navbar_right_wrapper"}, 
	                    React.createElement("ul", {id: "navbar_right_ul", className: "nav navbar-nav navbar-right fit_to_navbar"}, 
	                        React.createElement("li", null, 
	                            React.createElement("a", {href: "#", id: "email_icon_link", className: "navbar_icon_right fit_to_navbar"}, 
	                                React.createElement("span", {className: "fa fa-envelope fa-2x", "data-toggle": "tooltip", "data-placement": "bottom", title: "Email"})
	                            )
	                        ), 
	                        React.createElement("li", null, 
	                            React.createElement("a", {href: "#", id: "github_icon_link", className: "navbar_icon_right fit_to_navbar"}, 
	                                React.createElement("span", {className: "fa fa-github fa-2x", "data-toggle": "tooltip", "data-placement": "bottom", title: "Github Source Code"})
	                            )
	                        ), 
	                        React.createElement("li", null, 
	                            React.createElement("a", {href: "#", id: "login_icon", className: "navbar_icon_right fit_to_navbar"}, 
	                                React.createElement("span", {className: "fa fa-sign-in fa-2x", "data-toggle": "tooltip", "data-placement": "bottom", title: "Log In"})
	                            )
	                        )
	                    )
	                )
	            )			
			)
		);
	}
});

module.exports = Navbar;