import { TimelineLite, Elastic } from 'gsap';
// import $ from '../jqlite.extends';

class Tree {
  constructor() {
    this.$tree = document.getElementById('tree1');
    this.branch1 = document.getElementById('branch-1');
    this.branch2 = document.getElementById('branch-2');
    this.branch3 = document.getElementById('branch-3');
    this.branch4 = document.getElementById('branch-4');
    this.branch5 = document.getElementById('branch-5');
    this.branch1Shadow = document.getElementById('branch-1-shadow');
    this.branch2Shadow = document.getElementById('branch-2-shadow');
    this.branch3Shadow = document.getElementById('branch-3-shadow');
    this.branch4Shadow = document.getElementById('branch-4-shadow');
    this.branch5Shadow = document.getElementById('branch-5-shadow');
  }

  animateTo() {
    const t1 = new TimelineLite({ delay: 0.2 });

    // console.log('animateTo');

    t1
      .to(this.branch1, 0.5, { x: -15, y: 15, ease: Elastic.easeOut.config(1, 0.3) })
      .to(this.branch1Shadow, 0.5, { x: -15, y: 15, ease: Elastic.easeOut.config(1, 0.3) }, 0)

      .to(this.branch4, 0.5, { x: 15, y: 15, ease: Elastic.easeOut.config(1, 0.3) }, 0)
      .to(this.branch4Shadow, 0.5, { x: 15, y: 15, ease: Elastic.easeOut.config(1, 0.3) }, 0)

      .to(this.branch5, 1, { x: 0, y: 20, ease: Elastic.easeOut.config(1, 0.3) }, 0)
      .to(this.branch5Shadow, 1, { x: 0, y: 20, ease: Elastic.easeOut.config(1, 0.3) }, 0)

      .to(this.branch2, 0.8, { x: -10, y: 10, ease: Elastic.easeOut.config(1, 0.3) }, 0)
      .to(this.branch2Shadow, 0.8, { x: -10, y: 10, ease: Elastic.easeOut.config(1, 0.3) }, 0)

      .to(this.branch3, 0.7, { x: 10, y: 10, ease: Elastic.easeOut.config(1, 0.3) }, 0)
      .to(this.branch3Shadow, 0.7, { x: 10, y: 10, ease: Elastic.easeOut.config(1, 0.3) }, 0);
  }

  animateFrom() {
    const t1 = new TimelineLite();

    // console.log('animateFrom');

    t1
      .to(this.branch1, 1, { x: 0, y: 0, ease: Elastic.easeOut.config(1, 0.3) })
      .to(this.branch1Shadow, 1, { x: 0, y: 0, ease: Elastic.easeOut.config(1, 0.3) }, 0)

      .to(this.branch4, 1, { x: 0, y: 0, ease: Elastic.easeOut.config(1, 0.3) }, 0)
      .to(this.branch4Shadow, 1, { x: 0, y: 0, ease: Elastic.easeOut.config(1, 0.3) }, 0)

      .to(this.branch5, 1.5, { x: 0, y: 0, ease: Elastic.easeOut.config(1, 0.3) }, 0)
      .to(this.branch5Shadow, 1.5, { x: 0, y: 0, ease: Elastic.easeOut.config(1, 0.3) }, 0)

      .to(this.branch2, 1.2, { x: 0, y: 0, ease: Elastic.easeOut.config(1, 0.3) }, 0)
      .to(this.branch2Shadow, 1.2, { x: 0, y: 0, ease: Elastic.easeOut.config(1, 0.3) }, 0)

      .to(this.branch3, 1.4, { x: 0, y: 0, ease: Elastic.easeOut.config(1, 0.3) }, 0)
      .to(this.branch3Shadow, 1.4, { x: 0, y: 0, ease: Elastic.easeOut.config(1, 0.3) }, 0);
  }
}

export default Tree;
