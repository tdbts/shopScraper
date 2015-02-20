var gulp = require('gulp'), 
	jshint = require('gulp-jshint'), 
	stylish = require('jshint-stylish'), 
	nodemon = require('gulp-nodemon'), 
	mocha = require('gulp-mocha'),
	mochaReporter = require('mocha-pretty-spec-reporter'), 
	uglify = require('gulp-uglify'),
	htmlReplace = require('gulp-html-replace'),  
	source = require('vinyl-source-stream'), 
	browserify = require('browserify'), 
	watchify = require('watchify'), 
	reactify = require('reactify'), 
	react = require('gulp-react'), 
	streamify = require('gulp-streamify'); 

gulp.task('transform', function () {
	gulp.src(['public/javascripts/*.jsx'])
		.pipe(react())
		.pipe(gulp.dest('public/javascripts'));	
});

gulp.task('browserify', function () {
	return browserify('./public/javascripts/index.js')
		// .transform(reactify)
		.bundle()
		.on('error', function (err) {
			console.log(err.toString());
			this.emit('end'); 
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./public/dist'));
});

// gulp.task('copy', function () {
// 	gulp.src('index.html')
// 		.pipe(gulp.dest('public/dist'));	
// });

// gulp.task('watch', function () {
// 	gulp.watch('index.html', ['copy']);

// 	var watcher = watchify(browserify({
// 		entries: ['./public/javascripts/index.js'], 
// 		transform: [reactify], 
// 		debug: true, 
// 		cache: {}, packageCache: {}, fullPaths: true
// 	}));

// 	return watcher.on('update', function () {
// 		watcher.bundle()
// 			.pipe(source('bundle.js'))
// 			.pipe(gulp.dest('public/dist'));
// 			console.log('Sources updated.');		
// 	})
// 		.bundle()
// 		.pipe(source('build.js'))
// 		.pipe(gulp.dest('public/dist'));
// });

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
		'public/javascripts/bundle.js', 
		'gulpfile.js'
	];

	gulp.watch(sourcefiles, ['jshint', 'test']);

});

gulp.task('test', function () {
	gulp.src('test/tests.js', {read: false})
		.pipe(mocha({reporter: mochaReporter}));	
});

gulp.task('server-restart', function () {
	nodemon({
		script: './bin/www', 
		ext: 'js jsx html', 
		env: {
			'NODE_ENV': 'development'
		}
	})
		.on('start', ['watch'])
		.on('change', ['watch'])
		.on('restart', function () {
			var date = new Date(), 
				hour = date.getHours(), 
				minutes = date.getMinutes(), 
				seconds = date.getSeconds();

			console.log("Change detected.  Restarted server at " + hour + ":" + minutes + ":" + seconds + ".");
		});	
});

gulp.task('default', ['jshint', 'test']);
gulp.task('dev', ['watch', 'server-restart']);
