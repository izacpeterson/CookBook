<script setup>
import NewRecipe from "../components/NewRecipe.vue";
import RecipeList from "../components/RecipeList.vue";
</script>

<template>
  <main>
    <!-- <NewRecipe></NewRecipe> -->
    <router-link to="/new" class="bg-primary p-2 text-white">New</router-link>
    <!-- <router-link to="/Public">Public</router-link> -->
    <!-- <router-link to="/Private">Private</router-link> -->
    <button v-if="!viewPublic" class="bg-primary p-2 m-2 text-white" @click="viewPublic = true">Public</button>
    <button v-if="viewPublic" class="bg-primary p-2 m-2 text-white" @click="viewPublic = false">Private</button>
    <RecipeList v-if="viewPublic" publicRecipe="true"></RecipeList>
    <RecipeList v-if="!viewPublic" publicRecipe="false"></RecipeList>
  </main>
</template>
<script>
export default {
  data() {
    return {
      viewPublic: false,
    };
  },
};
</script>
