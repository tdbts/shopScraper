/* 
* SearchField component requires FontAwesome for the magnifying glass icon.
*/

var React = require('react'), 
    $ = window.jQuery || require('jquery'); 

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

    handleFilterRequest: function () {
       
       if (this.state.searchFieldText) {
           this.props.filterListings(this.state.searchFieldText);  
       
           this.props.addFilterRequestToLocalStorage(this.state.searchFieldText); 
       }
    }, 

    componentDidMount: function () {

        $(React.findDOMNode(this)).find('input').keypress(function (e) {

            var keyCode = (e.keyCode ? e.keyCode : e.which);
            
            if (keyCode === 13) {
                this.handleFilterRequest(); 
            }
        }.bind(this));
    }, 

	render: function () {
		return (
            <div className="input-group custom-search-form">
                <input type="text" className="form-control" onChange={this.handleSearchInput} value={this.state.searchFieldText} placeholder="Search..." />
                <span className="input-group-btn">
                    <button className="btn btn-default" type="button" onClick={this.handleFilterRequest}>
                        <span className="fa fa-search"></span>
                    </button>
                </span>
            </div>			
		);
	}
});

module.exports = SearchField;
