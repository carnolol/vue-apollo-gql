<template>
  <div>
    <br />
    <!-- add photo div -->
    <div>
      <h2>Add a new photo!</h2>
      <input placeholder="Photo Name" type="text" v-model="photoName" />
      <input placeholder="Photo Url" type="text" v-model="photoUrl" />
      <button @click="addPhoto(photoUrl, photoName)">ADD</button>
    </div>
    <br />
    <!-- Photo loop -->
    <h2>Dannnng Those are some nice pictures :D</h2>
    <div v-for="photo in Photos" :key="photo.id">
      <Photo :photo="photo" :deletePhoto="deletePhoto" />
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

import Photo from "./Photo.vue";

export const PhotosQuery = gql`
  {
    Photos @client {
      id
      url
      name
    }
  }
`;

export const deletePhoto = gql`
  mutation($id: Int!) {
    deletePhoto(id: $id) @client
  }
`;

export const addPhotox = gql`
  mutation($id: Int!, $url: String!, $name: String!) {
    addPhoto(id: $id, url: $url, name: $name) @client
  }
`;

export default {
  name: "Photos",
  components: {
    Photo
  },
  data() {
    return {
      photoId: null,
      photoName: "",
      photoUrl: ""
    };
  },
  apollo: {
    Photos: {
      query: PhotosQuery
    }
  },
  methods: {
    async addPhoto(url, name) {
      console.log("addphoto", addPhotox);
      const randomNumber = Math.floor(Math.random() * 10000);
      this.$apollo.mutate({
        mutation: addPhotox,
        variables: { id: randomNumber, url, name }
      });
    },
    async deletePhoto(id) {
      this.$apollo.mutate({
        mutation: deletePhoto,
        variables: { id }
      });
    },
    randomNum() {
      const randomNumber = Math.floor(Math.random() * 10000);
      this.photoId = randomNumber;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"></style>
