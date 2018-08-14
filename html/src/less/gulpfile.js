'use strict';

var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var less=  require('gulp-less');

gulp.task('default', function () {
  return gulp.src('../html_code/sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('../html_code/static/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('less', function () {
  return gulp.src('../html_code/less/index.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('../html_code/static/css'));
});

gulp.task('lessWatch', function () {
  gulp.watch('../html_code/less/**/*.less', ['less']);
});