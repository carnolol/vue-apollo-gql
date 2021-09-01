import Vue from "vue";
import App from "./App.vue";
import { createProvider } from "../server/vue-apollo";
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
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
