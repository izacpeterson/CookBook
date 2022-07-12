<script setup>
import Recipe from "../components/Recipe.vue";
</script>
<template>
  <Recipe :recipe="recipe" />
</template>
<script>
export default {
  data() {
    return {
      recipe: {},
    };
  },
  async mounted() {
    let rawData = await fetch(
      "http://localhost:8080/api/recipe/" + this.$route.params.id
    );
    let data = await rawData.json();
    this.recipe = data;
  },
};
</script>
