import { TimelineLite } from 'gsap';
// import $ from '../jqlite.extends';

import Lists from '../Lists';
import Numbers from '../Numbers';
import Objects from '../Objects';

import PnModule from './PnModule';

const TARGET_OPTIONS = {
  element: 'body',
  inner: true,
  sides: ['top', 'right', 'bottom', 'left'],
  align: ['random', 'random', 'random', 'random'],
  popOutCallback: () => {},
  popBackCallback: () => {},
};

const DEFAULT_OPTIONS = {
  activeTime: [5000],
  animationHideSpeed: 0.7,
  animationShowSpeed: 0.7,
  $element: undefined,
  pauseTime: [1000],
  rotate: true,
  targets: [TARGET_OPTIONS],
  fixedTimes: true,
  emScale: false,
  imageOnly: true,
};

const SIDE_PLACEMENT = new Map([
  ['left', { direction: 'top', side: 'height', angle: 90 }],
  ['right', { direction: 'top', side: 'height', angle: 270 }],
  ['top', { direction: 'left', side: 'width', angle: 180 }],
  ['bottom', { direction: 'left', side: 'width', angle: 0 }],
]);

let counter = 1;



function getSizeFromHidden (element) {
  let sizes = {};
  const $parent = element.parentElement;

  const temp = document.createElement('div');
  temp.innerHTML = '<div style="position: absolute; visibility: hidden;"></div>';

  const $hiddenElement = temp.firstChild;
  $hiddenElement.append(element);

  document.body.append($hiddenElement);

  sizes = {
    width: element.offsetWidth,
    height: element.offsetHeight,
  };

  $parent.append(element);
  $hiddenElement.remove();

  return sizes;
}

function setSizeFromHidden (element) {
  const sizes = getSizeFromHidden(element);

  element.style.height = `${sizes.height / 16}em`;
  element.style.width = `${sizes.width / 16}em`;
}



class Peekaboo extends PnModule {
  constructor(options) {
    super();

    // Any peekaboo defaults
    this.opt = Object.assign({}, DEFAULT_OPTIONS, options);

    // iterate targets and merge each with target option defaults
    this.opt.targets = Lists.objectAssign(TARGET_OPTIONS, this.opt.targets);

    this.setAlignments();

    this.$peekaboo = undefined;
    this.activeTimer = undefined;
    this.id = counter;

    // Other properties
    this.currentTarget = undefined; // Object from chosen array position from this.opt.target[]
    this.activeSideNumber = undefined; // array position of this.opt.target.sides[]
    this.activeSide = undefined; // chosen side from this.opt.target.sides
    this.$target = undefined;

    counter += 1;
  }

  init() {
    this.$peekaboo = this.getTemplate(this.opt.$element);
    this.checkToScale();
    this.startPeekaboo();
  }

  checkToScale() {
    if (this.opt.emScale) {
      setSizeFromHidden(this.opt.$element);

      if (this.opt.imageOnly) {
        this.opt.$element.querySelector('img').style.width = '100%';
      }
    }
  }

  startPeekaboo() {
    // get a random target item
    this.currentTarget = this.getTarget();
    this.$target = this.currentTarget.element;

    this.activeTimer = setTimeout(() => {
      this.$peekaboo.style.display = 'block';
      // add peekaboo item to target
      this.$target.append(this.$peekaboo);

      // set which side to appear from
      this.activeSideNumber = Numbers.rndmFlrInt(this.currentTarget.sides.length);
      this.activeSide = this.currentTarget.sides[this.activeSideNumber];

      // Choose position along the side
      this.resetPositions();
      this.setNewPosition();

      // Animate
      const t1 = new TimelineLite();
      const { angle } = SIDE_PLACEMENT.get(this.activeSide);

      this.$peekaboo.style.transform = `rotate(${angle}deg)`;

      // console.log('this.$peekaboo: ', this.$peekaboo);

      this.currentTarget.popOutCallback();

      t1
        .to(this.opt.$element, 0, { y: 100 })
        .to(this.opt.$element, this.opt.animationShowSpeed, {
          y: 0,
          onComplete: () => {
            this.waitPeekaboo();
          },
        });
    }, this.getPauseTime());
  }

  waitPeekaboo() {
    // Peekaboo is now showing, so wait for
    // the active time and then hide
    this.activeTime = setTimeout(() => {
      const t1 = new TimelineLite();

      this.currentTarget.popBackCallback();

      t1.to(this.opt.$element, this.opt.animationHideSpeed, {
        y: 100,
        onComplete: () => {
          this.$peekaboo.style.display = "none";
          this.startPeekaboo();
        },
      });
    }, this.getActiveTime());
  }

  resetPositions() {
    this.$peekaboo.style.top = 'auto';
    this.$peekaboo.style.right = 'auto';
    this.$peekaboo.style.bottom = 'auto';
    this.$peekaboo.style.left = 'auto';
  }


  //
  //
  // Setters
  //
  //
  setNewPosition() {
    const newPos = {};
    const { direction } = SIDE_PLACEMENT.get(this.activeSide);
    const { side } = SIDE_PLACEMENT.get(this.activeSide);
    const alignment = this.getCurrentAlignment();

    if (alignment === 'random') {
      // console.log('random');
      this.$peekaboo.style[direction] = `${this.getRandomPosition(side)}px`;
      // newPos[direction] = `${this.getRandomPosition(side)}px`;
    } else if (alignment === 'center') {
      // console.log('center');
      this.$peekaboo.style[direction] = `${this.getCenterPosition(side)}px`;
      // newPos[direction] = `${this.getCenterPosition(side)}px`;
    } else {
      // console.log('other');
      this.$peekaboo.style[direction] = `${alignment}px`;
      // newPos[direction] = `${alignment}px`;
    }

    // TODO: fix this once the site works
    // newPos[this.activeSide] = 0;
    // console.log(newPos, this.activeSide);

    this.$peekaboo.style[this.activeSide] = 0;
  }

  setAlignments() {
    // If a string or number, generate an array of that value
    // to the length of the sides array
    for (let i = 0; i < this.opt.targets.length; i += 1) {
      const { align } = this.opt.targets[i];

      if (Objects.isString(align) || Objects.isNumber(align)) {
        this.opt.targets[i].align = Array(this.opt.targets[i].sides.length).fill(align);
      }
    }
  }


  //
  //
  // Getters
  //
  //

  getTarget() {
    return Lists.getRandomListItem(this.opt.targets);
  }

  /**
   * getPauseTime
   * returns an item from the pauseTime list
   */
  getPauseTime() {
    return (this.opt.fixedTimes) ?
      Lists.getRandomListItem(this.opt.pauseTime) :
      Numbers.rndmFlrInt(Lists.getRandomListItem(this.opt.pauseTime));
  }

  /**
   * getActiveTime
   * returns an item from the activeTime list
   */
  getActiveTime() {
    return (this.opt.fixedTimes) ?
      Lists.getRandomListItem(this.opt.activeTime) :
      Numbers.rndmFlrInt(Lists.getRandomListItem(this.opt.activeTime));
  }

  getCenterPosition(side) {
    if (side === 'height') {
      return (this.$target.offsetHeight / 2) - (this.$peekaboo.offsetHeight / 2);
    }

    return (this.$target.offsetWidth / 2) - (this.$peekaboo.offsetWidth / 2);
  }

  getRandomPosition(side) {
    if (side === 'height') {
      const mathMax = Math.max(0, this.$target.offsetHeight - this.$peekaboo.offsetHeight);
      return Numbers.rndmFlrInt(mathMax);
    }

    const mathMax = Math.max(0, this.$target.offsetWidth - this.$peekaboo.offsetWidth);
    return Numbers.rndmFlrInt(mathMax);
  }

  getCurrentAlignment() {
    return this.currentTarget.align[this.activeSideNumber];
  }

  /**
   * getPeekaboo
   * @description for getting at the peekaboo element from another script
   * @returns jQuery peekaboo object
   */
  getPeekaboo() {
    return this.$peekaboo;
  }

  getElementId() {
    return `peekaboo-${this.id}`;
  }

  /**
   * getTemplate
   * returns a template with your content inside
   * @param {$()} - jQuery object with $content added
   */
  getTemplate($content) {
    let element = document.createElement('div');
    element.innerHTML = `<div id="peekaboo-${this.id}" class="peekaboo">
      <div class="peekaboo-inner"></div>
    </div>`;

    let peekabooInner = element.querySelector('.peekaboo-inner');
    peekabooInner.appendChild($content);

    return element.firstChild;
  }
}

export default Peekaboo;
