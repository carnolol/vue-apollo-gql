<template>
  <div>
    <h1>TODOS!!</h1>
    <label for="length">How many do you want?</label>
    <input type="text" v-model.number="todoLength" />

    <div>
      <h3>ADD NEW TODO</h3>
      <input type="text" v-model="todoName" />
      <button @click="createTodo">Add Todo</button>
      <input
        type="checkbox"
        v-model="todoCompleted"
        @click="toggleCompleted"
        label="completed"
      />
    </div>
    <br />
    <!-- Normally we will get 200 todos back -->
    <div
      v-for="todo in todos.data.slice(0, todoLength)"
      :key="todo.id"
      aria-placeholder="How many Todos do you want?"
    >
      <div>Name: {{ todo.title }}</div>
      <div>Completed: {{ todo.completed }}</div>
      <!-- delete todo btn -->
      <button @click="deleteTodo(todo.id)">DELETE</button>
      <br />
    </div>

    <h1 v-if="deletedTodo">
      You Deleted that Todo! Hows it feel to get stuff DONEEE.
    </h1>

    <!-- have we added a todo recently? -->
    <div v-if="newlyCreatedTodos[0]">
      <div v-for="todo in newlyCreatedTodos" :key="todo.name">
        <div>NEW TODO ID: {{ todo.id }}</div>
        <div>NEW TODO NAME: {{ todo.title }}</div>
        <div>NEW TODO COMPLETD: {{ todo.completed }}</div>
        <button @click="deleteTodo(todo.id)">DELETE</button>
      </div>
    </div>
  </div>
</template>

<script>
// gotta import the ability to use gql
import gql from "graphql-tag";
// Vue Stuff
export default {
  name: "Todos",
  data() {
    return {
      todoLength: 10,
      todoName: "",
      todoCompleted: false,
      newlyCreatedTodos: [],
      // deleted todo variables
      todoId: null,
      deletedTodo: false
    };
  },

  // our GQL Queries / mutations
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
  methods: {
    toggleCompleted() {
      this.todoCompleted = !this.todoCompleted;
    },
    async deleteTodo(id) {
      // make sure the int coming is doesnt get applied as a string!
      this.todoId = parseInt(id);
      // our apollo mutation
      const response = await this.$apollo.mutate({
        mutation: gql`
          mutation {
            deleteTodo(id: ${this.todoId})
          }
        `
      });
      // remove 1 index of the array starting
      this.newlyCreatedTodos.splice(0, 1);
      // response will be a Boolean
      this.deletedTodo = response.data.deleteTodo;
    },
    async createTodo() {
      const response = await this.$apollo.mutate({
        mutation: gql`
          mutation($title: String!, $completed: Boolean!) {
            createTodo(input: { title: $title, completed: $completed }) {
              id
              title
              completed
            }
          }
        `,
        variables: {
          title: this.todoName,
          completed: this.todoCompleted
        }
      });
      const newTodo = response.data.createTodo;
      this.newlyCreatedTodos.push(newTodo);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"></style>
