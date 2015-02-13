var DomData = require('./DomData'),
	shopRiteConfig = {
		pageNumberLocation: 'span.pages', 
		date: {
			start: {
				element: 'div#CircularValidDates', 
				attribute: 'data-start', 
				indexes: [0, 8]
			}, 
			end: {
				element: 'div#CircularValidDates', 
				attribute: 'data-end', 
				indexes: [0, 8]
			} 
		}, 
		product: {
			container: '.tooltip', 
			name: 'p.itemTitle', 
			description: 'p.itemBrand', 
			price: 'p.itemPrice', 
			image: {
				element: 'img.itemImage', 
				attribute: 'src'
			}
		}	
	};

module.exports = new DomData(shopRiteConfig);