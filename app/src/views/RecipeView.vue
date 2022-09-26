<template>
  <main class="m-2">
    <h1 class="text-2xl">{{ recipe.title }}</h1>
    <p class="mx-4">{{ recipe.desc }}</p>
    <h2 class="text-2xl pt-4">Ingredients:</h2>
    <ul class="list-disc px-6">
      <li v-for="ingredient in recipe.ingredients" v-bind:key="ingredient">{{ ingredient }}</li>
    </ul>
    <h2 class="text-2xl pt-4">Directions:</h2>
    <ol class="list-decimal px-6">
      <li v-for="dir in recipe.directions" v-bind:key="dir">{{ dir }}</li>
    </ol>

    <div class="public"><input type="checkbox" name="" id="" />Public</div>
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
.public {
  display: flex;
}
</style>
