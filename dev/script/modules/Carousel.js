// import $ from '../jqlite.extends';

const DEFAULT_OPTIONS = {
  $carousel: undefined,
  fullRender: false,
  renderContainer: undefined,
  startIndex: 0,
};


class Carousel {
  constructor(newOptions) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, newOptions);

    this.$slider = undefined;
    this.$leftButton = undefined;
    this.$rightButton = undefined;

    this.itemCount = undefined;
    this.itemWidth = undefined;
    this.currentIndex = this.options.startIndex;
  }


  init() {
    if (this.options.fullRender) {
      this.options.$carousel = this.getCarouselTemplate();
      this.options.renderContainer.append(this.options.$carousel);
    }

    this.$slider = this.options.$carousel.querySelector('[data-slider]');

    this.setCarouselItemStyles();
    this.setButtons();
  }


  moveSlider(num) {
    this.currentIndex += num;
    this.$slider.style.left = `${-(100 * this.currentIndex)}%`;
  }


  setButtons() {
    this.$leftButton = this.options.$carousel.querySelector('[data-carousel-left-bttn]');
    this.$leftButton.addEventListener('click', () => {
      if (this.currentIndex > 0) {
        this.moveSlider(-1);
      }
    });

    this.$rightButton = this.options.$carousel.querySelector('[data-carousel-right-bttn]')
    this.$rightButton.addEventListener('click', () => {
      if (this.currentIndex < this.itemCount - 1) {
        this.moveSlider(1);
      }
    });
  }


  setCarouselItemStyles() {
    this.itemCount = this.$slider.querySelectorAll('.carousel-item').length || 0;
    this.itemWidth = 100 / this.itemCount;

    this.$slider.style.width = `${100 * this.itemCount}%`;
    [... this.$slider.querySelectorAll('.carousel-item')].forEach((el, index) => {
      el.style.width = `${this.itemWidth}%`;
      el.style.left = `${this.itemWidth * index}%`;
    });
  }


  // $contentList - List of jQuery objects
  AddCarouselItem($contentList) {
    for (let i = 0; i < $contentList.length; i += 1) {
      this.$slider.append(this.getCarouselItemTemplate($contentList[i]));
    }

    this.setCarouselItemStyles();
  }


  getCarouselTemplate() {
    const element = document.createElement('div');
    element.innerHTML = `<div class="carousel" data-carousel>
      <div class="carousel-slider-container">
        <ul class="carousel-slider" data-slider>
        </ul>
      </div>
      <div class="carousel-nav">
        <div class="carousel-btn left" data-carousel-left-bttn>
          <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <path class="arrow" d="M82.3 22.9L63.4 4 35.8 31.6 16.9 50.5l18.9 18.9L63.4 97l18.9-18.9-27.6-27.6z"/>
          </svg>
        </div>
        <div class="carousel-btn right" data-carousel-right-bttn>
          <svg class="arrow-icon right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <path class="arrow" d="M82.3 22.9L63.4 4 35.8 31.6 16.9 50.5l18.9 18.9L63.4 97l18.9-18.9-27.6-27.6z"/>
          </svg>
        </div>
      </div>
    </div>`;

    return element.firstChild;
  }


  getCarouselItemTemplate($content) {
    const listElement = document.createElement('li');
    listElement.classList.add('carousel-item');
    listElement.append($content);
    return listElement;
  }
}

export default Carousel;
