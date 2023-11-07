// Import data and convert into new Maps
const data = require('./siteData');

// Convert siteData into a set of Maps
const galleryMap = new Map();
const setGalleryItemsToMap = (itemsList) => {
  const itemMap = new Map();

  for (let i = 0; i < itemsList.length; i += 1) {
    const { title } = itemsList[i];
    itemMap.set(title, itemsList[i]);
  }

  return itemMap;
};

for (let i = 0; i < data.navigation.length; i += 1) {
  const galleryTitle = data.navigation[i].title;
  galleryMap.set(galleryTitle, setGalleryItemsToMap(data.gallery[i].items));
}

export { galleryMap, data };
