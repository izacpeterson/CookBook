<script setup>
import Recipe from "../components/Recipe.vue";
import RecipeList from "../components/RecipeList.vue";
</script>

<template>
  <main class="grid grid-cols-2 gap-4">
    <RecipeList @selectRecipe="selectRecipe" />
    <Recipe :recipe="recipe" />
  </main>
</template>
<script>
export default {
  data() {
    return {
      recipe: {},
    };
  },
  methods: {
    async selectRecipe(recipeid) {
      let rawData = await fetch("http://localhost:8080/api/recipe/" + recipeid);
      let data = await rawData.json();
      this.recipe = data;
    },
  },
};
</script>
