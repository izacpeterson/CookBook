<script setup>
import { getRecipe, getUser, updateRecipe } from "../functions/firebase.js";
</script>
<template>
  <main class="flex flex-col">
    <div class="flex flex-col items-center">
      <div class="text-4xl">{{ recipe.name }}</div>
      <div>{{ recipe.time }}</div>
      <div>{{ recipe.author }}</div>
      <div>{{ recipe.description }}</div>
    </div>
    <hr />
    <div class="text-xl pt-4">Ingredients:</div>
    <ul class="list-disc px-8">
      <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
    </ul>
    <div class="text-xl pt-4">Directions:</div>
    <ol class="list-decimal px-8">
      <li v-for="step in recipe.directions" :key="step">{{ step }}</li>
    </ol>
    <label v-if="uid == recipe.uid"><input type="checkbox" name="public" id="" @click="setPublicity" v-model="recipe.public" />Public</label>
    <div class="flex justify-evenly p-4">
      <button @click="copyToClipboard" class="bg-primary p-2 text-white">Share</button>
      <button v-if="uid == recipe.uid" class="bg-warning p-2 text-white">Delete</button>
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      recipe: {},
      uid: "",
    };
  },
  created() {
    getRecipe(this.$route.params.id).then((recipe) => {
      console.log(recipe);
      this.recipe = recipe;
    });
    getUser().then((user) => {
      this.uid = user.uid;
    });
  },
  methods: {
    setPublicity() {
      this.recipe.public = !this.recipe.public;
      updateRecipe(this.recipe.id, this.recipe.public);
    },
    copyToClipboard() {
      navigator.clipboard.writeText(window.location);
      alert("URL copied to clipboard!");
    },
  },
};
</script>
