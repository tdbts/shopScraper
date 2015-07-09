var React = require('react'), 
	SearchField = require('./SearchField'),  
	CollapsingPanelOption = require('./CollapsingPanelOption'), 
	_ = require('underscore'), 
	$ = window.jquery || require('jquery');

var SidePanel = React.createClass({
	getInitialState: function () {
		return {
			sidePanelHeight: {
				height: "50px"
			}		
		};	
	},		

	getWindowHeight: function () {
		var heightValue = Math.max($(document).height(), $(window).height(), screen.height); 

		return heightValue.toString() + "px";
	}, 

	setSidePanelHeight: function () {	
		if ($(window).width() < 768) {
			this.setState({sidePanelHeight: {height: "100%"}});
		} else {
			this.setState({sidePanelHeight: {height: this.getWindowHeight()}});
		}
	}, 

	addSearchRequestToLocalStorage: function (filterText) {

		var existingFilterHistory = localStorage.getItem('filterSearchHistory'), 
			filterHistoryArray;  
		
		if (localStorage && existingFilterHistory) {
			
			filterHistoryArray = JSON.parse(existingFilterHistory); 

			filterHistoryArray.push(filterText);

			localStorage.setItem('filterSearchHistory', JSON.stringify(filterHistoryArray)); 
		
		} else if (localStorage && !existingFilterHistory) {

			localStorage.setItem('filterSearchHistory', JSON.stringify([filterText])); 
		
		} else {
			console.log("Your device does not support local storage.  Your filter history will not be saved.");
		} 

		return; 
	}, 

	getSearchHistoryArray: function () {
		var searchHistoryLocalStorageData = localStorage.getItem('filterSearchHistory'),  
			searchHistoryArray;  

		if (searchHistoryLocalStorageData) {
			searchHistoryArray = JSON.parse(searchHistoryLocalStorageData); 
		} 

		return searchHistoryArray || []; 
	}, 

	createArrayOfSearchHistoryObjects: function () {
		var searchHistoryArray = this.getSearchHistoryArray(); 

		var searchHistoryObjects = searchHistoryArray.map(function (searchText, index) {
			return {text: searchText, key: index}; 
		}); 

		return searchHistoryObjects; 
	}, 

	clearSearchRequestHistory: function () {
		
		if (localStorage && localStorage.getItem('filterSearchHistory')) {
			localStorage.setItem('filterSearchHistory', "[]");
		}
	}, 

	componentDidMount: function () {
		/* *** Source: metisMenu.js *** */
		$(React.findDOMNode(this.refs.sideMenu)).find('li').has('ul').children('a').on('click', function (e) {
			e.preventDefault();

			$(this).parent('li').toggleClass('active');
			$(this).parent('li').siblings().removeClass('active');
		});

		this.setSidePanelHeight();

		// $(window).on('resize', function () {
		// 	this.setSidePanelHeight();
		// }.bind(this));
		$(window).on('resize', _.debounce(this.setSidePanelHeight, 500, true)); 
	}, 

	componentWillUnmount: function () {

		$(window).off('resize');
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
			}, 

			historyOptionConfig = {
				optionName: "History", 
				targetID: "history_panel_option", 
				fontAwesomeIcon: "fa-history", 
				subCategories: this.createArrayOfSearchHistoryObjects()
			}; 


		return (
		    <div className="navbar-default sidebar" role="navigation" style={this.state.sidePanelHeight}>
		        <div className="sidebar-nav navbar-collapse">
		            <ul id="side-menu" className="nav" ref="sideMenu">
		                <li className="sidebar-search">
		                    <SearchField filterListings={this.props.filterListings} addSearchRequestToLocalStorage={this.addSearchRequestToLocalStorage} />
		                </li>
		                <CollapsingPanelOption config={dashboardOptionConfig} />
		                <CollapsingPanelOption config={favoritesOptionConfig} />
		                <li>
		                    <a className="side_panel_option" href="#"><span className="fa fa-user fa-fw"></span> User</a>
		                </li>
		                <CollapsingPanelOption config={listsOptionConfig} />
		                <CollapsingPanelOption config={settingsOptionConfig} />
		                <CollapsingPanelOption config={historyOptionConfig} />
		            </ul>
		        </div>
		    </div>
		);
	}
});

module.exports = SidePanel;