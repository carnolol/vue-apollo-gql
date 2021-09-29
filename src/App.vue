<template>
  <div id="app">
    <Header />
    <!-- does this work? -->
    <Photos />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Photos from "./components/Photos.vue";

export default {
  name: "App",
  components: {
    Header,
    Photos
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
