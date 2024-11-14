// import $ from '../jqlite.extends';
import { data as PortfolioData, galleryMap } from '../data/portfolio.data';

import GalleryInAnimation from '../animations/GalleryIn.anim';
import HistoryService from '../services/History.service';
import LoadDataService from '../services/LoadData.service';
import LoaderAnim from '../modules/loaderAnims/LoaderAnim';
import PortfolioList from '../modules/portfolio/PortfolioList';
import SideNavigation from '../modules/SideNavigation';

class PagePortfolio {
  constructor() {
    this.$contentArea = document.getElementById('contentArea');
    this.loader = undefined;
    this.loadOnInit = undefined;
    this.portfolioList = undefined;
    this.pushHistoryActive = true;
    this.selectedOption = undefined;
  }

  init(loadOnInit = true, selectedOption = 'uidesign') {
    this.loader = new LoaderAnim();
    this.loadOnInit = loadOnInit;
    this.selectedOption = selectedOption;

    SideNavigation.init((newSelected) => {
      this.setSelectedOption(newSelected);
    });

    if (this.loadOnInit) {
      document.body.classList.add(this.getPageClassName());

      this.loader.init();
      // console.log('this.loader INIT');

      this.getPageData().then(() => {
        GalleryInAnimation.start();
        this.setPortfolioList();
      });
    }
    else {
      // Gallery is a landing page and content
      // already exists so start animation
      GalleryInAnimation.start();
      this.setPortfolioList();
    }

    this.setBrowserHistory();

    window.onpopstate = (e) => {
      this.pushHistoryActive = false;
      this.setSelectedOption(e.state.menuState);
      SideNavigation.setSideLinkStyles(e.state.menuState);
    };
  }

  //
  // Setters
  //

  setSelectedOption(newSelected) {
    if (this.selectedOption !== newSelected) {
      this.selectedOption = newSelected;

      // initialise a loader animation
      this.loader = new LoaderAnim();
      this.loader.init();
      // console.log('Method: setSelectedOption: ', newSelected);

      // get the page
      this.getPageData().then(() => {
        this.pushHistoryActive = true;
        // Refresh the content
        GalleryInAnimation.start();
        this.setPortfolioList();
      });
    }
  }

  setBrowserHistory() {
    // console.log('setBrowserHistory selectedOption: ', {
    //   name: this.getPageUrl(),
    //   menuState: this.selectedOption,
    // });
    HistoryService.pushHistory({
      name: this.getPageUrl(),
      menuState: this.selectedOption,
    }, 'Page', this.getPageUrl());
  }

  setPortfolioList() {
    // Create Portfolio List from Gallery Items

    // console.log('Portfolio: ', this.getGalleryList());

    this.portfolioList = new PortfolioList({
      category: this.getCategory(),
      galleryList: this.getGalleryList(),
      filePrefix: this.getFilePrefix(),
    });
    this.portfolioList.init();
  }


  //
  // Getters
  //

//import { data as PortfolioData, galleryMap } from '../data/portfolio.data';

  getPageData() {
    return new Promise((resolve) => {
      LoadDataService.loadElement(this.getPageUrl(), '#contentArea').then(($element) => {
        this.loader
          .remove('getPageData')
          .then(() => {
            this.$contentArea.innerHTML = $element.innerHTML;
            // this.$contentArea.html($element.html());
            if (this.pushHistoryActive) {
              this.setBrowserHistory();
            }
            resolve($element);
          });
      });
    });
  }

  getPageClassName() {
    return PND.siteData.navigation[this.selectedOption].className;
  }

  getPageUrl() {
    return PND.siteData.navigation[this.selectedOption].page;
  }

  getCategory() {
    return PND.siteData.navigation[this.selectedOption].title;
  }

  getFilePrefix() {
    return PND.siteData.portfolio[this.selectedOption].filePrefix;
  }

  getPageSlug() {
    return PND.siteData.navigation[this.selectedOption].slug;
  }

  /**
   * Get a list of objects based on the current category
   * @returns {map} The Map list of projects as objects
   */
  getGalleryList() {
    // console.log('this.getCategory()', this.getPageSlug());
    // console.log('galleryMap.get(this.getCategory()):', galleryMap.get(this.getPageSlug()));
    return galleryMap.get(this.getPageSlug());
  }
}

export default new PagePortfolio();
