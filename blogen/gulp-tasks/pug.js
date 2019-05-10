'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const multipipe = require('multipipe');

module.exports = function(options) {
  return function() {
    return multipipe(
      gulp.src(options.src),
      $.pug({
        pretty: options.pretty
      }),
      gulp.dest(options.dst)
    ).on('error', $.notify.onError());
  };
};