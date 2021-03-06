'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();

module.exports = function(options) {
  return function() {
    browserSync.init({
      server: options.server
    })

    browserSync.watch('public/**/*.*').on('change', browserSync.reload);
  };
};