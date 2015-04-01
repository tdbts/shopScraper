var gulp = require('gulp'), 
	jshint = require('gulp-jshint'), 
	stylish = require('jshint-stylish'), 
	nodemon = require('gulp-nodemon'), 
	mocha = require('gulp-mocha'),
	mochaReporter = require('mocha-pretty-spec-reporter'), 
	notify = require('gulp-notify'), 
	// uglify = require('gulp-uglify'),
	// htmlReplace = require('gulp-html-replace'),  
	source = require('vinyl-source-stream'), 
	browserify = require('browserify'), 
	// watchify = require('watchify'), 
	// reactify = require('reactify'), 
	// streamify = require('gulp-streamify') 
	react = require('gulp-react'); 

gulp.task('transform', function () {
	gulp.src(['public/components/*.jsx'])
		.pipe(react())
		.on('error', console.log.bind(console))
		.pipe(gulp.dest('public/javascripts'));

	console.log("TRANSFORM OF .jsx FILES COMPLETE.");
});

gulp.task('browserify', function () {
	console.log("BUNDLING FILES WITH BROWSERIFY.");
	
	return browserify('./public/javascripts/index.js')
		.bundle()
		.on('error', function () {
			notify.onError({
				message: "<%= error.message %>"
			}).apply(this, arguments);

			this.emit('end'); 
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./public/dist'));

});

gulp.task('jshint', function () {
	gulp.src([
		'src/*.js', 
		'model/*.js', 
		'public/javascripts/*.js', 
		'!public/javascripts/bundle.js', 
		'gulpfile.js'
		])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));	
});

gulp.task('watch', function () {
	var sourcefiles = [
		'src/*.js', 
		// 'public/javascripts/*.js',
		'routes/*.js', 
		'/test/*.js',     
		'gulpfile.js'
	];

	gulp.watch(sourcefiles, ['jshint']);
	
	gulp.watch('public/components/*.jsx', ['transform', 'browserify']);
});

gulp.task('test', function () {
	gulp.src('test/tests.js', {read: false})
		.pipe(mocha({reporter: mochaReporter}));	
});

gulp.task('server-restart', function () {
	nodemon({
		script: './bin/www',  
		ext: 'js jsx html json', 
		env: {
			'NODE_ENV': 'development'
		}
	})
	.on('restart', function () {
		var date = new Date(), 
			hour = date.getHours(), 
			minutes = date.getMinutes(), 
			seconds = date.getSeconds();

		console.log("Change detected.  Restarted server at " + hour + ":" + minutes + ":" + seconds + ".");
	});	
});

gulp.task('default', ['watch']);
// gulp.task('bundle', ['jshint', 'test', 'transform', 'browserify']);
gulp.task('build', ['jshint', 'test', 'transform', 'browserify', 'server-restart']);
