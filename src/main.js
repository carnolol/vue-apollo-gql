import Vue from "vue";
import App from "./App.vue";
import { createProvider } from "./vue-apollo";
// import { ApolloClient } from "apollo-client";

// const apolloClient = new ApolloClient({
//   typeDefs,
//   resolvers: {}
// });

Vue.config.productionTip = false;

new Vue({
  apolloProvider: createProvider(),
  render: (h) => h(App)
}).$mount("#app");
