// node modules
const fs = require('fs');
const glob = require('glob');
const Twig = require('twig');


// data object to send into the template system
// to populate dynamic content
const templateData = require('./dev/data/siteData');


// glob all files at a single level in the template page folder
// the site will not go beyond level 1 so no need to add directoy
// checking and writing
glob('./dev/template/page/*.twig', {}, (er, files) => {
  // loop through list of pages
  for (let file of files) {
    Twig.renderFile(file, templateData, (err, html) => {
      // get the last entry in the list
      const fileName = file.split('/').reverse()[0].replace('.twig', '.html');
      // create html page from the compiled content
      fs.writeFile(`./src/${fileName}`, html, (err) => {
        if (err) console.log(err);
      });
    });
  }
});