'use strict';

const gulp = require('gulp');

function lazyRequireTask(taskName, path, options) {
  options.taskName = taskName;
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);

    return task(callback);
  });
}

lazyRequireTask('styles', './gulp-tasks/styles.js', {
  src: 'frontend/styles/main.scss',
  since: 'styles',
  dst: 'public/css'
});

lazyRequireTask('pug', './gulp-tasks/pug.js', {
  src: 'frontend/pages/*.pug',
  since: 'pug',
  dst: 'public',
  pretty: "  "
});

lazyRequireTask('clean', './gulp-tasks/clean.js', {
  dst: 'public'
});

lazyRequireTask('images', './gulp-tasks/images.js', {
  src: 'frontend/assets/img/**/*.*',
  since: 'images',
  dst: 'public/img'
});

lazyRequireTask('js', './gulp-tasks/js.js', {
  src: 'frontend/js/**/*.js',
  since: 'js',
  dst: 'public/js'
});

gulp.task('build:all', gulp.series('clean', gulp.parallel('pug', 'styles','js' ,'images')));

gulp.task('watch', function() {
  gulp.watch('frontend/styles/**/*.scss', gulp.series('styles'));
  gulp.watch('frontend/assets/img/**/*.*', gulp.series('images'));
  gulp.watch('frontend/pages/**/*.pug', gulp.series('pug'));
});

lazyRequireTask('serve', './gulp-tasks/serve.js', {
  server: 'public'
});

lazyRequireTask('bootstrap:js', './gulp-tasks/bootstrapJSloader.js', {
  src: './node_modules/bootstrap/dist/js/bootstrap.min.js',
  since: 'bootstrap:js',
  dst: 'public/js/'
});

lazyRequireTask('bootstrap:css', './gulp-tasks/bootstrapCSSloader.js', {
  src: './node_modules/bootstrap/dist/css/bootstrap.min.css',
  since: 'bootstrap:css',
  dst: 'public/js/'
});

lazyRequireTask('jquery', './gulp-tasks/jqueryLoader.js', {
  src: './node_modules/jquery/dist/jquery.min.js',
  since: 'jquery',
  dst: 'public/js/'
});

lazyRequireTask('popper', './gulp-tasks/popperLoader.js', {
  src: './node_modules/popper.js/dist/popper.min.js',
  since: 'popper',
  dst: 'public/js/'
});

gulp.task('load:modules', gulp.series('bootstrap:js', 'bootstrap:css', 'popper', 'jquery'));
gulp.task('dev', gulp.series('build:all', 'load:modules', gulp.parallel('watch', 'serve')));