const browserSync = require('browser-sync').create();
const { dir } = require('./data');



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


module.exports = {
  serve,
  reload
};