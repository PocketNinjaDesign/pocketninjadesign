import { Power2, TimelineLite } from 'gsap';
// import $ from '../jqlite.extends';

import BreakPointService from '../services/BreakPoint.service';

class SideNavigation {
  constructor() {
    const root = this;

    this.$sideNav = document.getElementById('sideNavigation');
    this.$sideNavLink = this.$sideNav.querySelector('.side-link');
    this.$logo = this.$sideNav.querySelector('.logo');
    this.$socialMediaLink = document.querySelector('#sideSocialLinks .social-media-link');

    this.sizeGuide = new Map([
      ['large', {
        inactiveWidth: '19%',
        activeWidth: '40%',
        showAnim() { root.showFullSideBar(); },
      }],
      ['medium', {
        inactiveWidth: 60,
        activeWidth: '40%',
        showAnim() { root.showMediumSideBar(); },
      }],
      ['small', {
        inactiveWidth: 0,
        activeWidth: '100%',
        showAnim() { root.showSmallestSideBar(); },
      }],
    ]);
  }

  showActiveSideBar(callBack = () => {}) {
    const width = BreakPointService.getWidth();
    const sizes = this.sizeGuide.get(width) || 'small';

    return new Promise((resolve) => {
      if (width !== 'large') {
        const t1 = new TimelineLite();
        t1
          .fromTo(this.$sideNav, 0.5, {
            width: sizes.inactiveWidth,
          }, {
            width: sizes.activeWidth,
            ease: Power2.easeOut,
          })
          .add(() => {
            callBack();
          })
          .add(this.logoAnimationIn(), 0.3)
          .add(this.sideNavLinkAnimationIn(), 0.35)
          .add(this.socialMediaAnimationIn(), 0.35)
          .add(() => {
            this.removeStyles();
            resolve();
          });
      }
    });
  }

  hideActiveSideBar(callBack = () => {}) {
    const t1 = new TimelineLite();
    const bpWidth = BreakPointService.getWidth();
    const sizes = this.sizeGuide.get(bpWidth);

    return new Promise(() => {
      t1.fromTo(this.$sideNav, 0.5, {
        width: sizes.activeWidth,
      }, {
        width: sizes.inactiveWidth,
        ease: Power2.easeOut,
      });

      if (bpWidth !== 'large') {
        t1
          .add(this.logoAnimationOut(), 0.1)
          .add(this.sideNavLinkAnimationOut(), 0.1)
          .add(this.socialMediaAnimationOut(), 0.1);
      }

      t1
        .add(() => {
          callBack();
          this.removeStyles();
        });
    });
  }


  //
  // FIRST TIME REVEAL ANIMATIONS
  //

  showLargeSideBar() {
    const t1 = new TimelineLite({ delay: 0 });

    t1
      .add(() => { this.$sideNav.style.display = 'block'; })
      .add(this.logoAnimationIn())
      .add(this.sideNavLinkAnimationIn(), 0.5)
      .add(this.socialMediaAnimationIn(), 0.2)
      .add(() => {
        this.removeStyles();
      });
  }

  showMediumSideBar() {
    const t1 = new TimelineLite({ delay: 0 });

    t1
      .add(() => { this.$sideNav.style.display = 'block'; })
      .add(this.socialMediaAnimationIn(), 0.2)
      .add(() => {
        this.removeStyles();
      });
  }

  showSmallSideBar() {
    this.removeStyles();
  }

  removeStyles() {
    // Remove !important style attributes so media
    // queries in the css can take back control
    this.$logo.removeAttribute('style');
    this.$sideNav.removeAttribute('style');
    this.$sideNavLink.removeAttribute('style');
    this.$socialMediaLink.removeAttribute('style');
  }


  //
  // Single Component Animations
  //

  // Logo
  logoAnimationIn(onComplete = () => {}) {
    return new TimelineLite().fromTo(this.$logo, 0.3, { y: -30, opacity: 0 }, {
      y: 0,
      opacity: 1,
      ease: Power2.easeOut,
      onComplete,
    });
  }
  logoAnimationOut(onComplete = () => {}) {
    return new TimelineLite().fromTo(this.$logo, 0.1, { opacity: 1 }, { opacity: 0, onComplete });
  }


  // SideNav Links
  sideNavLinkAnimationIn() {
    return new TimelineLite().staggerFromTo(this.$sideNavLink, 0.5, { x: -30, opacity: 0 }, {
      x: 0,
      opacity: 1,
      ease: Power2.easeOut,
    }, 0.2, 0);
  }
  sideNavLinkAnimationOut() {
    return new TimelineLite().to(this.$sideNavLink, 0.1, { opacity: 0 });
  }


  // Social Media
  socialMediaAnimationIn() {
    return new TimelineLite().staggerFromTo(this.$socialMediaLink, 0.01, { y: -20, opacity: 0 }, {
      y: 0,
      opacity: 1,
      ease: Power2.easeOut,
    }, 0.1, 0);
  }
  socialMediaAnimationOut() {
    return new TimelineLite().to(this.$socialMediaLink, 0.1, { opacity: 0 });
  }
}

export default new SideNavigation();
