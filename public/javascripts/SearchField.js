/* 
* SearchField component requires FontAwesome for the magnifying glass icon.
*/

var React = require('react');

var SearchField = React.createClass({displayName: "SearchField",
	render: function () {
		return (
            React.createElement("div", {className: "input-group custom-search-form"}, 
                React.createElement("input", {type: "text", className: "form-control", placeholder: "Search..."}), 
                React.createElement("span", {className: "input-group-btn"}, 
                    React.createElement("button", {className: "btn btn-default", type: "button"}, 
                        React.createElement("span", {className: "fa fa-search"})
                    )
                )
            )			
		);
	}
});

module.exports = SearchField;