const axios = require('axios');

console.log('WORDPRESS TEST');

axios.get('https://wordpress.pocketninjadesign.com/wp-json/wp/v2/pages')
  .then(res => {
    const posts = res.data;

    posts.forEach(item => {
      console.log(`ID: ${item.id}, link: ${item.link}, acf: ${item.acf.quick_test}`);
    });
  })
  .catch(err => {
    console.log('Error: ', err.message);
  });