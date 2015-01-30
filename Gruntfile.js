// Gruntfile.js 
module.exports = function (grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// MochaTest
		mochaTest: {
			src: ['test/tests.js'], 
		}
	});

	// Load grunt mocha task
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.registerTask('default', ['mochaTest']);
};

