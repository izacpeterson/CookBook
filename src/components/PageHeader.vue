<script setup>
import { googleSignin } from "../functions/firebase.js";
</script>
<template>
  <div class="bg-gray-900 text-white flex justify-between p-5 shadow-lg">
    <router-link to="/">
      <h1 class="text-6xl">CookBook</h1>
    </router-link>
    <button @click="signIn">Sign in With Google</button>
  </div>
</template>
<script>
export default {
  methods: {
    signIn() {
      googleSignin()
        .then((user) => {
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
