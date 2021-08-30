<template>
  <div class="photo">
    <h3>{{ photo.name }}</h3>
    <!-- <button @click="toggleEdit">EDIT</button> -->
    <img :src="photo.url" :alt="photo.name" />
    <button @click="deletePhoto(photo.id)">Delete</button>
    <div v-if="editMode">
      <input placeholder="New Name" type="text" v-model="newName" />
      <input placeholder="New URL" type="text" v-model="newUrl" />
      <button @click="editPhoto(photo.id, newUrl, newName)">Submit</button>
    </div>
  </div>
</template>

<script>
// import gql
import gql from "graphql-tag";

// our store mutation
export const editPhoto = gql`
  mutation($url: String!, $name: String!) {
    editPhoto(url: $url, name: $name) @client
  }
`;

// start of Vue stuff
export default {
  name: "Photo",
  props: {
    photo: {},
    deletePhoto: { type: Function }
  },
  data() {
    return {
      editMode: false,
      newName: "",
      newUrl: ""
    };
  },
  methods: {
    toggleEdit() {
      this.editMode = !this.editMode;
    },
    async editPhoto(id, url, name) {
      try {
        console.log("editphoto Data VUE", id, url, name);
        this.$apollo.mutate({
          mutation: editPhoto,
          variabes: { id, url, name }
        });
        // close the editing inputs
        this.toggleEdit();
      } catch (e) {
        // alert some errors if we get them
        alert(e);
      }
    }
  }
};
</script>

// * Styles
<style>
.photo {
  /* border: 2px solid black; */
}
</style>
