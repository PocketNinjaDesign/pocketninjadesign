
export default {
  bpSmallest: 320,
  bpSmall: 700,
  bpMedium: 1024,
  bpLarge: 1920,

  getWidth() {
    if (window.innerWidth < 321) {
      return 'smallest';
    } else if (window.innerWidth < 701) {
      return 'small';
    } else if (window.innerWidth < 1025) {
      return 'medium';
    }

    return 'large';
  },
};
