<script setup>
import Recipe from "../components/Recipe.vue";
import RecipeList from "../components/RecipeList.vue";

import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
</script>

<template>
  <main class="grid grid-cols-2 gap-4">
    <RecipeList @selectRecipe="selectRecipe" :uid="uid" />
    <Recipe :recipeid="recipe" />
  </main>
</template>
<script>
const firebaseConfig = {
  apiKey: "AIzaSyD9EOSlnmGS-kseGdB2F9nOWG9UIlSBP_E",
  authDomain: "cookbook-769df.firebaseapp.com",
  projectId: "cookbook-769df",
  storageBucket: "cookbook-769df.appspot.com",
  messagingSenderId: "644720982505",
  appId: "1:644720982505:web:7ddfea4d742c26c2c23378",
};
const app = initializeApp(firebaseConfig);

export default {
  data() {
    return {
      recipe: "",
      uid: "",
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(uid);
        this.uid = uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  },
  methods: {
    selectRecipe(recipeid) {
      // let rawData = await fetch("http://localhost:8080/api/recipe/" + recipeid);
      // let data = await rawData.json();
      // this.recipe = data;
      this.recipe = recipeid;
    },
  },
};
</script>
