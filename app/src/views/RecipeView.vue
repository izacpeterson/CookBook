<template>
  <main>
    <h1>{{ recipe.title }}</h1>
    <p>{{ recipe.desc }}</p>
    <ul>
      <h2>Ingredients:</h2>
      <li v-for="ingredient in recipe.ingredients" v-bind:key="ingredient">{{ ingredient }}</li>
    </ul>
    <ol>
      <h2>Directions:</h2>
      <li v-for="dir in recipe.directions" v-bind:key="dir">{{ dir }}</li>
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
  async mounted() {
    let rawData = await fetch("/api/recipe/" + this.$route.params.id);
    let data = await rawData.json();
    this.recipe = data;
  },
};
</script>
<style>
ul,
ol {
  width: 100%;
  padding: 0;
}
</style>
