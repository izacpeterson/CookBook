<script setup>
import { getRecipe } from "../functions/firebase.js";
</script>
<template>
  <main>
    <div class="text-4xl">{{ recipe.name }}</div>
    <div>{{ recipe.time }}</div>
    <div>{{ recipe.author }}</div>
    <div>{{ recipe.description }}</div>
    <hr />
    <div>Ingredients:</div>
    <ul class="list-disc px-8">
      <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
    </ul>
    <div>Directions:</div>
    <ol class="list-decimal px-8">
      <li v-for="step in recipe.directions" :key="step">{{ step }}</li>
    </ol>
  </main>
</template>
<script>
export default {
  data() {
    return {
      recipe: {},
    };
  },
  created() {
    getRecipe(this.$route.params.id).then((recipe) => {
      console.log(recipe);
      this.recipe = recipe;
    });
  },
};
</script>
