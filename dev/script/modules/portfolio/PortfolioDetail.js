// import $ from '../../jqlite.extends';

import Carousel from '../Carousel';
import SocialMediaLinks from '../../templates/socialMediaLinks';
import BurgerMenu from '../BurgerMenu';
import PortfolioDetailImage from './PortfolioDetailImage';

const DEFAULT_OPTIONS = {
  type: 'ProjectType',
  title: 'Project Name',
  images: [],
  externalLink: undefined,
};

class PortfolioDetail {
  constructor() {
    this.options = undefined;
    this.carousel = undefined;
    this.$portfolioDetail = undefined;
    this.$portfolioDetailHeader = undefined;
    this.$portfolioDetailContent = undefined;
    this.$portfolioDetailMobileImages = undefined;
  }

  init(newOptions) {
    // Alter the root data
    this.options = Object.assign({}, DEFAULT_OPTIONS, newOptions);

    // console.log(this.options);

    this.$portfolioDetail = this.getPortfolioDetailTemplate({
      type: this.options.type,
      title: this.options.title,
    });
    this.$portfolioDetailHeader = this.$portfolioDetail.querySelector('.portfolio-detail-header');
    this.$portfolioDetailHeader.append(BurgerMenu('portfolioDetailCloseButton', () => {
        this.remove();
    }, true, true));
    this.$portfolioDetailContent = this.$portfolioDetail.querySelector('.portfolio-detail-content');
    this.$portfolioDetailMobileImages = this.$portfolioDetail.querySelector('.portfolio-detail-mobile-images');

    this.populate();
  }

  populate() {
    const listLength = this.options.images.length;

    if (listLength === 1) {
      // 1 image: just display inside of container no carousel
      this.$portfolioDetailContent.append(this.getSingleImageTemplate());
    } else if (listLength > 1) {
      // 1+ images: generate Carousel with images & images block for thin pages
      this.carousel = new Carousel({
        renderContainer: this.$portfolioDetailContent,
        fullRender: true,
      });
      this.carousel.init();
      this.getAllImageTemplate();
      // this.$portfolioDetailContent.append(this.getAllImageTemplate());
    }
  }

  show() {
    document.body.append(this.$portfolioDetail);
    document.documentElement.classList.add('full-overlay-mode');

    // HACK,  waits for all content to render and then applies
    // the touch class to get your IOS device scrolling smoothly
    setTimeout(() => {
      // Try adding the tool device class when all is rendered
      this.$portfolioDetail.classList.add('tool-device-touch');
    }, 500);
  }

  remove() {
    this.$portfolioDetail.remove();
    document.documentElement.classList.remove('full-overlay-mode');
  }

  getExternalLink() {
    return (this.options.externalLink !== undefined) ?
      `<a href="${this.options.externalLink.url}" class="detail-external-link" target="_blank">${this.options.externalLink.text || 'Visit site'}</a>` : '';
  }

  getPortfolioDetailTemplate(data) {
    const element = document.createElement('div');
    element.innerHTML = `<div id="portfolioDetail" class="portfolio-detail">
        <header id="portfolioDetailHeader" class="portfolio-detail-header">
          <div class="detail-header-info">
            <h1 class="detail-title">${data.type}: <span>${data.title}</span></h1>
            ${this.getExternalLink()}
          </div>
        </header>
        <div id="portfolioDetailContent" class="portfolio-detail-content">
          <div id="portfolioDetailMobileImages" class="portfolio-detail-mobile-images"></div>
        </div>
        <footer class="portfolio-detail-footer">
          ${SocialMediaLinks.getFullTemplate('portfolioDetailSocial')}
        </footer>
      </div>`;

    return element.firstChild;
  }

  getSingleImageTemplate() {
    const image = this.options.images[0];

    // Add small browser width image
    this.$portfolioDetailMobileImages.append(PortfolioDetailImage.getImageTemplate({
      filePrefix: this.options.filePrefix.detail,
      imageSrcData: image.src,
      imgClassName: 'portfolio-image-mobile',
    }));

    // Return large browser width image
    const profileImage = document.createElement('div');

    profileImage.classList.add('portfolio-image');
    profileImage.style.backgroundColor = image.bgColor || 'transparent';
    profileImage.append(PortfolioDetailImage.getImageTemplate({
      filePrefix: this.options.filePrefix.detail,
      imageSrcData: image.src,
    }));

    return profileImage;
  }

  getAllImageTemplate() {
    const imagesList = this.options.images;
    const newImageList = [];

    for (let i = 0; i < imagesList.length; i += 1) {
      const template = document.createElement('div');
      template.classList.add('portfolio-image');
      template.style.backgroundColor = imagesList[i].bgColor || 'transparent';
      template.append(PortfolioDetailImage.getImageTemplate({
        filePrefix: this.options.filePrefix.detail,
        imageSrcData: imagesList[i].src,
      }));

      // const template = $('<div class="portfolio-image"></div>')
      //   .css({ 'background-color': imagesList[i].bgColor || 'transparent' })
      //   .append($(PortfolioDetailImage.getImageTemplate({
      //     filePrefix: this.options.filePrefix.detail,
      //     imageSrcData: imagesList[i].src,
      //   })));

      newImageList.push(template);

      this.$portfolioDetailMobileImages.append(PortfolioDetailImage.getImageTemplate({
        filePrefix: this.options.filePrefix.detail,
        imageSrcData: imagesList[i].src,
        imgClassName: 'portfolio-image-mobile',
      }));
    }

    this.carousel.AddCarouselItem(newImageList);
  }
}

export default new PortfolioDetail();
