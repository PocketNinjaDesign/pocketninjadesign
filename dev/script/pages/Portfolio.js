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

  init(loadOnInit = true, selectedOption = 0) {
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
      // console.log('Method: setSelectedOption,  initialised new loader');

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
    HistoryService.pushHistory({
      name: this.getPageUrl(),
      menuState: this.selectedOption,
    }, 'Page', this.getPageUrl());
  }

  setPortfolioList() {
    // Create Portfolio List from Gallery Items
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
    return PortfolioData.navigation[this.selectedOption].className;
  }

  getPageUrl() {
    return PortfolioData.navigation[this.selectedOption].page;
  }

  getCategory() {
    return PortfolioData.navigation[this.selectedOption].title;
  }

  getFilePrefix() {
    return PortfolioData.gallery[this.selectedOption].filePrefix;
  }

  getGalleryList() {
    return galleryMap.get(this.getCategory());
  }
}

export default new PagePortfolio();
