<template>
  <div class="p-4">
    <h2>Recipe</h2>
    <h3>{{ recipe.title }}</h3>
    <h3>Ingredients</h3>
    <ul class="px-8">
      <li
        v-for="ingredient in recipe.ingredients"
        v-bind:key="ingredient"
        class="list-disc"
      >
        {{ ingredient }}
      </li>
    </ul>
    <h3>Directions</h3>
    <ol class="px-8">
      <li
        v-for="direction in recipe.directions"
        v-bind:key="direction"
        class="list-decimal"
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
