<template>
  <div>
    <div>Photos?{{ Photos }}</div>
    <div>WOW</div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export const typeDefs = gql`
  type Photo {
    id: Int!
    url: String!
    name: String!
  }

  type Mutation {
    addPhoto(url: String!, name: String!): Photo
  }

  type Person {
    id: Int!
    name: String!
    age: Int!
  }
`;

const PhotosQuery = gql`
  {
    Photos @client {
      id
      url
      name
    }
  }
`;

console.log("VUE TYPE DEFS", typeDefs);
export default {
  name: "Photos",
  data() {
    return {};
  },
  apollo: {
    Photos: {
      query: PhotosQuery
    }
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"></style>
