import Lists from '../../Lists';
import Peekaboo from '../Peekaboo';
import Ninja from './Ninja';

const DEFAULT_TARGETS = [{ element: 'body' }];

class NinjaList {
  constructor(targetList = DEFAULT_TARGETS) {
    this.ninjaList = new Map();
    this.targetList = Lists.objectAssign(DEFAULT_TARGETS, targetList);
  }

  generateNinjas(total) {
    for (let i = 0; i < total; i += 1) {
      const ninja = new Ninja();

      this.addNinjaToList(new Peekaboo({
        $element: ninja.getNinjaTemplate(),
        targets: this.targetList,
        animationHideSpeed: 0.05,
        animationShowSpeed: 0.05,
        fixedTimes: false,
      }), ninja);
    }
  }

  addNinjaToList(peekabooNinja, ninja) {
    this.ninjaList.set(peekabooNinja.getElementId, {
      peekaboo: peekabooNinja,
      ninja,
    });
    peekabooNinja.init();
  }
}

export default NinjaList;
