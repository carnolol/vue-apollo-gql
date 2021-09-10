<template>
  <div id="app">
    <Header />
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
