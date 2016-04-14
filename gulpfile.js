'use strict';

let gulp = require('gulp');
let lint = require('gulp-eslint');
let mocha = require('gulp-mocha');
let webpack = require('gulp-webpack');
let del = require('del');

let paths = ['*.js', 'models/*.js', 'routes/*.js', 'test/*.js', 'app/*.js'];

gulp.task('eslint', () => {
  gulp.src(paths)
  .pipe(lint())
  .pipe(lint.format());
});

// gulp.task('test', () => {
//   gulp.src(__dirname + '/test/*.js')
//   .pipe(mocha({reporter: 'nyan'}));
// });

// gulp.task('del-build', () => {
//   return del([
//     __dirname + '/build/**', __dirname + '!/build'
//   ])
//   .then(paths => console.log('Deleted files and folders:\n', paths.join('\n')));
// });

gulp.task('copy-html', () => {
  gulp.src(__dirname + '/app/index.html')
  .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('copy-css', () => {
  gulp.src(__dirname + '/app/css/*.css')
  .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('webpack', () => {
  return gulp.src(__dirname + '/app/index.js')
  .pipe(webpack({
    watch: true,
    module: {
      loaders: [
        { test: /\.css$/, loader: 'style!css'}
      ]
    },
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('watch', () =>{
  gulp.watch(paths);
});

gulp.task('default', ['eslint', 'webpack', 'copy-html', 'copy-css']);
