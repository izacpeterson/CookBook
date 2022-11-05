<script setup>
import { getRecipes } from "../functions/firebase.js";
</script>
<template>
  <ul>
    <li v-for="recipe in recipeList" :key="recipe">
      <router-link :to="'/recipe/' + recipe.id" class="text-xl"> {{ recipe.name }}</router-link>
      <hr />
    </li>
  </ul>
</template>
<script>
export default {
  props: ["publicRecipe"],
  data() {
    return {
      recipeList: [],
    };
  },
  created() {
    getRecipes(this.publicRecipe, "T7NURLsCjaV3rwdmgWLCiasVx0s2").then((recipes) => {
      recipes.forEach((recipe) => {
        this.recipeList.push({
          name: recipe.data().name,
          id: recipe.id,
        });
      });
    });
  },
};
</script>
