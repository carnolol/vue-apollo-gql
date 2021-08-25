<template>
  <div>
    <h1>TODOS</h1>
    <label for="length">How many?</label>
    <input type="text" v-model.number="length" />
    <br />
    <!-- Normally we will get 200 todos back -->
    <div
      v-for="todo in todos.data.slice(0, length)"
      :key="todo.id"
      aria-placeholder="How many Todos do you want?"
    >
      <div>Number: {{ todo.id }}</div>
      <div>Name: {{ todo.title }}</div>
      <div>Completed: {{ todo.completed }}</div>
      <br />
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "HelloWorld",
  data() {
    return {
      length: 2
    };
  },
  apollo: {
    todos: gql`
      query {
        todos {
          data {
            id
            title
            completed
          }
        }
      }
    `
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"></style>
