module.exports = (function() {

	function storageExists() {
		return localStorage && typeof localStorage === "object" && localStorage instanceof Storage; 
	}

	return {
		storageExists: storageExists
	};

})();
