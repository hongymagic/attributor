'use strict';

var gulp     = require('gulp');
var size     = require('gulp-size');
var jshint   = require('gulp-jshint');
var stylish  = require('jshint-stylish');

gulp.task('scripts', function () {
	return gulp.src('attributor.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(size());
});

gulp.task('default', ['scripts']);