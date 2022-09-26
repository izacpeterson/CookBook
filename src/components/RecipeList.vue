<script setup>
import { getUID } from "../functions/getUID.js";
</script>

<template>
  <div class="p-4">
    <span>
      <button class="m-4" @click="switchView">My CookBook</button>
      <button class="m-4" @click="switchView">Public CookBook</button>
    </span>
    <h2>Recipe List</h2>
    <ul>
      <li v-for="recipe in recipes" v-bind:key="recipe.rowid" v-on:click="selectRecipe(recipe)" class="cursor-pointer">
        <!-- {{ recipe.title }} -->
        <router-link :to="'/recipe/' + recipe.rowid">{{ recipe.title }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      recipes: [],
      viewPublic: false,
      uid: "",
    };
  },
  mounted() {
    getUID((uid) => {
      this.uid = uid;
      this.getList();
    });
  },
  methods: {
    //Select a recipe from the list
    selectRecipe(recipe) {
      console.log(recipe.rowid);
      this.$emit("selectRecipe", recipe.rowid);
    },
    //Get the list of recipes
    async getList() {
      if (this.viewPublic) {
        const response = await fetch("/api/getall");
        const data = await response.json();
        this.recipes = data;
      } else {
        const response = await fetch("/api/getPrivate?uid=" + this.uid);
        const data = await response.json();
        this.recipes = data;
        console.log(this.recipes);
      }
    },
    //Switch between public and private recipes
    switchView() {
      this.viewPublic = !this.viewPublic;
      this.getList();
    },
  },
};
</script>
