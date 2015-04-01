var React = require('react');

var WelcomeColumn = React.createClass({
	render: function () {
		return (
			<div id={this.props.columnID} className="col-md-3 info_column">
				<div className="info_circle_container">
					<span className="fa-stack fa-3x">
						<span className="fa fa-circle fa-stack-2x info_circle"></span>
						<span className={this.props.glyphiconClass}></span>
					</span>
				</div>
				<div className="landing_page_info_text">
					<p className="info_text">{this.props.text}</p>
				</div>
			</div>			
		);
	}
});

module.exports = WelcomeColumn;
