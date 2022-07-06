<script setup>
import { RouterLink, RouterView } from "vue-router";
import NewRecipe from "./components/NewRecipe.vue";
</script>

<template>
  <header class="p-5 text-3xl bg-blue-500 text-white">
    <h1>Recipe Book</h1>
  </header>
  <RouterView />
  <button @click="this.new = !this.new" class="bg-blue-500 text-white p-2">
    Add Recipe
  </button>
  <NewRecipe v-if="this.new" />
</template>
<script>
export default {
  data() {
    return {
      new: false,
    };
  },
};
</script>
