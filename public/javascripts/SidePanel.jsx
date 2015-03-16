var React = require('react'), 
	SearchField = require('./SearchField');

var SidePanel = React.createClass({
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
		    <div className="navbar-default sidebar" role="navigation">
		        <div className="sidebar-nav navbar-collapse">
		            <ul className="nav" id="side-menu">
		                <li className="sidebar-search">
		                    <SearchField />
		                </li>
		                <li className="collapsing_list_item">
		                    <a className="side_panel_option collapse_anchor" data-toggle="collapse" href="#dashboard_panel_option"><span className="fa fa-dashboard fa-fw"></span> Dashboard<span className="fa arrow"></span></a>
		                    <ul id="dashboard_panel_option" className="nav collapse panel_suboptions">
		                        <li className="panel_suboption"><a href="#">Add Store</a></li>
		                        <li className="panel_suboption"><a href="#">Swap Store</a></li>
		                        <li className="panel_suboption"><a href="#">Add Favorite</a></li>
		                    </ul>
		                </li>
		                <li className="collapsing_list_item">
		                    <a className="side_panel_option collapse_anchor" data-toggle="collapse" href="#favorites_panel_option"><span className="fa fa-thumbs-up fa-fw"></span> Favorites<span className="fa arrow"></span></a>
		                    <ul id="favorites_panel_option" className="nav collapse panel_suboptions">
		                        <li className="panel_suboption"><a href="#">Brawny</a></li>
		                        <li className="panel_suboption"><a href="#">Oreo</a></li>
		                        <li className="panel_suboption"><a href="#">Chicken Broth</a></li>
		                        <li className="panel_suboption"><a href="#">Beer</a></li>
		                    </ul>                    
		                </li>
		                <li>
		                    <a className="side_panel_option" href="#"><span className="fa fa-user fa-fw"></span> User</a>
		                </li>
		                <li className="collapsing_list_item">
		                    <a className="side_panel_option collapse_anchor" data-toggle="collapse" href="#lists_panel_option"><span className="fa fa-edit fa-fw"></span> Lists<span className="fa arrow"></span></a>
		                    <ul id="lists_panel_option" className="nav collapse panel_suboptions">
		                        <li className="panel_suboption"><a href="#">Stop & Shop</a></li>
		                        <li className="panel_suboption"><a href="#">Shop Rite</a></li>
		                    </ul>
		                </li>
		                <li className="collapsing_list_item">
		                    <a className="side_panel_option collapse_anchor" data-toggle="collapse" href="#settings_panel_option"><span className="fa fa-cog fa-fw"></span> Settings<span className="fa arrow"></span></a>
		                    <ul id="settings_panel_option" className="nav collapse panel_suboptions">
		                        <li className="panel_suboption"><a href="#">Display</a></li>
		                        <li className="panel_suboption"><a href="#">Search</a></li>
		                        <li className="panel_suboption"><a href="#">Notifications</a></li>
		                        <li className="panel_suboption"><a href="#">Defaults</a></li>
		                    </ul>
		                </li>
		                <li>
		                    <a className="side_panel_option" href="#"><span className="fa fa-history fa-fw"></span> History</a>
		                </li>
		            </ul>
		        </div>
		    </div>
		)
	}
});

module.exports = SidePanel;