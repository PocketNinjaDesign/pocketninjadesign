const navigation = require('./navigation');


// UI Design
const pocketNinjaDesignWeb = require('./ui-design/pocketNinjaDesignWeb');
const blinkboxHackathon = require('./ui-design/blinkboxHackathon');
const blinkboxMusicWebsite = require('./ui-design/blinkboxMusicWebsite');
const blinkboxMusicInternational = require('./ui-design/blinkboxMusicInternational');
const goFishingMagazine = require('./ui-design/goFishingMagazine');
const carMagazine = require('./ui-design/carMagazine');
const createAndCraftClub = require('./ui-design/createAndCraftClub');


// Graphics
const ansaBranding = require('./graphics/ansaBranding');
const goldcrestHealthcareLogo = require('./graphics/goldcrestHealthcareLogo');
const idealworld3dtv = require('./graphics/idealworld3dtv');


// Illustration
const blueZombieSketches = require('./illustration/blueZombieSketches');
const voodooBoySketch = require('./illustration/voodooBoySketch');
const spacemanSketch = require('./illustration/spacemanSketch');
const longLostTwinCharacters = require('./illustration/longLostTwinCharacters');


module.exports = {
  navigation,
  gallery: [

  // UI DESIGN
    {
      filePrefix: {
        thumb: 'images/portfolio/ui-design/thumb/',
        detail: 'images/portfolio/ui-design/detail/',
      },

      items: [
        pocketNinjaDesignWeb,
        blinkboxHackathon,
        blinkboxMusicWebsite,
        blinkboxMusicInternational,
        goFishingMagazine,
        carMagazine,
        createAndCraftClub,
      ],
    },


    // Graphics
    {
      filePrefix: {
        thumb: 'images/portfolio/graphics/thumb/',
        detail: 'images/portfolio/graphics/detail/',
      },
      items: [
        ansaBranding,
        goldcrestHealthcareLogo,
        idealworld3dtv,
      ],
    },


    // Illustration
    {
      filePrefix: {
        thumb: 'images/portfolio/illustration/thumb/',
        detail: 'images/portfolio/illustration/detail/',
      },
      items: [
        blueZombieSketches,
        voodooBoySketch,
        spacemanSketch,
        longLostTwinCharacters,
      ],
    },
  ],
};
