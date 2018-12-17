'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const multipipe = require('multipipe');

module.exports = function(options) {
  return function() {
    return multipipe(
      gulp.src(options.src, {since: gulp.lastRun(options.since)}),
      $.newer(options.dst),
      gulp.dest(options.dst)
    ).on('error', $.notify.onError());
  };
};