// dependencies
const gulp = require('gulp');
const twig = require('gulp-twig');

// pnd dependencies
const { dir } = require('./data');
const siteData = require('../dev/js/data/siteData');
const { getWordpressData } = require('./wordpress/api');



// filters

const newFilters = [
  {
    name: "add_egg",
    func: function (str) {
      return str + ' egg';
    }
  }
];



// methods

async function getData () {
  // get all projects from wordpress
  const allProjects = await getWordpressData();


  // console.log('allProjects, ', allProjects);




  if ( allProjects.uidesign ) {
    siteData.portfolio.uidesign = {
      filePrefix: {
        // thumb: 'images/portfolio/ui-design/thumb/',
        thumb: '',
        // detail: 'images/portfolio/ui-design/detail/',
        detail: '',
      },
      items: allProjects.uidesign,
    }
  }

  if ( allProjects.graphics ) {
    siteData.portfolio.graphics = {
      filePrefix: {
        thumb: '',
        detail: '',
      },
      items: allProjects.graphics,
    };
  }

  if ( allProjects.illustration ) {
    siteData.portfolio.illustration = {
      filePrefix: {
        thumb: '',
        detail: '',
      },
      items: allProjects.illustration,
    };
  }



  // console.log('uidesign proj 0 img: ', siteData.portfolio.uidesign.items[0].img.detail[0].src);



  return {
    siteData,
    uiDesign: {
      info: siteData.navigation[0],
      // gallery: siteData.gallery[0]
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
  };
}



// gulp method

async function templates () {
  const templateData = await getData();

  // console.log('templateData: ', templateData.siteData.navigation);

  return gulp.src([`${dir.template}/*.twig`])
    .pipe(twig({
      filters: newFilters,
      data: templateData
    }))
    .pipe(gulp.dest(dir.build));
}



module.exports = {
  templates
}