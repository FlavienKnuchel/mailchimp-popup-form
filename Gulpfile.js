'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var browsersync = require('browser-sync').create();

gulp.task('sass', function () {
  gulp.src('./src/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({
    browsers: ['> 4%']
  }))
    .pipe(minify({
      compatibility: 'ie9',
      keepBreaks: true,
      roundingPrecision: -1
    }))
    .pipe(gulp.dest('./src/css'))
    .pipe(browsersync.stream());
});

gulp.task('sass-raw', function () {
  gulp.src('./raw/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({
      browsers: ['> 4%']
    }))
    .pipe(minify({
      compatibility: 'ie9',
      keepBreaks: true,
      roundingPrecision: -1
    }))
    .pipe(gulp.dest('./raw/css'))
    .pipe(browsersync.stream());
});


gulp.task('serve', ['sass'], function () {

  browsersync.init({
    proxy: "localhost:8888"
  });

  gulp.watch('./src/sass/**/*.sass', ['sass']);
  gulp.watch('./raw/sass/**/*.sass', ['sass-raw']);
  gulp.watch(['src/*.php','src/*.js','raw/*.php','raw/*.js']).on('change', browsersync.reload);
});

gulp.task('default', ['serve']);