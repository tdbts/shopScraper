var gulp = require('gulp'), 
	jshint = require('gulp-jshint'), 
	stylish = require('jshint-stylish'), 
	nodemon = require('gulp-nodemon'),
	less = require('gulp-less'),  
	mocha = require('gulp-mocha'),
	mochaReporter = require('mocha-pretty-spec-reporter'), 
	// notify = require('gulp-notify'), 
	uglify = require('gulp-uglify'),
	gulpif = require('gulp-if'), 
	// htmlReplace = require('gulp-html-replace'),  
	source = require('vinyl-source-stream'), 
	buffer = require('vinyl-buffer'), 
	minifyCss = require('gulp-minify-css'), 
	browserify = require('browserify'), 
	// watchify = require('watchify'),  
	// streamify = require('gulp-streamify') 
	reactify = require('reactify'); 

var env = process.env.NODE_ENV || 'development'; 

gulp.task('build-less', function () {
	console.log("BUILDING LESS.");

	return gulp.src([
		'./public/stylesheets/less/styles.less', 
		'./public/stylesheets/css/style.css', 
		'./public/stylesheets/css/sb-admin-2.css'
		], {base: './public/stylesheets'})
		.pipe(less())
		.pipe(gulp.dest('./public/stylesheets/css'))
		.pipe(minifyCss())
		.pipe(gulp.dest('./public/dist/build/'));
});

gulp.task('browserify', function () { 
	console.log("BUNDLING FILES WITH BROWSERIFY and REACTIFY.");

	var bundler = browserify({
		
		entries: ['./public/components/index.jsx'], 
		extensions: ['.jsx'], 
		debug: env === 'development'
	
	})
	.transform(reactify);

	var bundle = function () {
		return bundler
			.bundle()
			.pipe(source('bundle.js'))
			.pipe(buffer()) 
			.pipe(gulpif(env === 'production', uglify()))
			.pipe(gulp.dest('./public/dist/build'));
	};

	return bundle();
});

gulp.task('jshint', function () {
	gulp.src([
		'src/*.js', 
		'model/*.js',
		'routes/*.js',  
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
	
	gulp.watch('public/components/*.jsx', ['browserify']);
});

gulp.task('test', function () {
	gulp.src('test/**/*.js', {read: false})
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
gulp.task('build', ['jshint', 'test', 'build-less', 'browserify', 'server-restart']);
