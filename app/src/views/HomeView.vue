<script setup></script>

<template>
  <main>
    <h1 class="text-2xl">My Recipes</h1>
    <ul>
      <li v-for="recipe in recipes" v-bind:key="recipe.rowID">
        <router-link :to="'/recipe/' + recipe.rowid">{{ recipe.title }}</router-link>
      </li>
    </ul>
  </main>
</template>

<script>
import { getUID } from "../functions/getUID";

export default {
  data() {
    return {
      recipes: [],
      viewPublic: false,
      uid: "",
    };
  },
  created() {
    getUID((uid) => {
      this.uid = uid;
    });
    this.getList();
  },
  methods: {
    async getList() {
      getUID(async (uid) => {
        this.uid = uid;
        if (this.viewPublic) {
          const response = await fetch("/api/getall");
          const data = await response.json();
          this.recipes = data;
        } else {
          const response = await fetch("/api/getPrivate?uid=" + this.uid);
          const data = await response.json();
          this.recipes = data;
        }
      });
    },
  },
};
</script>
