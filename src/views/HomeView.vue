<script setup>
import NewRecipe from "../components/NewRecipe.vue";
import PublicRecipeList from "../components/PublicRecipeList.vue";
import PrivateRecipeList from "../components/PrivateRecipeList.vue";
import { getUser } from "../functions/firebase";
</script>

<template>
  <main>
    <div v-if="loggedIn">
      <!-- <NewRecipe></NewRecipe> -->
      <router-link to="/new" class="bg-primary p-2 text-white">New</router-link>
      <!-- <router-link to="/Public">Public</router-link> -->
      <!-- <router-link to="/Private">Private</router-link> -->
      <button v-if="!viewPublic" class="bg-primary p-2 m-2 text-white" @click="viewPublic = true">Public</button>
      <button v-if="viewPublic" class="bg-primary p-2 m-2 text-white" @click="viewPublic = false">Private</button>
      <PublicRecipeList v-if="viewPublic"></PublicRecipeList>
      <PrivateRecipeList v-if="!viewPublic"></PrivateRecipeList>
    </div>
    <div v-if="!loggedIn">
      <PublicRecipeList></PublicRecipeList>
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      viewPublic: false,
      loggedIn: false,
    };
  },
  created() {
    getUser()
      .then((user) => {
        this.loggedIn = true;
      })
      .catch(() => {
        this.viewPublic = true;
      });
  },
};
</script>
