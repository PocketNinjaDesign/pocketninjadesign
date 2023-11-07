
import EnterButtonAnim from '../animations/EnterButton.anim.js';
import LandingToPortfolioAnim from '../animations/LandingToPortfolio.anim';
import NinjaList from '../modules/ninja/NinjaList';
import Peekaboo from '../modules/Peekaboo';
import Portfolio from '../pages/Portfolio';
import Tree from '../modules/Tree';

class PageHolding {
  constructor() {
    // Primary Popup character
    this.mainNinja = undefined;
    this.ninjas = undefined;
    this.tree = new Tree();
    this.ninjas = new NinjaList();
  }

  init() {
    // Create the main Pocketninja who can
    // appear in the body and the tree while adding
    // popout callbacks
    this.mainNinja = new Peekaboo({
      $element: document.getElementById('ninja'),
      targets: [{
        element: document.body,
      }, {
        element: document.getElementById('branch'),
        sides: ['bottom'],
        popOutCallback: () => {
          this.tree.animateTo();
        },
        popBackCallback: () => {
          this.tree.animateFrom();
        },
      }],
      animationHideSpeed: 0.2,
      animationShowSpeed: 0.2,
      fixedTimes: false,
      emScale: true,
    });
    this.mainNinja.init();

    // Generate a load of random ninjas
    // For now it is the list only, I'll figure out
    // what I want from a ninja class later.
    // this.ninjas.generateNinjas(3);

    // Start Enter Button Animation
    EnterButtonAnim.start('holdingEnterButton');

    const holdingEnterButton = document.getElementById('holdingEnterButton');

    // Animation Testing button
    const holdingEnterButtonClick = () => {
      holdingEnterButton.removeEventListener('click', holdingEnterButtonClick, true);
      LandingToPortfolioAnim
        .start()
        .then(() => {
          // Animation Finished
          // 1. Remove the Holding content
          // 2. Get Loading Portfolio
          document.querySelector('.under-contruction').remove();
          document.body.classList.remove('page-holding');
          Portfolio.init();
        });
    }

    document.getElementById('holdingEnterButton').addEventListener('click', holdingEnterButtonClick);
  }
}

export default new PageHolding();
