<script setup>
import Recipe from "../components/Recipe.vue";
import RecipeList from "../components/RecipeList.vue";
</script>

<template>
  <main class="grid grid-cols-2 gap-4">
    <Recipe :recipe="recipe" />
    <RecipeList @selectRecipe="selectRecipe"/>
  </main>
</template>
<script>
export default {
  data() {
    return {
      recipe:{title:"test"}
    };
  },
  methods: {
    selectRecipe(recipe) {
      console.log(recipe);
      this.recipe = recipe;
    },
  },
};
</script>