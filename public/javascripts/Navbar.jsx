var React = require('react');

var Navbar = React.createClass({
	render: function () {
		return (
			<div id="header_wrapper">
	            <div className="navbar-header">
	                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
	                    <span className="sr-only">Toggle navigation</span>
	                    <span className="icon-bar"></span>
	                    <span className="icon-bar"></span>
	                    <span className="icon-bar"></span>
	                </button>
	                <a className="navbar-brand" href="index.html">Shop Scraper</a>
	            </div>        
	            <div id="myNavbar" className="navbar-collapse collapse">
	                <div id="navbar_left_wrapper">    
	                    <ul className="nav navbar-nav">
                            <li id="home_li" className="active navbar_navText">
                                <a href="/" className="navbar_link">Home</a>
                            </li>
                            <li id="shops_li" className="dropdown navbar_navText">
                                <a href="#" className="dropdown-toggle navbar_link" data-toggle="dropdown">Shops<span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li className="navbar_store_link">
                                        <a href="/BigY">Big Y</a>
                                    </li>
                                    <li className="navbar_store_link">
                                        <a href="/StopAndShop">Stop & Shop</a>
                                    </li>
                                    <li className="navbar_store_link">
                                        <a href="/ShopRite">ShopRite</a>
                                    </li>
                                </ul>
                            </li>
                            <li id="about_li" className="navbar_navText">
                                <a href="#">About</a>
                            </li>
	                    </ul>
	                </div>
	                <div id="navbar_right_wrapper">
	                    <ul id="navbar_right_ul" className="nav navbar-nav navbar-right fit_to_navbar">
	                        <li>
	                            <a href="#" id="email_icon_link" className="navbar_icon_right fit_to_navbar">
	                                <span className="fa fa-envelope fa-2x" data-toggle="tooltip" data-placement="bottom" title="Email"></span>
	                            </a>
	                        </li>
	                        <li>
	                            <a href="#" id="github_icon_link" className="navbar_icon_right fit_to_navbar">
	                                <span className="fa fa-github fa-2x" data-toggle="tooltip" data-placement="bottom" title="Github Source Code"></span>
	                            </a>
	                        </li>
	                        <li>
	                            <a href="#" id="login_icon" className="navbar_icon_right fit_to_navbar">
	                                <span className="fa fa-sign-in fa-2x" data-toggle="tooltip" data-placement="bottom" title="Log In"></span>
	                            </a>
	                        </li>
	                    </ul>
	                </div>
	            </div>  			
			</div>
		);
	}
});

module.exports = Navbar;