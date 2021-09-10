import Vue from "vue";
import App from "./App.vue";
// import { store, wipeData } from "./boot/store/index";
import store from "./boot/store/index";
// console.log("main.js STORE", store);
import { apolloProvider } from "./boot/apollo/index";

Vue.config.productionTip = false;

// Holy crap it took me forever to determine that we needed to pass our prototypes to our entire app to get the $store module to work because we are not using Quasar.
new Vue({
  apolloProvider,
  store,
  $store: Vue.prototype.$store,
  // wipeData,
  // store,
  render: (h) => h(App)
}).$mount("#app");
