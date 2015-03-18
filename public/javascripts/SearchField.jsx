/* 
* SearchField component requires FontAwesome for the magnifying glass icon.
*/

var React = require('react');

var SearchField = React.createClass({
	render: function () {
		return (
            <div className="input-group custom-search-form">
                <input type="text" className="form-control" placeholder="Search..." />
                <span className="input-group-btn">
                    <button className="btn btn-default" type="button">
                        <span className="fa fa-search"></span>
                    </button>
                </span>
            </div>			
		)
	}
});

module.exports = SearchField;