<script setup>
import { RouterLink, RouterView } from "vue-router";
import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
</script>

<template>
  <!-- <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" class="text-primary">Home</RouterLink>
        <RouterLink to="/public" class="text-primary">Public</RouterLink>
        <RouterLink to="/new" class="text-primary">New</RouterLink>
      </nav>
    </div>
  </header> -->

  <RouterView class="pb-24" />
  <button @click="signIn" class="btn-primary" v-if="uid == ''">Login with Google</button>

  <nav class="flex items-center fixed bottom-0 p-4 w-full bg-zinc-800 drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
    <RouterLink to="/" class="text-primary">Home</RouterLink>
    <RouterLink to="/new">
      <button class="bg-primary w-12 h-12 rounded-full text-4xl">+</button>
    </RouterLink>
    <RouterLink to="/public" class="text-primary">Public</RouterLink>
  </nav>
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
      uid: "",
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        this.uid = uid;
      } else {
        console.log("not signed in");
      }
    });
  },
  methods: {
    signIn() {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-evenly;
}
</style>
