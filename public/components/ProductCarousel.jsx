var React = require('react');

var ProductCarousel = React.createClass({
	getCarouselID: function () {
		var storeName = this.props.storeName.split(" ").join("_"), 
			carouselID = storeName + "_product_carousel";

		return carouselID;	
	}, 

	getDataRideValue: function () {
		var dataRideValue;

		if (this.props.products.length > 1) {
			dataRideValue = "carousel";
		} else {
			dataRideValue = "";
		}

		return dataRideValue;
	}, 

	getCarouselClass: function () {
		var carouselClassValue;

		if (this.props.products.length > 1) {
			carouselClassValue = "carousel slide";
		} else {
			carouselClassValue = "";
		}

		return carouselClassValue;
	}, 

	checkIfControlsRequired: function () {
		if (this.props.products.length > 1) {
			return (
				<div id={this.getCarouselID() + "_control_container"}>
					<a className="left carousel-control" href={"#" + this.getCarouselID()} role="button" data-slide="prev">
						<span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
						<span className="sr-only">Previous</span>
					</a>
					<a className="right carousel-control" href={"#" + this.getCarouselID()} role="button" data-slide="next">
						<span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
					</a>
				</div>
			);

		} else {
			return <div></div>
		}
	}, 

	render: function () {

		console.log("ProductCarousel Products: ", this.props.products);

		return (
			<div id={this.getCarouselID()} className={this.getCarouselClass()} data-ride={this.getDataRideValue()} data-interval="false">
				<div className="carousel-inner" role="listbox">
					{this.props.products}
				</div>
				{this.checkIfControlsRequired()}
			</div>			
		);
	}
});

module.exports = ProductCarousel;
	