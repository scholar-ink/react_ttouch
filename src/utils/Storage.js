export default {
  set: (key, data) => {
    return window.localStorage.setItem(key, window.JSON.stringify(data));
  },
  get: (key) => {
    console.log(window.localStorage.getItem(key));
    if (window.localStorage.getItem(key) === undefined) {
      return '';
    }
    return window.JSON.parse(window.localStorage.getItem(key));
  },
  remove: (key) => {
    return window.localStorage.removeItem(key);
  },
};
