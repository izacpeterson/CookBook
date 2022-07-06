<template>
  <div class="p-4">
    <h2>Recipe</h2>
    <h3>{{ title }}</h3>
    <h3>Ingredients</h3>
    <ul></ul>
    <h3>Directions</h3>
    <ol>
      <li
        v-for="direction in directions"
        v-bind:key="direction"
        class="px-6 py-1"
      >
        {{ direction }}
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      ingredients: [],
      directions: [],
    };
  },
  created() {
    this.getRecipe();
  },
  methods: {
    async getRecipe() {
      let rawData = await fetch("http://localhost:8080/api/recipe");
      let jsonData = await rawData.json();
      console.log(jsonData);
      this.title = jsonData.title;
      this.ingredients = jsonData.ingredients;
      this.directions = jsonData.directions;
    },
  },
};
</script>
