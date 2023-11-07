import $ from 'jqlite';
import Colors from '../../Colors';
import Objects from '../../Objects';
import Lists from '../../Lists';
import NinjaTemplates from './NinjaTemplates';

let counter = 0;

const DEFAULT_COLORS = new Map();
const DEFAULT_OPTIONS = {
  hexColor: '',
  colorName: '',
  fixedColor: false,
  features: {
    brows: false,
    chucks: false,
    sword1: true,
    sword2: true,
    leftEye: true,
    rightEye: true,
    shuriken1: false,
    shuriken2: false,
  },
};

const generateNinjaColor = hexColor => ({
  base: hexColor,
  light: Colors.colorLuminance(hexColor, 0.3),
  dark: Colors.colorLuminance(hexColor, -0.3),
});

DEFAULT_COLORS.set('red', generateNinjaColor('#ed183c'));
DEFAULT_COLORS.set('green', generateNinjaColor('#01ad4e'));
DEFAULT_COLORS.set('blue', generateNinjaColor('#808dff'));
DEFAULT_COLORS.set('grey', generateNinjaColor('#3b3b3b'));

class Ninja {
  constructor(options) {
    this.opts = Objects.extend(DEFAULT_OPTIONS, options);
    this.ninjaColorList = DEFAULT_COLORS;

    // If hexColor & colorName have values, add them to the colorList
    if (this.opts.hexColor.length > 0 && this.opts.colorName.length > 0) {
      this.addColor(this.opts.colorName, this.opts.hexColor);
    }

    if (this.opts.fixedColor && this.opts.colorName.length > 0) {
      this.ninjaColors = this.ninjaColorList.get(this.opts.colorName);
    } else {
      const colorKeysToList = Array.from(this.ninjaColorList.keys());
      this.ninjaColors = this.ninjaColorList.get(Lists.getRandomListItem(colorKeysToList));
    }

    this.ninjaId = counter;
    counter += 1;
  }

  addColor(name, hexColor) {
    this.ninjaColorList.set(name, generateNinjaColor(hexColor));
  }

  removeColor(name) {
    this.ninjaColorList.delete(name);
  }

  getNinjaTemplate() {
    const id = this.ninjaId;
    const feature = this.opts.features;
    let templateBase = NinjaTemplates.baseStart(id, this.ninjaColors);

    if (feature.sword1) {
      templateBase += NinjaTemplates.sword1(id);
    }

    if (feature.sword2) {
      templateBase += NinjaTemplates.sword2(id);
    }

    templateBase += NinjaTemplates.body(id);
    templateBase += NinjaTemplates.visor(id);

    if (feature.leftEye) {
      templateBase += NinjaTemplates.leftEye(id);
    }

    if (feature.rightEye) {
      templateBase += NinjaTemplates.rightEye(id);
    }

    templateBase += NinjaTemplates.baseEnd();

    return $(templateBase);
  }
}

export default Ninja;
