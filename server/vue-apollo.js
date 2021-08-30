import Vue from "vue";
import VueApollo from "vue-apollo";
import {
  createApolloClient,
  restartWebsockets
} from "vue-cli-plugin-apollo/graphql-client";

import gql from "graphql-tag";
// create local cache storage!
import { InMemoryCache } from "apollo-cache-inmemory";
const cache = new InMemoryCache();

// imports from PHOTOS.VUE
import { PhotosQuery, addPhotox } from "../src/components/Photos.vue";
//import from PHOTO.VUE
import { editPhoto } from "../src/components/Photo.vue";
// Install the vue plugin
Vue.use(VueApollo);

// Name of the localStorage item
const AUTH_TOKEN = "apollo-token";

// Http endpoint
const httpEndpoint =
  process.env.VUE_APP_GRAPHQL_HTTP || "http://localhost:4000/graphql";
// Files URL root
export const filesRoot =
  process.env.VUE_APP_FILES_ROOT ||
  httpEndpoint.substr(0, httpEndpoint.indexOf("/graphql"));

Vue.prototype.$filesRoot = filesRoot;

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint,
  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions
  wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || "ws://localhost:4000/graphql",
  // LocalStorage token
  tokenName: AUTH_TOKEN,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,
  // Is being rendered on the server?
  ssr: false
};

const typeDefs = gql`
  type Photo {
    id: Int!
    url: String!
    name: String!
  }

  # type Mutation {
  #   editPhoto(id: Int!, url: String!, name: String!): Photo
  # }

  type Mutation {
    editPhoto(url: String!, name: String!): Photo
    addPhoto(id: Int!, url: String!, name: String!): Photo
  }
`;

// !!! RESOLVER HERE
const resolvers = {
  Mutation: {
    addPhoto: (_, { id, url, name }, { cache }) => {
      try {
        // get our photo data
        const data = cache.readQuery({ query: PhotosQuery });
        // create new photo object
        const newPhoto = {
          id,
          url,
          name,
          __typename: "Photo"
        };
        // push new photo object to cache
        data.Photos.push(newPhoto);
        // write to the cash with the new data
        cache.writeQuery({ query: addPhotox, data: data });
        // success!
        return true;
      } catch (e) {
        // stupid errors :(
        console.log("BIG ERROR", e);
      }
    },
    // * Delete Photo
    deletePhoto: (_, { id }, { cache }) => {
      try {
        console.log("INSIDE DELETE PHOTO ID", id);
        // get our Photo data
        const data = cache.readQuery({ query: PhotosQuery });
        console.log("DATA", data);
        // Find the correct photo Index to delete
        const currentPhotoIndex = data.Photos.findIndex(
          (photo) => photo.id === id
        );
        console.log("Current Photo Index", currentPhotoIndex);
        // remove dat bad boi
        data.Photos.splice(currentPhotoIndex, 1);
        // update cache
        cache.writeQuery({ query: PhotosQuery, data });
      } catch (e) {
        console.log("Delete Photo Error ->", e);
      }
    },
    //* Edit Photo
    editPhoto: (_, { id, url, name }, { cache }) => {
      console.log("HELLO WORLD");
      try {
        console.log("EDDDIT PHOTO VARS-> ", id, url, name);
        const data = cache.readQuery({ query: PhotosQuery });
        console.log("DATA", editPhoto);
        // Find the correct photo Index to delete
        const currentPhotoIndex = data.Photos.findIndex(
          (photo) => photo.id === id
        );
        //! this is returning -1 because were passing in undefined.
        console.log("current photo!?", currentPhotoIndex);
        const updatedPhoto = {
          id,
          url,
          name,
          __typename: "Photo"
        };
        console.log("UPDATED PHOTO", updatedPhoto);
        // data.Photos.splice(currentPhotoIndex, 1, updatedPhoto);

        // update our
        cache.writeQuery({ query: editPhoto, data: data });
      } catch (e) {
        console.log("ERROR WITH EDIT PHOTO", e);
      }
    }
  }
};

// Call this in the Vue app file
export function createProvider(options = {}) {
  // Create apollo client
  const { apolloClient, wsClient } = createApolloClient({
    cache,
    typeDefs,
    resolvers,
    ...defaultOptions,
    ...options
  });

  apolloClient.wsClient = wsClient;

  cache.writeData({
    data: {
      Photos: [
        {
          __typename: "Photo",
          id: 1,
          url:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScMcEcJ_dFxBV5FYQZ4EABpj64jgkWxJNzOw&usqp=CAU",
          name: "space kitty"
        }
      ]
    }
  });

  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network',
      }
    },
    errorHandler(error) {
      // eslint-disable-next-line no-console
      console.log(
        "%cError",
        "background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
        error.message
      );
    }
  });

  return apolloProvider;
}

// Manually call this when user log in
export async function onLogin(apolloClient, token) {
  if (typeof localStorage !== "undefined" && token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("%cError on cache reset (login)", "color: orange;", e.message);
  }
}

// Manually call this when user log out
export async function onLogout(apolloClient) {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN);
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("%cError on cache reset (logout)", "color: orange;", e.message);
  }
}
