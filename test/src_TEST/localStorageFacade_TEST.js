var chai = require('chai'), 
	expect = chai.expect; 

describe("Module: localStorageFacade", function () {
	
	// Setup 
	var localStorageFacade = require('../../src/localStorageFacade'); 

	function Storage() {

		var _storage = {}, 
			instance = {};  

		instance.getItem = function (item) {
			var key; 

			for (key in _storage) {
				if (item === key) {
					return _storage[item];
				}
			} 

			return null;			
		}; 

		instance.setItem = function (key, value) {
			value = typeof value === "string" ? value : value.toString(); 

			_storage[key] = value; 			
		}; 

		instance._clearAllItems = function () {
			_storage = {};			
		}; 

		return instance; 
	}

	var localStorageMock = (function() {
	
		var _storage = {}; 

		function getItem(item) {
			var key; 

			for (key in _storage) {
				if (item === key) {
					return _storage[item];
				}
			} 

			return null;
		} 

		function setItem(key, value) {
			value = typeof value === "string" ? value : value.toString(); 

			_storage[key] = value; 
		}

		function _clearAllItems() {
			_storage = {};
		}

		return {
			getItem: getItem, 
			setItem: setItem, 
			_clearAllItems: _clearAllItems
		}; 
	
	})(); 

	beforeEach(function () {
		localStorageMock._clearAllItems(); 

		localStorageMock.setItem('testNumber', 4); 
		localStorageMock.setItem('testArray', JSON.stringify(["my", "cool", "array"])); 
		localStorageMock.setItem('testObject', JSON.stringify({my: "obj"})); 
	});

	// Tests 
	it("Should check if localStorage exists on the client.", function () {
		
		var localStorage = {}; 
		expect(localStorageFacade.storageExists()).to.be.true; 

		var localStorage = undefined; 
		expect(localStorageFacade.storageExists()).to.be.false; 
	}); 

	it("Should automatically parse numbers, arrays and objects retrieved from localStorage.", function () {
		
		var localStorage = localStorageMock; 

		var testNumber = localStorageFacade.get('testNumber'), 
			testArray = localStorageFacade.get('testArray'), 
			testObject = localStorageFacade.get('testObject'); 

		expect(testNumber).to.be.a('number'); 
		expect(testArray).to.be.an('array'); 
		expect(testArray).to.be.an('object'); 	
	}); 


	it("Should allow user to retrieve items as stored in localStorage.", function () {
	
		var localStorage = localStorageMock; 

		var testNumber = localStorageFacade.get('testNumber', {parse: false}), 
			testArray = localStorageFacade.get('testArray', {parse: false}), 
			testObject = localStorageFacade.get('testObject', {parse: false}); 		

		expect(testNumber).to.be.a('string'); 
		expect(testArray).to.be.a('string'); 
		expect(testObject).to.be.a('string'); 
	}); 

	it("Should check whether an item exists in localStorage.", function () {
		
		var localStorage = {
			existingItem: 'hello world'
		}; 

		expect(localStorageFacade.exists('existingItem')).to.be(true); 
		expect(localStorageFacade.exists('nonexistent')).to.be(false); 
	}); 

	it("Should have option of automatically creating and setting a nonexistent item in localStorage.", function () {
		
		var localStorage = localStorageMock; 

		var nonexistentNumber = localStorageFacade.get('nonexistentNumber', {upsert: 0}), 
			nonexistentArray = localStorageFacade.get('nonexistentArray', {upsert: []}), 
			nonexistentObject = localStorageFacade.get('nonexistentObject', {upsert: {}}); 
		
		expect(nonexistentNumber).to.equal(0); 
		expect(nonexistentArray).to.equal([]); 
		expect(nonexistentObject).to.equal({}); 
	});

	it("Should allow user to set an item in local storage without needing to JSON.stringify it first.", function () {
		
		var localStorage = localStorageMock, 
			result; 

		localStorageFacade.set('myObj', {key: "value"}); 

		result = localStorageFacade.get('myObj'); 

		expect(result).to.be.an('object'); 
		expect(result.key).to.exist.and.equal("value"); 
	});

});
