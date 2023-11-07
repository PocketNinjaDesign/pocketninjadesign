

export default {

  // Code found on Sitepoint
  // url: https://www.sitepoint.com/javascript-generate-lighter-darker-color/
  // Author: Craig Butler
  // Why?: Not enough time to study the Hex system when I have to
  // get cool stuff out. Will study this wheel eventually though.

  colorLuminance(hexColor, lum = 0) {
    // validate hex string
    let hex = hexColor;
    hex = String(hex).replace(/[^0-9a-f]/gi, '');

    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    // convert to decimal and change luminosity
    let rgb = '#';
    let c;
    let i;

    for (i = 0; i < 3; i += 1) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += (`00${c}`).substr(c.length);
    }

    return rgb;
  },
};
