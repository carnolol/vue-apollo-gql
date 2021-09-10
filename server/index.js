const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./graphql/resolvers/index");
// const models = require("./data/models");
const { graphqlUploadExpress } = require("graphql-upload");
const { gql } = require("graphql-tag");

// Create an Express app
const app = express();

// Install additional functionality as we see fit
app.use(cors());
// Unfortunately, ApolloGraphQL uploads are BROKEN so we have to substitute another library (see https://github.com/MichalLytek/type-graphql/issues/37#issuecomment-592467594 but not the 3rd snippet of his solution)
app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));

const schema = gql`
  type Photo {
    id: Int!
    url: String!
    name: String!
  }

  type Mutation {
    editPhoto(id: Int!, url: String!, name: String!): Photo!
    addPhoto(id: Int!, url: String!, name: String!): Photo!
    deletePhoto(id: Int!): Boolean!
  }

  type Query {
    getPhotos: [Photo]
  }
`;

// Initiate an Apollo Server which will service all of our GraphQL configurations
const apolloServer = new ApolloServer({
  typeDefs: schema,
  uploads: false,
  resolvers,
  context: async ({ req }) => {
    if (req) {
      // Create a custom context object available in resolvers
      // todo: bring back in once we have models if we want to go that far?
      // const ctx = {
      //   models
      // };

      // return ctx;
      return req;
    }
  }
});

// Hand it the Express app to deal with routing and server stuffs, etc.
apolloServer.applyMiddleware({ app, path: "/graphql" });

// Run this on an https server so that we can get secure browser connections
const httpServer = require("http").createServer(app);

const port = 9001;

httpServer.listen({ port }, () => {
  console.log(`SERVER DOCKED ON PORT ${port}`);
});
