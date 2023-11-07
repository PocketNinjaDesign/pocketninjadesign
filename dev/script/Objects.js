export default {
  isTypeOf(str, obj) {
    return `[object ${str}]` === Object.prototype.toString.call(obj);
  },

  isArray(obj) {
    return this.isTypeOf('Array', obj);
  },

  isString(obj) {
    return this.isTypeOf('String', obj);
  },

  isNumber(obj) {
    return this.isTypeOf('Number', obj);
  },

  isObject(obj) {
    return this.isTypeOf('Object', obj);
  },


  /**
   * Objects.extend
   * @description Standard $.extend from jQuery.  Code taken from http://youmightnotneedjquery.com/ and modified to es6 and to pass eslint
   * @param {...Object} _args - Object(s) ready to be merged in order from last to first
   * @returns {Object} out - All objects merged into a final object
   */
  extend(..._args) {
    const out = {};
    const args = _args;

    for (let i = 0; i < args.length; i += 1) {
      const obj = args[i];

      if (obj && this.isObject(obj)) {
        Object.keys(obj).forEach((key) => {
          if (this.isObject(obj[key])) {
            out[key] = this.extend(out[key], obj[key]);
          } else if (this.isArray(obj[key])) {
            out[key] = [...obj[key]];
          } else {
            out[key] = obj[key];
          }
        });
      }
    }

    return out;
  },
};
