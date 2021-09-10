/* istanbul ignore file */

import Vue from "vue";
import VueApollo from "vue-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";

// Install the vue-apollo plugin
Vue.use(VueApollo);
// HTTP connection to the API
const uploadLink = createUploadLink({
  // You should use an absolute URL here
  uri: "http://localhost:9001/graphql"
});

// Create an Apollo Client instance
const apolloClient = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(), // We still have to pass this, even though we're not using it...
  // Set some default options since we don't want to use the Apollo cache at all
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore"
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    }
  }
});

// Create the Apollo Provider, passing in the Apollo Client
export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

export default ({ app }) => {
  // Tell our app about the apolloProvider
  app.apolloProvider = apolloProvider;
};
