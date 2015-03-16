var React = require('react'), 
	SearchField = require('./SearchField');

var SidePanel = React.createClass({displayName: "SidePanel",
	toggleActiveClass: function (eventName, classManipulationMethod) {
		$('.panel_suboptions').on(eventName, function () {
			var parentListItem = $(this).parents('.collapsing_list_item');

			if (parentListItem.length === 1) {
				$(parentListItem)[classManipulationMethod]('active');
			}
		});
	}, 

	componentDidMount: function () {
		this.toggleActiveClass('show.bs.collapse', 'addClass');
		this.toggleActiveClass('hide.bs.collapse', 'removeClass');

		$('.panel_suboptions').on('shown.bs.collapse', function (e) {
			$(this).parent().siblings('.collapsing_list_item').find('.panel_suboptions').removeClass('in');
		});
	}, 

	render: function () {
		return (
		    React.createElement("div", {className: "navbar-default sidebar", role: "navigation"}, 
		        React.createElement("div", {className: "sidebar-nav navbar-collapse"}, 
		            React.createElement("ul", {className: "nav", id: "side-menu"}, 
		                React.createElement("li", {className: "sidebar-search"}, 
		                    React.createElement(SearchField, null)
		                ), 
		                React.createElement("li", {className: "collapsing_list_item"}, 
		                    React.createElement("a", {className: "side_panel_option collapse_anchor", "data-toggle": "collapse", href: "#dashboard_panel_option"}, React.createElement("span", {className: "fa fa-dashboard fa-fw"}), " Dashboard", React.createElement("span", {className: "fa arrow"})), 
		                    React.createElement("ul", {id: "dashboard_panel_option", className: "nav collapse panel_suboptions"}, 
		                        React.createElement("li", {className: "panel_suboption"}, React.createElement("a", {href: "#"}, "Add Store")), 
		                        React.createElement("li", {className: "panel_suboption"}, React.createElement("a", {href: "#"}, "Swap Store")), 
		                        React.createElement("li", {className: "panel_suboption"}, React.createElement("a", {href: "#"}, "Add Favorite"))
		                    )
		                ), 
		                React.createElement("li", {className: "collapsing_list_item"}, 
		                    React.createElement("a", {className: "side_panel_option collapse_anchor", "data-toggle": "collapse", href: "#favorites_panel_option"}, React.createElement("span", {className: "fa fa-thumbs-up fa-fw"}), " Favorites", React.createElement("span", {className: "fa arrow"})), 
		                    React.createElement("ul", {id: "favorites_panel_option", className: "nav collapse panel_suboptions"}, 
		                        React.createElement("li", {className: "panel_suboption"}, React.createElement("a", {href: "#"}, "Brawny")), 
		                        React.createElement("li", {className: "panel_suboption"}, React.createElement("a", {href: "#"}, "Oreo")), 
		                        React.createElement("li", {className: "panel_suboption"}, React.createElement("a", {href: "#"}, "Chicken Broth")), 
		                        React.createElement("li", {className: "panel_suboption"}, React.createElement("a", {href: "#"}, "Beer"))
		                    )
		                ), 
		                React.createElement("li", null, 
		                    React.createElement("a", {className: "side_panel_option", href: "#"}, React.createElement("span", {className: "fa fa-user fa-fw"}), " User")
		                ), 
		                React.createElement("li", {className: "collapsing_list_item"}, 
		                    React.createElement("a", {className: "side_panel_option collapse_anchor", "data-toggle": "collapse", href: "#lists_panel_option"}, React.createElement("span", {className: "fa fa-edit fa-fw"}), " Lists", React.createElement("span", {className: "fa arrow"})), 
		                    React.createElement("ul", {id: "lists_panel_option", className: "nav collapse panel_suboptions"}, 
		                        React.createElement("li", {className: "panel_suboption"}, React.createElement("a", {href: "#"}, "Stop & Shop")), 
		                        React.createElement("li", {className: "panel_suboption"}, React.createElement("a", {href: "#"}, "Shop Rite"))
		                    )
		                ), 
		                React.createElement("li", {className: "collapsing_list_item"}, 
		                    React.createElement("a", {className: "side_panel_option collapse_anchor", "data-toggle": "collapse", href: "#settings_panel_option"}, React.createElement("span", {className: "fa fa-cog fa-fw"}), " Settings", React.createElement("span", {className: "fa arrow"})), 
		                    React.createElement("ul", {id: "settings_panel_option", className: "nav collapse panel_suboptions"}, 
		                        React.createElement("li", {className: "panel_suboption"}, React.createElement("a", {href: "#"}, "Display")), 
		                        React.createElement("li", {className: "panel_suboption"}, React.createElement("a", {href: "#"}, "Search")), 
		                        React.createElement("li", {className: "panel_suboption"}, React.createElement("a", {href: "#"}, "Notifications")), 
		                        React.createElement("li", {className: "panel_suboption"}, React.createElement("a", {href: "#"}, "Defaults"))
		                    )
		                ), 
		                React.createElement("li", null, 
		                    React.createElement("a", {className: "side_panel_option", href: "#"}, React.createElement("span", {className: "fa fa-history fa-fw"}), " History")
		                )
		            )
		        )
		    )
		)
	}
});

module.exports = SidePanel;