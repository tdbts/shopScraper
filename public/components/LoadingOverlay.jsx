var React = require('react'), 
	Spinner = require('./Spinner');

var LoadingOverlay = React.createClass({
	render: function () {
		return (
			<div id="loading_overlay">
				<Spinner />
				<div id="loading_overlay_text_container" className="window_view_centered">
					<h1 id="loading_overlay_text">Hang on!  We're finding out what's on sale this week!</h1>
				</div>
			</div>
		);
	}
});

module.exports = LoadingOverlay;
