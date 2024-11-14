const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// pnd dependencies
const { dir } = require('./data');


function styles () {
  return gulp.src(`${dir.style}/**/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${dir.build}/assets/css`));
};



module.exports = {
  styles
}