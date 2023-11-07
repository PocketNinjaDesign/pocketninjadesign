import { TimelineLite } from 'gsap';
// import $ from '../jqlite.extends';

class Animation {
  constructor(className = '') {
    this.className = className;
    this.$animation = this.getTemplate();
  }

  start() {
    this.$animation.appendTo('body');
    return this.setAnimationPiece();
  }

  setAnimationPiece() {
    const t1 = new TimelineLite();

    const $tl = this.$animation.querySelector('.u-l');
    const $tr = this.$animation.querySelector('.u-r');
    const $bl = this.$animation.querySelector('.b-l');
    const $br = this.$animation.querySelector('.b-r');

    const width = $tl.offsetWidth;
    const height = $tl.offsetHeight;

    return new Promise((resolve) => {
      t1
        .fromTo($tl.querySelector('.u-l-inner'), 0.4, { y: (height * 2), x: width }, {
          y: 0,
          x: 0,
          onComplete: () => {
            resolve();
          },
        })
        .fromTo($tr.querySelector('.u-r-inner'), 0.4, { y: (height * 2), x: -width }, { y: 0, x: 0 }, '-=0.3')
        .fromTo($bl.querySelector('.b-l-inner'), 0.4, { y: -height, x: width }, { y: 0, x: 0 }, '-=0.3')
        .fromTo($br.querySelector('.b-r-inner'), 0.4, { y: -height, x: -width }, { y: 0, x: 0 }, '-=0.3');
    });
  }

  getTemplate() {
    let element = document.createElement('div');
    element.innerHTML = `<div class="full-animation-1 ${this.className}">
      <div class="u-l"><div class="u-l-inner"></div></div>
      <div class="u-r"><div class="u-r-inner"></div></div>
      <div class="b-l"><div class="b-l-inner"></div></div>
      <div class="b-r"><div class="b-r-inner"></div></div>
    </div>`;
    return element.firstChild;
  }
}

export default Animation;
