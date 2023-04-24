
// Modules
import debounce from './util/debounce.js';
import isMobile from './util/os.js';




/**
 * Page resize but only if it is mobile
 */
let pageHeightSetter = () => {
  if (isMobile()) {
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
  }
};

window.addEventListener('resize', debounce(pageHeightSetter, 50));

// run it first
pageHeightSetter();



// Quick gsap test
const t1 = new TimelineLite();
const logo = document.querySelector('.logo');

logo.addEventListener('mouseenter', () => {
  t1.to( logo, 0.5, { scale: 1.2,  ease: Elastic.easeOut.config(1, 0.3) } );
});

logo.addEventListener('mouseleave', () => {
  t1.to( logo, 0.25, { scale: 1,  ease: Elastic.easeOut.config(1, 0.3) } );
});
