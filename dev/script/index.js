
import PageHolding from './pages/Holding';
import PortfolioLanding from './pages/PortfolioLanding';

if ( document.body.classList.contains('page-holding') ) {
  // console.log('Main Landing Page');
  PageHolding.init();
} else if ( document.body.classList.contains('page-portfolio-landing') ) {
  // console.log('Portfolio Landing Page');
  PortfolioLanding.init();
}
