import Vue from "vue";

import Photos from "../../store/Photos/index";

Vue.prototype.$store = {
  Photos
};

// Also export a convenience function for removing all store data when we want to
export const wipeData = () => {
  Object.keys(Vue.prototype.$store).forEach((storeName) => {
    if (Vue.prototype.$store[storeName].clearAll) {
      Vue.prototype.$store[storeName].clearAll();
    }
  });
};
