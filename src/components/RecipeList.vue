<template>
  <div>
    <h2>Recipe List</h2>
    <ul>
      <li v-for="recipe in recipes" v-on:click="selectRecipe(recipe)">
        {{ recipe.title }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      recipes: [],
    };
  },
  async created() {
    const response = await fetch("http://localhost:8080/api/getall");
    const data = await response.json();
    this.recipes = data;
    console.log(this.recipes);
  },
  methods: {
    selectRecipe(recipe) {
      console.log(recipe.directions[0]);
      let selected = recipe;
      selected.directions = selected.directions.split(",");
      selected.ingredients = selected.ingredients.split(",");
      this.$emit("selectRecipe", selected);
    },
  },
};
</script>
