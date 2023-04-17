
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