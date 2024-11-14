const axios = require('axios');
const fs = require('fs');
const path = require('path');

// http://pocketninjadesign.local/wp-content/uploads/2023/11/pocketninjadesign-adobe-xd-thumb-large.png

const imgUrl = "http://pocketninjadesign.local/wp-content/uploads/2023/11/pocketninjadesign-adobe-xd-thumb-large.png";
const localFilePath = "images/downloaded_image.png";




async function downloadImage(url, localPath) {
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


downloadImage(imgUrl, localFilePath)
  .then(() => console.log('Image downloaded successfully.'))
  .catch((error) => console.error('Failed to download image:', error));