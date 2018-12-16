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
  since: 'styles'
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
  src: 'frontend/js/**/*.*',
  since: 'js',
  dst: 'public/js'
});

gulp.task('build:all', gulp.series('clean', gulp.parallel('pug', 'styles','js' ,'images')));

gulp.task('watch', function() {
  gulp.watch('frontend/styles/**/*.*', gulp.series('styles'));
  gulp.watch('frontend/assets/img/**/*.*', gulp.series('images'));
  gulp.watch('frontend/assets/js/**/*.*', gulp.series('js'));
  gulp.watch('frontend/assets/pages/**/*.pug', gulp.series('pug'));
});

lazyRequireTask('serve', './gulp-tasks/serve.js', {
  server: 'public'
});

gulp.task('dev', gulp.series('build:all', gulp.parallel('watch', 'serve')));