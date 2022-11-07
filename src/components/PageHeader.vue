<script setup>
import { googleSignin, getUser } from "../functions/firebase.js";
</script>
<template>
  <div class="bg-gray-900 text-white flex justify-between p-5 shadow-lg">
    <router-link to="/">
      <h1 class="text-6xl">Cookr</h1>
    </router-link>
    <button v-if="!signedIn" @click="signIn">Sign in With Google</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      signedIn: false,
    };
  },
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
  created() {
    getUser()
      .then((user) => {
        this.signedIn = true;
      })
      .catch(() => {
        this.signedIn = false;
      });
  },
};
</script>
