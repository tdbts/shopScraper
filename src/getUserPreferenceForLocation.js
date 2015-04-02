module.exports = function (location) {
	return location.companyID === '2' ? [{circularPath: location.circularPath}] 
		: [{storeID: location.storeID}];
};