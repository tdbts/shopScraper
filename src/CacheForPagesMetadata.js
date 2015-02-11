function CacheForPagesMetadata() {
	this.data = [];
}

CacheForPagesMetadata.prototype.getPageIDs = function () {
	return this.data.map(function (pageDataObj) {
		return pageDataObj.pageID;
	});
};

module.exports = CacheForPagesMetadata;