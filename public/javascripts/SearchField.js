/* 
* SearchField component requires FontAwesome for the magnifying glass icon.
*/

var React = require('react');

var SearchField = React.createClass({displayName: "SearchField",
    getInitialState: function () {
        return {
            searchFieldText: ""
        };
    }, 

    handleSearchInput: function (e) {
        var userInputText = e.target.value;

        this.setState({searchFieldText: userInputText});
    }, 

    componentDidMount: function () {

        $(React.findDOMNode(this)).find('input').keypress(function (e) {

            var keyCode = (e.keyCode ? e.keyCode : e.which);
            
            if (keyCode === 13) {
                this.props.filterListings(e.target.value);
            }
        }.bind(this));
    }, 

	render: function () {
		return (
            React.createElement("div", {className: "input-group custom-search-form"}, 
                React.createElement("input", {type: "text", className: "form-control", onChange: this.handleSearchInput, value: this.state.searchFieldText, placeholder: "Search..."}), 
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