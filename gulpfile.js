
// dependencies

const gulp = require('gulp');
// const babelify = require("babelify");
// const bro = require('gulp-bro');
const browserSync = require('browser-sync').create();
// const concat = require('gulp-concat');
// const minify = require('gulp-minify');
const sass = require('gulp-sass')(require('sass'));
const twig = require('gulp-twig');



// variables

const dir = {
  build: './build',
  script: './dev/script',
  style: './dev/style',
  template: './dev/template',
  root: './dev/root',
};

const siteData = require('./dev/js/data/siteData');



// methods

function copyFiles () {
  return gulp.src(`${dir.root}/**/*`)
    .pipe(gulp.dest(`${dir.build}`));
}

// function bundleJS () {
//   return gulp.src(`${dir.script}/**/*.js`)
//     .pipe(bro({
//       transform: [
//         babelify.configure({
//           presets: ["@babel/preset-env"],
//           compact: true
//         })
//       ]
//     }))
//     .pipe(concat('bundle.js'))
//     // .pipe(minify())
//     .pipe(gulp.dest(dir.build));
// }


function styles () {
  return gulp.src(`${dir.style}/**/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${dir.build}/assets/css`));
};


function compile () {
  return gulp.src([`${dir.template}/*.twig`])
    .pipe(twig({
      data: {
        uiDesign: {
          info: siteData.navigation[0],
          gallery: siteData.gallery[0]
        },
        graphics: {
          info: siteData.navigation[1],
          gallery: siteData.gallery[1]
        },
        illustration: {
          info: siteData.navigation[2],
          gallery: siteData.gallery[2]
        },
      }
    }))
    .pipe(gulp.dest(dir.build));
}


function serve (done) {
  browserSync.init({
    server: {
      baseDir: dir.build
    }
  });
  done();
}


function reload(done) {
  browserSync.reload();
  done();
}


function watchFiles () {
  gulp.watch(`${dir.style}/**/*.scss`, gulp.series(styles, reload));
  // gulp.watch(`${dir.script}/**/*.js`, gulp.series(bundleJS, reload));
  gulp.watch(`${dir.template}/**/*.twig`, gulp.series(compile, reload));
}


exports.default = gulp.series(
  // gulp.parallel(copyFiles, compile, styles, bundleJS), serve, watchFiles
  gulp.parallel(copyFiles, compile, styles), serve, watchFiles
);