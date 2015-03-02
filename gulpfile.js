var gulp = require('gulp'), 
	jshint = require('gulp-jshint'), 
	stylish = require('jshint-stylish'), 
	nodemon = require('gulp-nodemon'), 
	mocha = require('gulp-mocha'),
	mochaReporter = require('mocha-pretty-spec-reporter'), 
	// uglify = require('gulp-uglify'),
	// htmlReplace = require('gulp-html-replace'),  
	source = require('vinyl-source-stream'), 
	browserify = require('browserify'), 
	// watchify = require('watchify'), 
	// reactify = require('reactify'), 
	// streamify = require('gulp-streamify') 
	react = require('gulp-react'); 

gulp.task('transform', ['test'], function () {
	gulp.src(['public/javascripts/*.jsx'])
		.pipe(react())
		.pipe(gulp.dest('public/javascripts'));	
});

gulp.task('browserify', ['transform'], function () {
	return browserify('./public/javascripts/index.js')
		.bundle()
		.on('error', function (err) {
			console.log(err.toString());
			this.emit('end'); 
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./public/dist'));
});

gulp.task('jshint', function () {
	gulp.src([
		'src/*.js', 
		'!public/javascripts/*.js', 
		'!public/javascripts/bundle.js', 
		'gulpfile.js'
		])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));	
});

gulp.task('watch', function () {
	var sourcefiles = [
		'src/*.js', 
		'public/javascripts/*.js',   
		'gulpfile.js'
	];

	gulp.watch(sourcefiles, ['jshint']);

});

gulp.task('watch', function () {
	gulp.watch('public/javascripts/*.jsx', ['bundle']);
});

gulp.task('test', function () {
	gulp.src('test/tests.js', {read: false})
		.pipe(mocha({reporter: mochaReporter}));	
});

gulp.task('server-restart', ['browserify'], function () {
	nodemon({
		script: './bin/www',  
		ext: 'js jsx html', 
		env: {
			'NODE_ENV': 'development'
		}
	})
		.on('start', ['watch'])
		.on('change', ['bundle'])
		.on('restart', function () {
			var date = new Date(), 
				hour = date.getHours(), 
				minutes = date.getMinutes(), 
				seconds = date.getSeconds();

			console.log("Change detected.  Restarted server at " + hour + ":" + minutes + ":" + seconds + ".");
		});	
});

gulp.task('default', ['watch']);
gulp.task('bundle', ['test', 'transform', 'browserify']);
gulp.task('build', ['test', 'transform', 'browserify', 'server-restart']);
