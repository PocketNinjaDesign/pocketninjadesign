
// dependencies

const gulp = require('gulp');

// pnd modules gulp and other
const { dir } = require('./pndModules/data');
const { serve, reload } = require('./pndModules/gulpServe');
const { templates } = require('./pndModules/gulpTemplates');
const { styles } = require('./pndModules/gulpStyles');



// gulp methods

function copyFiles () {
  return gulp.src(`${dir.root}/**/*`)
    .pipe(gulp.dest(`${dir.build}`));
}

function watchFiles () {
  gulp.watch(`${dir.style}/**/*.scss`, gulp.series(styles, reload));
  // gulp.watch(`${dir.script}/**/*.js`, gulp.series(bundleJS, reload));
  gulp.watch(`${dir.template}/**/*.twig`, gulp.series(templates, reload));
}

exports.default = gulp.series(
  // gulp.parallel(copyFiles, templates, styles, bundleJS), serve, watchFiles
  gulp.parallel(copyFiles, templates, styles), serve, watchFiles
);
