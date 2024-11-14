// Import data and convert into new Maps
// const data = require('./siteData');
const data = PND.siteData;
// console.log('Portfolio Data - PND.siteData: ', PND.siteData);

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

for (const key in data.navigation) {
  if (data.navigation.hasOwnProperty(key)) {
    const value = data.navigation[key];
    // console.log(`Key: ${key}, Value: ${value}`);
    galleryMap.set(key, setGalleryItemsToMap(data.portfolio[key].items));
  }
}

// for (let i = 0; i < data.navigation.length; i += 1) {
//   const gallerySlug = data.navigation[i].slug;
//   console.log('gallerySlug', gallerySlug);
//   galleryMap.set(gallerySlug, setGalleryItemsToMap(data.portfolio[gallerySlug].items));
// }

// console.log('galleryMap', galleryMap);

export { galleryMap, data };
