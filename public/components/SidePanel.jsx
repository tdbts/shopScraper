var React = require('react'), 
	SearchField = require('./SearchField'),  
	CollapsingPanelOption = require('./CollapsingPanelOption');

var SidePanel = React.createClass({
	componentDidMount: function () {
		/* *** Source: metisMenu.js *** */
		$('#side-menu').find('li').has('ul').children('a').on('click', function (e) {
			e.preventDefault();

			$(this).parent('li').toggleClass('active').children('ul').collapse('toggle');
			$(this).parent('li').siblings().removeClass('active').children('ul.in').collapse('hide');
		});
	}, 

	render: function () {
		// PLACEHOLDER -- This data will eventually come from localHost
		var dashboardSubCategories = [{text: "Add Store", key: "0"}, {text: "Swap Store", key: "1"}, {text: "Add Favorite", key: "2"}], 
			favoritesSubCategories = [{text: "Brawny", key: "0"}, {text: "Oreo", key: "1"}, {text: "Chicken Broth", key: "2"}, {text: "Beer", key: "3"}], 
			listsSubCategories = [{text: "Stop & Shop", key: "0"}, {text: "Shop Rite", key: "1"}], 
			settingsSubCategories = [{text: "Display", key: "0"}, {text: "Search", key: "1"}, {text: "Notifications", key: "2"}, {text: "Defaults", key: "3"}];

		var dashboardOptionConfig = {
			optionName: "Dashboard", 
			targetID: "dashboard_panel_option", 
			fontAwesomeIcon: "fa-dashboard", 
			subCategories: dashboardSubCategories
			},
			
			favoritesOptionConfig = {
				optionName: "Favorites", 
				targetID: "favorites_panel_option", 
				fontAwesomeIcon: "fa-thumbs-up", 
				subCategories: favoritesSubCategories
			}, 

			listsOptionConfig = {
				optionName: "Lists", 
				targetID: "lists_panel_option", 
				fontAwesomeIcon: "fa-edit", 
				subCategories: listsSubCategories
			}, 

			settingsOptionConfig = {
				optionName: "Settings", 
				targetID: "settings_panel_option", 
				fontAwesomeIcon: "fa-cog", 
				subCategories: settingsSubCategories
			};


		return (
		    <div className="navbar-default sidebar" role="navigation">
		        <div className="sidebar-nav navbar-collapse">
		            <ul className="nav" id="side-menu">
		                <li className="sidebar-search">
		                    <SearchField searchFieldText={this.props.searchFieldText} />
		                </li>
		                <CollapsingPanelOption config={dashboardOptionConfig} />
		                <CollapsingPanelOption config={favoritesOptionConfig} />
		                <li>
		                    <a className="side_panel_option" href="#"><span className="fa fa-user fa-fw"></span> User</a>
		                </li>
		                <CollapsingPanelOption config={listsOptionConfig} />
		                <CollapsingPanelOption config={settingsOptionConfig} />
		                <li>
		                    <a className="side_panel_option" href="#"><span className="fa fa-history fa-fw"></span> History</a>
		                </li>
		            </ul>
		        </div>
		    </div>
		);
	}
});

module.exports = SidePanel;