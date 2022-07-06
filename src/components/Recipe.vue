<template>
  <div class="p-4">
    <h2>Recipe</h2>
    <h3>{{ recipe.title }}</h3>
    <h3>Ingredients</h3>
    <ul>
      <li v-for="ingredient in recipe.ingredients" v-bind:key="ingredient" class="px-6 py-0">
        {{ ingredient }}
      </li>
    </ul>
    <h3>Directions</h3>
    <ol>
      <li
        v-for="direction in recipe.directions"
        v-bind:key="direction"
        class="px-6 py-0"
      >
        {{ direction }}
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  props: ["recipe"],
};
</script>
