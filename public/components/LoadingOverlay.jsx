var React = require('react'), 
	Spinner = require('./Spinner');

var LoadingOverlay = React.createClass({
	getOverlayText: function () {
		return "Hang on!  We're finding out what's on sale this week!";
	}, 

	render: function () {
		return (
			<div id="loading_overlay">
				<Spinner />
				<div id="loading_overlay_text_container" className="window_view_centered">
					<h1 id="loading_overlay_text">{this.getOverlayText()}</h1>
				</div>
			</div>
		);
	}
});

module.exports = LoadingOverlay;
