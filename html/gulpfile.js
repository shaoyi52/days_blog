'use strict';

var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var less=  require('gulp-less');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
gulp.task('default', function () {
  return gulp.src('../html_code/sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('../html_code/static/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('less', function () {
  return gulp.src('./src/less/index.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./src/static/css'))
    .pipe(connect.reload());;
});

gulp.task('html', function () {
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./app'))
    .pipe(connect.reload());
});
gulp.task('lessWatch', function () {
  gulp.watch(['./src/*.html'], ['html']);
  gulp.watch('./src/less/**/*.less', ['less']);
});

gulp.task('connect', function() {
  connect.server({livereload: true});
});
gulp.task('default', ['connect', 'lessWatch']);