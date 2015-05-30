/* 
* SearchField component requires FontAwesome for the magnifying glass icon.
*/

var React = require('react');

var SearchField = React.createClass({
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
            <div className="input-group custom-search-form">
                <input type="text" className="form-control" onChange={this.handleSearchInput} value={this.state.searchFieldText} placeholder="Search..." />
                <span className="input-group-btn">
                    <button className="btn btn-default" type="button">
                        <span className="fa fa-search"></span>
                    </button>
                </span>
            </div>			
		);
	}
});

module.exports = SearchField;