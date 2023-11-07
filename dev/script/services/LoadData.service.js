// import axios from 'axios';

// import $ from '../jqlite.extends';

export default {
  // load(url) {
  //   return axios({
  //     method: 'get',
  //     url,
  //   }).then(response => response);
  // },

  /**
   * Load a page and returns a promise with a jqlite
   * object of a selected element from the page
   *
   * @param {string} url :Path to the page to load
   * @param {string} element :element to load from the page
   */
  loadElement(url, element) {

    // console.log(element);

    return fetch(url, {
        method: 'GET',
        mode: "cors",
        redirect: "follow",
        credentials: "same-origin",
        referrerPolicy: "no-referrer"
      })
      .then(function (res) {
        return res.text();
      })
      .then(function (data) {
        // console.log('fetch res: ', data);
        const temp = document.createElement('div');
        temp.innerHTML = data;

        return temp.querySelector(element);
      })
      .catch(function (err) {
        console.warn('Something went wrong.', err);
      });

    // return
    //   this.load(url)
    //     .then((response) => {
    //       const temp = document.createElement('div');
    //       temp.innerHTML = response.data;

    //       return temp.querySelector(element);
    //     });
  },
};