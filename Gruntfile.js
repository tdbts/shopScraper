// Gruntfile.js 
module.exports = function (grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// MochaTest
		mochaTest: {
			src: ['test/tests.js'], 
		},

		jshint: {
	        options: {
	            jshintrc: '.jshintrc'
	        },
	        gruntfile: {
	            src: 'Gruntfile.js'
	        },
	        lib: {
	            src: ['src/*.js', 'public/javascripts/*.js', '!public/javascripts/bundle.js']
	        }
	    }, 

		nodemon: {
			dev: {
				script: 'app.js'
			}
		}, 

		browserify: {
			main: {
				options: {
					bundleOptions: {
						debug: true
					}
				}, 
				src: ['public/javascripts/*.js'], 
				dest: ['public/javascripts/bundle.js']
			}
		}, 

	    watch: {
	        gruntfile: {
	            files: '<%= jshint.gruntfile.src %>',
	            tasks: ['jshint:gruntfile']
	        },
	        lib: {
	            files: '<%= jshint.lib.src %>',
	            tasks: ['jshint:lib']
	        }
	    }
	});

	// Load grunt mocha task
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-browserify');

	grunt.registerTask('default', ['mochaTest', 'jshint', 'nodemon', 'browserify']);
};

