<script setup>
import { getUID } from "../functions/getUID.js";
</script>
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
    <span v-if="mine">
      <input type="checkbox" name="" id="" @click="changePublic" />
      Public
    </span>
  </div>
</template>
<script>
export default {
  props: ["recipeid"],
  data() {
    return {
      uid: "",
      mine: false,
      publicRecipe: false,
      recipe: {},
    };
  },
  watch: {
    recipeid(old, newRec) {
      this.getRecipe();
    },
  },
  created() {},
  methods: {
    async getRecipe() {
      let rawData = await fetch("/api/recipe/" + this.recipeid);
      let data = await rawData.json();
      this.recipe = data;

      this.publicRecipe = this.recipe.public;

      getUID((uid) => {
        this.uid = uid;
        console.log(`USER: ${this.uid} RECIPE: ${this.recipe.user}`);
        if (this.recipe.user === uid) {
          this.mine = true;
        }
      });
    },
    async changePublic() {
      console.log(this.recipeid);
      if (this.recipe.public == 0) {
        await fetch("/api/setPublic?id=" + this.recipeid);
        this.recipe.public = 1;
      }
      if (this.recipe.public == 1) {
        await fetch("/api/setPrivate?id=" + this.recipeid);
        this.recipe.public = 0;
      }
    },
  },
};
</script>
