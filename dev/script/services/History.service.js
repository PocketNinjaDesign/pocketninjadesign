
export default {
  pushHistory(data, pageName, url) {
    window.history.pushState(
      {
        name: data.name,
        menuState: data.menuState,
      },
      pageName,
      url,
    );
  },
};
