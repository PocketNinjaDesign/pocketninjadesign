import { TweenMax } from 'gsap';

let counter = 1;

// Active mode applied without animation
const ACTIVE_CLASSNAME = 'active';

// Active mode applied with animation
const ACTIVE_CLASSNAME_ANIMATION_MODE = 'active-in-animate-mode';

// If click enabled apply styles
const CLICK_ENABLED_CLASSNAME = 'click-enabled';


const DEFAULT_OPTIONS = {
  container: document.body,
  onClick: undefined,
  addedClass: '',
  isToggle: false,
  fullBody: true,
  animate: false,
  animationDurationIn: 0.5,
  animationDurationOut: 0.5,
  zIndex: undefined,
};


class Overlay {
  constructor(options) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
    this.$overlay = this.getTemplate();

    if (this.options.zIndex !== undefined) {
      this.$overlay.style.zIndex = this.options.zIndex;
    }

    this.scrollTop = undefined;
    this.active = false;
    counter += 1;

    if (this.hasClick()) {
      this.setClick(this.options.onClick, this.options.isToggle);
    }
    this.options.container.append(this.$overlay);
  }

  /**
   * setClick
   *
   * @param {function} fn
   * @param {Boolean} isToggle
   */
  setClick(fn = () => {}, isToggle = false) {
    this.$overlay.classList.add(CLICK_ENABLED_CLASSNAME)
    this.$overlay.addEventListener('click', () => {
      fn();
      if (isToggle) {
        this.toggle();
      }
    });
  }

  hasClick() {
    return this.options.onClick !== undefined;
  }

  clearClick() {
    if (this.hasClick()) {
      this.options.onClick = undefined;
    }
  }

  toggle() {
    this.$overlay.classList.toggle(ACTIVE_CLASSNAME);
    this.active = !this.active;

    if (this.active) {
      this.addFullBodyMode();
    } else {
      this.removeFullBodyMode();
    }
  }

  show() {
    return new Promise((resolve) => {
      if (this.options.animate) {
        TweenMax.to(this.$overlay, this.options.animationDurationIn, {
          opacity: 1,
          onStart: () => {
            // Show the overlay
            this.active = true;
            this.$overlay.classList.add(ACTIVE_CLASSNAME_ANIMATION_MODE);
            this.addFullBodyMode();
          },
          onComplete: () => {
            resolve('Overlay animated in.');
          },
        });
      } else {
        this.active = true;
        this.$overlay.classList.add(ACTIVE_CLASSNAME);
        this.addFullBodyMode();
        resolve('Overlay appeared without animation.');
      }
    });
  }

  hide() {
    return new Promise((resolve) => {
      if (this.options.animate) {
        TweenMax.to(this.$overlay, this.options.animationDurationOut, {
          opacity: 0,
          onComplete: () => {
            this.active = false;
            this.$overlay.classList.remove(ACTIVE_CLASSNAME, ACTIVE_CLASSNAME_ANIMATION_MODE);
            this.removeFullBodyMode();
            resolve();
          },
        });
      } else {
        this.active = false;
        this.$overlay.classList.remove(ACTIVE_CLASSNAME, ACTIVE_CLASSNAME_ANIMATION_MODE);
        this.removeFullBodyMode();
        resolve();
      }
    });
  }

  addFullBodyMode() {
    if (this.options.fullBody) {
      this.scrollTop = window.scrollY;
      if ( document.querySelector('.main') !== null ) {
        document.querySelector('.main').style.top = -this.scrollTop;
      }

      document.documentElement.classList.add('full-overlay-mode');
    }
  }

  removeFullBodyMode() {
    if (this.options.fullBody) {
      document.documentElement.classList.remove('full-overlay-mode');
      if ( document.querySelector('.main') !== null ) {
        document.querySelector('.main').removeAttribute('style');
      }
      window.scroll(this.scrollTop, 0);
    }
  }

  remove() {
    return new Promise((resolve) => {
      this.clearClick();

      if (this.options.animate) {
        TweenMax.to(this.$overlay, this.options.animationDurationOut, {
          opacity: 0,
          onComplete: () => {
            this.removeActionComplete();
            resolve();
          },
        });
      } else {
        this.removeActionComplete();
        resolve();
      }
    });
  }

  removeActionComplete() {
    this.hide();
    this.$overlay.remove();
  }

  getTemplate() {
    const element = document.createElement('div');
    element.innerHTML = `<div id="overlay-${counter}" class="overlay ${this.options.addedClass}"></div>`;
    return element.firstChild;
  }
}

export default Overlay;
