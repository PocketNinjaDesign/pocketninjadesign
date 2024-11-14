const gulp = require('gulp');
const babelify = require("babelify");
const concat = require('gulp-concat');
const minify = require('gulp-minify');



function bundleJS () {
  return gulp.src(`${dir.script}/**/*.js`)
    .pipe(bro({
      transform: [
        babelify.configure({
          presets: ["@babel/preset-env"],
          compact: true
        })
      ]
    }))
    .pipe(concat('bundle.js'))
    .pipe(minify())
    .pipe(gulp.dest(dir.build));
}

module.exports = {
  bundleJS
}