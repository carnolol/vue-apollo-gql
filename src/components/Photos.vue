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
      <Photo :photo="photo" />
    </div>
  </div>
</template>

<script>
import Photo from "./Photo.vue";

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
  computed: {
    Photos() {
      return this.$store.Photos.getPhotos();
    }
  },
  methods: {
    async addPhoto(url, name) {
      // Make ourselves a ghetto fake id
      const id = Math.floor(Math.random() * 1000);
      // pass our variables to our store.
      const newPhoto = await this.$store.Photos.addPhoto(id, url, name);

      return newPhoto;
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
