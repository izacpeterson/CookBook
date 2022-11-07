<script setup>
import { getPrivateRecipes, getUser } from "../functions/firebase.js";
</script>
<template>
  <h2 class="text-4xl pb-4">My Recipes</h2>
  <ul>
    <li v-for="recipe in recipeList" :key="recipe">
      <router-link :to="'/recipe/' + recipe.id" class="text-xl"> {{ recipe.name }}</router-link>
      <hr />
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      recipeList: [],
      uid: "",
    };
  },
  created() {
    getUser().then((user) => {
      getPrivateRecipes(user.uid).then((recipes) => {
        recipes.forEach((recipe) => {
          this.recipeList.push({
            name: recipe.data().name,
            id: recipe.id,
          });
        });
      });
    });
  },
};
</script>
