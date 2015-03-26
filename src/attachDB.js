module.exports = function (dbName) {
	return function (req, res, next) {
		req.db = dbName;
		next();
	};
};