// import $ from '../../jqlite.extends';
import Overlay from '../Overlay';


const DEFAULT_OPTIONS = {
  $container: document.body,
  positionType: 'absolute',
};


class LoaderBase {
  constructor(_options) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, _options);

    this.$animation = this.getAnimWrapper();
    this.setContainer(this.options.$container);
    this.overlay = new Overlay({
      animate: true,
    });
  }

  setContainer(_container) {
    this.options.$container = _container;
  }

  init() {
    // this.overlay.show().then((str) => {
    //   console.log('Overlay animation complete', str);
    // });
    this.overlay.show();
    // the below used to be inside the callback function but
    // the overlay would append the animation after its
    // attempted removal. For now we won't wait.
    // console.log('Appending Animation');
    this.options.$container.append(this.$animation);
  }

  hide() {
    // hide animation
    // console.log('hiding animation', this.$animation);
    this.$animation.style.display = "none";
    // this.$animation.hide();

    return new Promise((resolve) => {
      this.overlay.hide().then(() => resolve());
    });
  }

  show() {
    this.overlay.show().then(() => {
      this.$animation.style.display = block
    });
  }

  remove(str = '') {
    // Remove the Loader Animation
    // Add a Promise for an animation here
    // console.log('Removing this.$animation', this.$animation, str);
    this.$animation.classList.add('PooHead');
    this.$animation.remove();
    this.$animation.classList.add('PooHeadRemoved');

    return new Promise((resolve) => {
      this.overlay.remove().then(() => {
        resolve();
      });
    });
  }

  getAnimWrapper() {
    const temp = document.createElement('div');
    temp.innerHTML = `<div class="anim-wrapper anim-wrapper-${this.options.positionType}">
      ${this.getAnimTemplate()}
    </div>`;

    return temp.firstChild;

    // return `<div class="anim-wrapper anim-wrapper-${this.options.positionType}">
    //   ${this.getAnimTemplate()}
    // </div>`;
  }

  getAnimTemplate() {
    return '<div class="anim-default"></div>';
  }
}

export default LoaderBase;
