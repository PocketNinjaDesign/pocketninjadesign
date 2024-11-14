import Methods from '../Methods';
import Overlay from './Overlay';
import SideNavigationAnim from '../animations/SideNavigation.anim';
import BreakPointService from '../services/BreakPoint.service';

class SideNavigation {
  constructor() {
    this.state = false;
    this.navOnClick = undefined;
    this.overlay = new Overlay({
      addedClass: 'overlay-side-nav',
      zIndex: 190,
    });
    this.$sideNavigation = document.getElementById('sideNavigation');
    this.$sideNavigationMenu = document.getElementById('sideNavigationMenu');
    this.$sideNavBurgerButton = document.getElementById('sideNavBurgerButton');
  }

  init(navOnClick = () => {}) {
    this.navOnClick = navOnClick;
    this.setSideLinks();
    this.setBurgerMenu();
    this.overlay.setClick(() => {
      this.burgerMenuClick();
    });
  }

  burgerMenuClick() {
    if (this.state) {
      window.removeEventListener('resize', Methods.debounce(() => {
        if (window.innerWidth > BreakPointService.bpMedium) {
          root.burgerMenuClick();
        }
      }, 10));
      // $(window).off('resize');
      this.$sideNavBurgerButton.classList.remove('active');
      this.overlay.hide();

      SideNavigationAnim.hideActiveSideBar(() => {
        this.$sideNavigation.classList.remove('active');
      });
    } else {
      // Activate burger menu and navigation
      SideNavigationAnim.showActiveSideBar(() => {
        this.$sideNavBurgerButton.classList.add('active');
        this.$sideNavigation.classList.add('active');
      });
      this.overlay.show();

      // Start page resize checking
      this.setResizeCheck();
    }

    this.state = !this.state;
  }

  setBurgerMenu() {
    this.$sideNavBurgerButton.addEventListener('click', () => {
      this.burgerMenuClick();
    });
  }

  setResizeCheck() {
    const root = this;

    window.addEventListener('resize', Methods.debounce(() => {
      if (window.innerWidth > BreakPointService.bpMedium) {
        root.burgerMenuClick();
      }
    }, 10));

    // $(window).on('resize', Methods.debounce(() => {
    //   if (window.innerWidth > BreakPointService.bpMedium) {
    //     root.burgerMenuClick();
    //   }
    // }, 10));
  }

  setSideLinks() {
    const $allLi = [... this.$sideNavigationMenu.querySelectorAll('li')];
    const sideLinks = [... this.$sideNavigationMenu.querySelectorAll('.side-link')];

    sideLinks.forEach((sideLink) => {
      sideLink.addEventListener('click', (e) => {
        e.preventDefault();

        const $this = e.currentTarget;

        // remove active class from all list items
        $allLi.forEach((listItem) => {
          listItem.classList.remove('active');
        });

        $this.parentElement.classList.add('active');

        if ( "index" in $this.dataset ) {
          // send back the slug name like "uidesign", "graphics"
          this.navOnClick($this.dataset.slug);
        }

        if (this.state) {
          this.burgerMenuClick();
        }
      });
    });
  }

  setSideLinkStyles(category) {
    const listItems = [... this.$sideNavigationMenu.querySelectorAll('li')];
    listItems.forEach((item, itemIndex) => {
      item.classList.remove('active');

      if (item.querySelector('a').dataset.slug === category) {
        item.classList.add('active');
      }
    });
  }
}

export default new SideNavigation();
