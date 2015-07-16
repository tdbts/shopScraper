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

    handleSearchRequest: function (e) {
        
        this.props.filterListings(e.target.value); 

        this.setState({searchFieldText: ""}); 
    }, 

    attachEnterKeyHandler: function (domNode, handler) {
        $(domNode).find('input').keypress(function (e) {

            var keyCode = (e.keyCode ? e.keyCode : e.which);
            
            if (keyCode === 13) {
                handler(e); 
            }
        }.bind(this));        
    }, 

    componentDidMount: function () {

        this.attachEnterKeyHandler(React.findDOMNode(this), this.handleSearchRequest); 
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