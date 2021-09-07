const typeDefs = gql`
  type Photo {
    id: Int!
    url: String!
    name: String!
  }

  type Mutation {
    editPhoto(id: Int!, url: String!, name: String!): Photo!
    addPhoto(id: Int!, url: String!, name: String!): Photo!
  }
`;