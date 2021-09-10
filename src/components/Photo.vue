<template>
  <div class="photo">
    <h3>{{ photo.name }}</h3>
    <button @click="toggleEdit">EDIT</button>
    <img :src="photo.url" :alt="photo.name" />
    <button @click="deletePhoto(photo.id)">Delete</button>
    <div v-if="editMode">
      <button @click="toggleEdit">X</button>
      <input placeholder="New Name" type="text" v-model="newName" />
      <input placeholder="New URL" type="text" v-model="newUrl" />
      <button @click="editPhoto(photo.id, newUrl, newName)">Submit</button>
    </div>
  </div>
</template>

<script>
// start of Vue stuff
export default {
  name: "Photo",
  props: {
    photo: {}
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
      if (this.editMode === false) {
        this.newName = "";
        this.newUrl = "";
      }
    },

    async deletePhoto(id) {
      const response = await this.$store.Photos.deletePhoto(id);
      console.log("delete photo response", response);
      return response;
    },
    async editPhoto(id, url, name) {
      try {
        console.log("editphoto Data VUE", id, url, name);
        const updatedPhoto = await this.$store.Photos.editPhoto(id, url, name);
        console.log("updatedPhoto :>> ", updatedPhoto);

        this.toggleEdit();
        return updatedPhoto;
        // close the editing inputs
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
