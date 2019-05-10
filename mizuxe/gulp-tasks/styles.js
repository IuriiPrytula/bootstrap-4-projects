'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const multipipe = require('multipipe');

var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function(options) {
  return function() {
    return multipipe(
      gulp.src(options.src),
      $.if(isDevelopment, $.sourcemaps.init()),
      $.sass().on('error', $.sass.logError),
      $.autoprefixer(),
      $.csso(),
      $.sourcemaps.write('.'),
      gulp.dest(options.dst)
    ).on('error', $.notify.onError());
  };
};