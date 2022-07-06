<template>
  <form @submit="addRecipe" action="http://localhost:8080/api/new"
    class="fixed top-0 w-full h-full bg-white opacity-95 flex flex-col items-center justify-center">
    <h1 class="text-4xl">New Recipe</h1>
    <h2>Title</h2>
    <input type="text" v-model="title" placeholder="Title" class="bg-gray-200 m-2 p-2" name="title" />
    <h2>Description</h2>
    <input type="text" v-model="desc" placeholder="Description" class="bg-gray-200 m-2 p-2" name="desc" />
    <h2>Ingredients</h2>
    <ul>
      <li v-for="ingredient in ingredients" v-bind:key="ingredient">
        {{ ingredient }}
      </li>
    </ul>
    <span>
      <input type="text" v-model="newIngredient" placeholder="Ingredient" class="bg-gray-200 m-2 p-2" />
      <button @click="addIngredient" class="bg-blue-500 text-white p-2">
        Add
      </button>
    </span>
    <h2>Directions</h2>
    <ul>
      <li v-for="direction in directions" v-bind:key="direction">
        {{ direction }}
      </li>
    </ul>
    <span>
      <input v-model="newDirection" type="text" placeholder="Directions" class="bg-gray-200 m-2 p-2" />
      <button @click="addDirection" class="bg-blue-500 text-white p-2">
        Add
      </button>
    </span>

    <button class="bg-blue-500 text-white p-2">Add Recipe</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      desc: "",
      ingredients: [],
      directions: [],
      newIngredient: "",
      newDirection: "",
    };
  },
  methods: {
    async addRecipe(e) {
      e.preventDefault();
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        title: this.title,
        desc: this.desc,
        ingredients: this.ingredients,
        directions: this.directions,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:8080/api/new", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      this.title = "";
      this.desc = "";
      this.ingredients = [];
      this.directions = [];

      this.$emit('close');
    },
    addIngredient(e) {
      e.preventDefault();
      this.ingredients.push(this.newIngredient);
      this.newIngredient = "";
    },
    addDirection(e) {
      e.preventDefault();
      this.directions.push(this.newDirection);
      this.newDirection = "";
    },
  },
};
</script>
