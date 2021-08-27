<template>
  <div id="app">
    <!-- <ApolloExample msg="Welcome to Your Vue.js App" /> -->
    <ApolloExample />
    <Photos />
  </div>
</template>

<script>
import ApolloExample from "./components/ApolloExample.vue";
import Photos from "./components/Photos.vue";
// import ApolloExample from "./components/Todos.vue";

export default {
  name: "App",
  components: {
    ApolloExample,
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
