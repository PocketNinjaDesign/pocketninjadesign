import { TimelineLite, Linear, Elastic } from 'gsap';

// import $ from '../jqlite.extends';
import BreakPointService from '../services/BreakPoint.service';
import SideNavigationAnim from './SideNavigation.anim';

const sizeGuide = new Map([
  ['large', {
    bodyBlock1: '19%',
    bodyBlock2: '50%',
    navShowAnim() {
      SideNavigationAnim.showLargeSideBar();
    },
  }],
  ['medium', {
    bodyBlock1: 60,
    bodyBlock2: '50%',
    navShowAnim() {
      SideNavigationAnim.showMediumSideBar();
    },
  }],
  ['small', {
    bodyBlock1: 0,
    bodyBlock2: 0,
    navShowAnim() {
      SideNavigationAnim.showSmallSideBar();
    },
  }],
]);

class LandingToPortfolio {
  constructor() {
    // this.$holdingPage = document.querySelector('.under-construction');
    this.$primarySocialMedia = document.getElementById('holdingSocialLinks');
    this.$primaryLogo = document.getElementById('primaryLogo');
    this.$sideNav = document.getElementById('sideNavigation');
    this.$tree = document.getElementById('tree');

    this.sizeType = 'large';
  }

  start() {
    return new Promise((resolve) => {
      this.sizeType = BreakPointService.getWidth();
      // this.checkSize();
      this.holdingContentOut().then(() => {
        resolve();
      });
    });
  }

  holdingContentOut() {
    return new Promise((resolve) => {
      const timelineHoldingLeave = new TimelineLite({ delay: 0 });

      timelineHoldingLeave // 2.75
        .to(this.$primaryLogo, 0.6, { opacity: 0, ease: Linear.easeOut }, 0.2)
        .to('h1', 0.5, { opacity: 0, ease: Linear.easeOut }, 0.3)
        .to('h3', 0.5, { opacity: 0, ease: Linear.easeOut }, 0.45)
        .to(this.$primarySocialMedia, 0.5, { opacity: 0, ease: Linear.easeOut }, 0.75)
        .to(this.$tree, 0.5, {
          opacity: 0,
          ease: Linear.easeOut,
          onComplete: () => {
            // this.$holdingPage.style.display = 'none';
            this.$primaryLogo.style.display = 'none';
            this.$tree.style.display = 'none';
          },
        }, 0.75)
        .add(() => {
          // Start Rending the Side Navigation
          sizeGuide.get(this.sizeType).navShowAnim();
        }, 1.5)
        .add(() => this.bodyBlocks(), 1)
        .add(() => {
          // End Of Everything
          resolve();
        }, '+=1');
    });
  }

  bodyBlocks() {
    const bodyBlock1NewWidth = sizeGuide.get(this.sizeType).bodyBlock1;
    const bodyBlock2NewWidth = sizeGuide.get(this.sizeType).bodyBlock2;
    const t1 = new TimelineLite();

    return t1
      .to('.body-block', 1.5, { width: bodyBlock1NewWidth, ease: Elastic.easeOut.config(1, 0.3) })
      .to('.body-block-2', 1.5, {
        width: bodyBlock2NewWidth,
        ease: Elastic.easeOut.config(1, 0.3),
        onComplete: () => {
          document.querySelector('.body-block').style.display = 'none';
          this.$sideNav.classList.add('bg-color-1');
        },
      }, '-=1.25');
  }
}

export default new LandingToPortfolio();
