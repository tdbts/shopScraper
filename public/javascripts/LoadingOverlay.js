var React = require('react'), 
	Spinner = require('./Spinner');

var LoadingOverlay = React.createClass({displayName: "LoadingOverlay",
	render: function () {
		return (
			React.createElement("div", {id: "loading_overlay"}, 
				React.createElement(Spinner, null), 
				React.createElement("div", {id: "loading_overlay_text_container", className: "window_view_centered"}, 
					React.createElement("h1", {id: "loading_overlay_text"}, "Hang on!  We're finding out what's on sale this week!")
				)
			)
		);
	}
});

module.exports = LoadingOverlay;
