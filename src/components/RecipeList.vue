<template>
  <div>
    <h2>Recipe List</h2>
    <select name="" id="">
      <option value="">Public CookBook</option>
      <option value="">My CookBook</option>
    </select>
    <ul>
      <li
        v-for="recipe in recipes"
        v-bind:key="recipe.rowid"
        v-on:click="selectRecipe(recipe)"
        class="cursor-pointer"
      >
        {{ recipe.title }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      recipes: [],
    };
  },
  async created() {
    const response = await fetch("http://localhost:8080/api/getall");
    const data = await response.json();
    this.recipes = data;
    console.log(this.recipes);
  },
  methods: {
    selectRecipe(recipe) {
      console.log(recipe.rowid);
      this.$emit("selectRecipe", recipe.rowid);
    },
  },
};
</script>
