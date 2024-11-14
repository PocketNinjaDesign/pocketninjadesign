// import $ from '../../jqlite.extends';
import PortfolioDetail from './PortfolioDetail';

const DEFAULT_OPTIONS = {
  category: '',
  galleryList: new Map(),
  target: '.portfolio-list',
  filePrefix: {},
};

class PortfolioList {
  constructor(newOptions) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, newOptions);
  }

  init() {
    const root = this;

    const listItems = document
      .querySelector(this.options.target)
      .querySelectorAll('.portfolio-list-item');

    // $(this.options.target)
    listItems.forEach((element, index) => {
      element.addEventListener('click', (e) => {
        const $this = e.currentTarget;
        const projectTitle = $this.getAttribute('data-project-title');
        const portfolioContent = root.options.galleryList.get(projectTitle);

        PortfolioDetail.init({
          type: portfolioContent.type,
          title: portfolioContent.title,
          filePrefix: root.options.filePrefix,
          images: portfolioContent.img.detail,
          externalLink: portfolioContent.externalLink,
        });
        PortfolioDetail.show();
      })
    });
  }
}

export default PortfolioList;
