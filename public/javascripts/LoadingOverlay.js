var React = require('react'), 
	Spinner = require('./Spinner');

var LoadingOverlay = React.createClass({displayName: "LoadingOverlay",
	getOverlayText: function () {
		return "Hang on!  We're finding out what's on sale this week!";
	}, 

	render: function () {
		return (
			React.createElement("div", {id: "loading_overlay"}, 
				React.createElement(Spinner, null), 
				React.createElement("div", {id: "loading_overlay_text_container", className: "window_view_centered"}, 
					React.createElement("h1", {id: "loading_overlay_text"}, this.getOverlayText())
				)
			)
		);
	}
});

module.exports = LoadingOverlay;
