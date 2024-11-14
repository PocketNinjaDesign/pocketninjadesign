const axios = require('axios');

const wordpressEndpoint = 'https://wordpress.pocketninjadesign.com/wp-json/wp/v2/pages?per_page=100&acf_format=standard';

async function getWordpressData () {
  // get the data from the wordpress site
  await axios.get(wordpressEndpoint)
    .then(response => {
      // filter all projects into an object separated by category
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error fetching WordPress posts:', error);
    });
}

getWordpressData();