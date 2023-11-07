// import $ from '../jqlite.extends';
import Portfolio from './Portfolio';

class PagePortfolioLanding {
  constructor() {
    this.$sideNavigation = document.getElementById('sideNavigation');
    this.$tree = document.getElementById('tree');
  }

  init() {
    // Make a few tweaks to the page and
    // intialise the Portfolio
    this.$sideNavigation.removeAttribute('style');
    this.$sideNavigation.classList.add('bg-color-1');

    this.$tree.style.display = 'block';

    Portfolio.init(false, parseInt(this.$sideNavigation.dataset.portfolioSelected, 10));
  }
}

export default new PagePortfolioLanding();