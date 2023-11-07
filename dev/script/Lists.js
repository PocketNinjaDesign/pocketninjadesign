// import $ from './jqlite.extends';
import Objects from './Objects';

export default {

  /**
   * @description Returns an random item from a passed array
   * @param {Array} list
   */
  getRandomListItem(list) {
    const { length } = list;

    return (length === 1) ?
      list[0] :
      list[Math.floor(Math.random() * length)];
  },

  /**
   * toObjectAssign
   *
   * @description Merges each list object instance to override a default object
   * @param {Object} obj main object defaults to be merged with
   * @param {Array} list List of objects to override any obj defaults
   * @param {Boolean} flip False by default. True for obj first in queue, False for list first
   * @returns {Array} final list after merging
   */
  objectAssign(obj, _list, flip = false) {
    const list = _list;

    for (let i = 0; i < list.length; i += 1) {
      if (flip) {
        list[i] = Objects.extend({}, list[i], obj);
      } else {
        list[i] = Objects.extend({}, obj, list[i]);
      }
    }

    return list;
  },
};
