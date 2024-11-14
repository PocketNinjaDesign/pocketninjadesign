const axios = require('axios');
const fs = require('fs');
const path = require('path');


const imgFolderRoot = `/images/plinky/`;



/**
 * Generates a Project object.
 *
 * @param {object} item - a more detailed project object.
 * @returns {Object} the newely cleaned project object.
 */
function getProjectData (item) {
  const acf = item.acf;
  const catFolderRoot = `${imgFolderRoot}${item.acf.category}/`;

  // console.log('acf: ', acf);
  // console.log('acf.external_link: ', acf.external_link);

  const project = {
    title: item.title.rendered,
    type: acf.type,
    img: {
      thumbUrl: acf.thumbnail.url,
      thumb: catFolderRoot + acf.thumbnail.url.split('/').slice(-3).join('_'),
      detail: []
    }
  };

  // check and add external link
  if (acf.external_link) {
    project.externalLink = {
      url: acf.external_link_group.link_url,
      text: acf.external_link_group.external_link_text
    }
  }


  // Add gallery images
  acf.gallery_images.forEach((galleryItem, index) => {

    // const thumbnail = item.img.thumb.split('/').slice(-3).join('_');

    project.img.detail.push({
      bgColor: galleryItem.ambient_colour,
      src: {
        largeUrl: galleryItem.large_image.url,
        large: catFolderRoot + galleryItem.large_image.url.split('/').slice(-3).join('_'),
        mediumUrl: galleryItem.medium_image.url,
        medium: catFolderRoot + galleryItem.medium_image.url.split('/').slice(-3).join('_'),
        smallUrl: galleryItem.small_image.url,
        small: catFolderRoot + galleryItem.small_image.url.split('/').slice(-3).join('_'),
      },
    });
  });

  return project;
}



/**
 * Create an object of categories each containing arrays of projects
 *
 * @param {array} data - List containing objects of all the projects from the wp api
 * @returns {Object} The project object split into categories with arrays
 *
 * @example
 * // Example usage
 * const projectData = getAllProjects(response.data);
 * console.log(projectData);
 * // Output: {
 *  uidesign: [{...project1}, {...project2}, {...project3}],
 *  graphics: [{...project1}, {...project2}, {...project3}],
 *  illustration: [{...project1}, {...project2}, {...project3}]
 * }
 */
function getAllProjects (data) {
  // set empty object ready
  let allProjects = {};

  data.forEach((item, index) => {
    // get project category
    const category = item.acf.category;

    // checks if this category is in the object and
    // if not adds it with an empty array
    if (!allProjects[category]) {
      allProjects[category] = [];
    }

    // add the project to the category array
    const newProjectData = getProjectData(item);
    allProjects[category].push(getProjectData(item));
  });

  return allProjects;
}



async function downloadImage(url, localPath) {
  // target the build folder
  localPath = 'build/' + localPath;

  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
    });

    // Ensure that the local directory exists
    const directory = path.dirname(localPath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // Pipe the response stream to a local file
    response.data.pipe(fs.createWriteStream(localPath));

    return new Promise((resolve, reject) => {
      response.data.on('end', () => resolve());
      response.data.on('error', (error) => reject(error));
    });
  }
  catch (error) {
    console.error('Error downloading image:', error.message);
    throw error;
  }
}



async function findImages (category, imgObject) {
  // console.log('downloadAllImages', category, imgObject);
  // get thumb url
  const folder = `${imgFolderRoot}${category}/`;

  for await (const item of imgObject) {
    // const thumbnail = item.img.thumb.split('/').slice(-3).join('_');

    // console.log('item: ', item);
    // console.log('thumb: ', item.img.thumbUrl);
    // console.log('target: ', item.img.thumb);
    // console.log('----------------------------');

    await downloadImage(item.img.thumbUrl, item.img.thumb);

    for await (const img of item.img.detail) {
      // const thumbnail = item.img.thumb.split('/').slice(-3).join('_');

      // console.log('item: ', item);
      // console.log('thumb: ', img.src.largeUrl);
      // console.log('target: ', img.src.large);
      // console.log('----------------------------');

      await downloadImage(img.src.largeUrl, img.src.large);
      await downloadImage(img.src.mediumUrl, img.src.medium);
      await downloadImage(img.src.smallUrl, img.src.small);
    }
  }

  // console.log('downloadAllImages', category, imgObject[0].img.detail);
}



async function downloadAllImages (allProjects) {

  for (const [key, value] of Object.entries(allProjects)) {
    // console.log('downloadAllImages', key, value);
    await findImages(key, value);
  }

  // console.log('downloadAllImages', allProjects);
}








module.exports = {
  getAllProjects,
  downloadAllImages
}