const axios = require('axios');
const { getAllProjects, downloadAllImages } = require('./project');



// wordpress api call
// max 100, after that I need to start doing pagination calls
const wordpressEndpoint = 'http://pocketninjadesign.local/wp-json/wp/v2/project?per_page=100&acf_format=standard';



async function getWordpressData () {
  let allProjects = {};

  // get the data from the wordpress site
  await axios.get(wordpressEndpoint)
    .then(response => {
      // filter all projects into an object separated by category
      allProjects = getAllProjects(response.data);
    })
    .catch(error => {
      console.error('Error fetching WordPress posts:', error);
    });

  await downloadAllImages(allProjects);

  return allProjects;
}

module.exports = {
  getWordpressData
}
