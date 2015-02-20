var React = require('react');

var TestReact = React.createClass({displayName: "TestReact",
	render: function () {
		return (
			React.createElement("div", null, 
				"Okay, let us see what the fuck is up, react."
			)
		);
	}
});