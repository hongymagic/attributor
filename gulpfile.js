'use strict';

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('scripts', function () {
	return gulp.src('attributor.js')
		.pipe($.jshint())
		.pipe($.jshint.reporter($.jshintStylish))
		.pipe($.size());
});

gulp.task('default', ['scripts']);