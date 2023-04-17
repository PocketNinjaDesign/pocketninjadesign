/**
 * Used to slow down repeated events by spacing out over nth ms rather than every ms
 * @param {*} func
 * @param {*} wait
 * @param {*} immediate
 * @returns func - After wait time
 */
export default function debounce (func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};