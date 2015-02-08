module.exports = function (Constructor, argArray) {
	
	var args = argArray, 
		Temp = function() {}, 
		inst, ret;

	Temp.prototype = Constructor.prototype;

	inst = new Temp();

	ret = Constructor.apply(inst, args);

	return Object(ret) === ret ? ret : inst;

};
