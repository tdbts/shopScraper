// Ultimately, this will come from the database
var storeLogoData = [
	{
		storeID: "0", 
		storeName: "Big Y", 
		storeHref: "/api/BigY", 
		imageURL: "/images/big_y_logo.jpeg", 
		imageID: "big_y_logo", 
		containerID: "container_big_y_logo"
	},
	{
		storeID: "1", 
		storeName: "Stop and Shop", 
		storeHref: "/api/StopAndShop", 
		imageURL: "/images/stop_and_shop_logo.jpeg", 
		imageID: "stop_and_shop_logo", 
		containerID: "container_stop_and_shop_logo"
	},
	{
		storeID: "2", 
		storeName: "ShopRite", 
		storeHref: "/api/ShopRite", 
		imageURL: "/images/shop_rite_logo.jpeg", 
		imageID: "shop_rite_logo", 
		containerID: "container_shop_rite_logo"
	} 
];

module.exports = storeLogoData;
